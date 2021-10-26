import 'phaser';
import Config from '../../Control/Config';
import IScene from '../../Engine/IScene';
import PhFactory from './PhFactory';

import ArrayUtil from '../../Utils/ArrayUtil';

class PhGame {
  private _config: Config;
  private _phFactory: PhFactory;

  private _arrayUtil: ArrayUtil;

  private _scenes: {scene: Phaser.Scene, key: string} [];
  private _game: Phaser.Game| null;
  private _currenScene: {scene: Phaser.Scene, key: string}| null;

  constructor(config: Config, phFactory: PhFactory, arrayUtil: ArrayUtil) {
    this._config = config;
    this._phFactory = phFactory;
    this._arrayUtil = arrayUtil;

    this._game = null;
    this._currenScene = null;
    this._scenes = [];

    (<any>window).game = this;
  }

  get currentScene(): Phaser.Scene | null {
    if (this._currenScene) {
      return this._currenScene.scene;
    } else {
      return null;
    }
  }

  public addBase64(key: string, texture: string) {
    let currentScene = this.currentScene;
    if (currentScene) {
      currentScene.textures.addBase64(key, texture);
    }
  }

  public start(config: any) {
    let renderer = Phaser.CANVAS;
    let parent = this._config.parent;
    let width = this._config.width;
    let height = this._config.height;
    let renderMode = this._config.renderMode;
    let responsive = this._config.responsive;
    let background = this._config.background;

    if (config.hasOwnProperty('parent'))      parent =      config.parent;
    if (config.hasOwnProperty('width'))       width =       config.width;
    if (config.hasOwnProperty('height'))      height =      config.height;
    if (config.hasOwnProperty('renderer'))    renderMode =  config.renderMode;
    if (config.hasOwnProperty('responsive'))  responsive =  config.responsive;
    if (config.hasOwnProperty('background'))  background =  config.background;



    if (config.hasOwnProperty('parent'))      this._config.parent =      parent;
    if (config.hasOwnProperty('width'))       this._config.width =       width;
    if (config.hasOwnProperty('height'))      this._config.height =      height;
    if (config.hasOwnProperty('renderer'))    this._config.renderMode =  renderMode;
    if (config.hasOwnProperty('responsive'))  this._config.responsive =  responsive;
    if (config.hasOwnProperty('background'))  this._config.background =  background;





    if (renderMode == this._config.WEBGL) renderer = Phaser.AUTO;

    let scaleMode = {
      mode: Phaser.Scale.NONE,
      parent: parent
    }

    const gameConfig = {
      // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
      type: renderer,
      roundPixels: true,
      parent: parent,
      dom: {
        createContainer: true
      },
      width: width,
      height: height,
      scale: scaleMode,
      transparent: true
    };

    this._game = new Phaser.Game(gameConfig);
  }

  public resize(width: number, height: number) {
    if (this._game) {
      this._game.scale.resize(width, height);
    } else {
      console.error("can't resize canvas before starting the game!");
    }
  }

  public addScene(scene: IScene, key: string) {
    let phaserScene = this._phFactory.phScene();

    if(this._game != null) {
      phaserScene.init(scene);
      if(phaserScene.scene != null) {
        //scene can't be null, as init is called
        this._game.scene.add(key, phaserScene.scene);
        this._addScene(phaserScene.scene, key);
      }
    } else {
      this._showNoAlloc("can't add scenes");
    }
  }

  public createCanvas(key: string, width: number, height: number): Phaser.Textures.CanvasTexture | null {
    if (this._currenScene != null && this._game != null) {
      this._game.scene.stop(this._currenScene.key);
      let texture = this._currenScene.scene.textures.createCanvas(key, width, height);

      return texture;
    } else {
      return null;
    }
  }

  public startScene(key: string) {
    this._startScene(key);
  }

  private _addScene(phaserScene: Phaser.Scene, key: string) {
    let elm = this._getElement(this._scenes, 'key', key);

    if (elm != null) {
      console.error(`Scene '${key}' has already been added!`);
    } else {
      this._scenes.push({scene: phaserScene, key: key});
    }
  }

  private _startScene(key: string) {
    if(this._game != null) {

      let currentScene = this._getElement(this._scenes, 'key', key);

      //console.log("debug2: current scene = ", currentScene);

      if (currentScene != null) {
        if (this._currenScene != null) {
          this._game.scene.stop(this._currenScene.key);
          (<any>this._currenScene).scene.shutdown();
        }

        this._currenScene = currentScene;
        this._game.scene.start(key);
      } else {
        this._currenScene = null;
      }
    } else {
      this._showNoAlloc("can't start scene '" + key + "'");
    }
  }

  private _showNoAlloc(problem: string = "can't add scenes") {
    console.error(`Game didn't start, ${problem}. Did you use start method on PhGame?`);
  }

  private _getElement(array: Array<any>, key: string, value: string) {
    return this._arrayUtil.getElement(array, key, value);
  }
}

export default PhGame;
