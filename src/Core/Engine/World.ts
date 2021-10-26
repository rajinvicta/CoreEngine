import Config from '../Control/Config';
import ScaleManager from '../Control/ScaleManager';
import IScreen from '../Plugins/IScreen';
import IScene from '../Engine/IScene';
import IGameObject from '../Engine/GameObjects/IGameObject';
import ArrayUtil from '../Utils/ArrayUtil';

class World {
  private _config: Config;
  private _screen: IScreen;
  private _scaleManager: ScaleManager;
  private _arrayUtil: ArrayUtil;

  private _sceneList: {scene: IScene, name: string, objects: IGameObject[]}[];
  private _activeScene: {scene: IScene, name: string, objects: IGameObject[]} | null;

  constructor(config: Config, screen: IScreen, scaleManager: ScaleManager, arrayUtil: ArrayUtil) {
    this._config = config;

    this._screen = screen;
    this._scaleManager = scaleManager;
    this._arrayUtil = arrayUtil;

    this._sceneList = [];
    this._activeScene = null;
  }

  get activeScene(): {scene: IScene, name: string, objects: IGameObject[]} | null {
    return this._activeScene;
  }

  public startGame(config: any = {}) {
    this._screen.startGame(config);
    this._scaleCanvasListner();
    this._resizeListner();
  }

  public addScene(scene: IScene, key: string) {
    this._screen.addScene(scene, key);

    this._sceneList.push({scene: scene, name: key, objects: []});
  }

  public startScene(key: string) {
    if (this._activeScene != null) {
      this._activeScene.objects = [];
    }

    this._activeScene = this._getElement(this._sceneList, 'name', key);

    this._screen.startScene(key);

    this._onResize();
  }

  private _onResize() {
    this._scaleCanvas();
    this._updateSceneScale();
  }

  private _updateSceneScale() {
    if (this._activeScene != null) {
      for (let c = 0; c < this._activeScene.objects.length; c++) {
        let object = this._activeScene.objects[c];
        object.display.updateScale();
        object.position.updateScale();
        object.scale.updateScale();
      }
    }

  }

  private _resizeListner() {
    window.addEventListener('resize', (ev) => {
      this._onResize();
    });
  }

  private _scaleCanvasListner() {

    let divId1 = this._getDivId();
    let parentContainer1 = document.getElementById(divId1);

    if (parentContainer1) {
      parentContainer1.addEventListener("DOMNodeInserted", (ev) => {
        let elmName = <string> (<any>ev).path[0].localName;
        if (elmName == "canvas") this._scaleCanvas();
      }, false);

    }
  }


  private _scaleCanvas() {
    let divId = this._getDivId();
    let parentContainer = document.getElementById(divId);

    setTimeout(() => {
      if(parentContainer) {
        let canvas = parentContainer.getElementsByTagName('canvas')[0];
        let extraDiv = parentContainer.getElementsByTagName('div')[0];

        let wh = this._getWidthHeight();
        canvas.style.width = wh.width + "px";
        canvas.style.height = wh.height + "px";

        canvas.width = wh.width;
        canvas.height = wh.height;

        extraDiv.style.width = wh.width + "px";
        extraDiv.style.height = wh.height + "px";

        console.log("Scaling Canvas!");

        this._screen.resize(wh.width, wh.height);
      } else {
        console.error("No parent container there!")
      }
    }, 50);
  }


  private _getAllProperties (obj: any): any[] {
    const methods = [];

    for (const key of Reflect.ownKeys(obj)) {
      methods.push(key)
    }

    return methods;
  }


  private _getAllMethodNames(obj: any, depth = Infinity): any[] {
    const methods = new Set()
    while (depth-- && obj) {
        for (const key of Reflect.ownKeys(obj)) {
            methods.add(key)
        }
        obj = Reflect.getPrototypeOf(obj)
    }
    return [...methods];
  }




  //Foreign Depends
  private _getElement(arr: any[], key: string, value: any): any {
    return this._arrayUtil.getElement(arr, key, value);
  }
  private _getDivId() {
    return this._config.parent;
  }

  private _getWidthHeight(): {width: number, height: number} {
    return {width: this._scaleManager.width, height: this._scaleManager.height}
  }
}

export default World;
