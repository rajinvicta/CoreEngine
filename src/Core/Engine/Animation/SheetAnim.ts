import ArrayUtil from '../../Utils/ArrayUtil';
import IObjectHandler from '../../Plugins/IObjectHandler';
import IScreen from '../../Plugins/IScreen';

type Anim = {
  name: string,
  sheet: string,
  frames: string[],
  repeat: number,
  fps: number,
  data: any
};


class SheetAnim {
  private _objectHandler: IObjectHandler;
  private _screen: IScreen;
  private _arrayUtil: ArrayUtil;

  private _animList: Anim[];

  private _actor: any | null;

  private _onCompleteListeners: {name: string, foo: Function}[];
  private _onUpdateListeners: {name: string, foo: Function}[];
  private _onRepeatListeners: {name: string, foo: Function}[];
  private _onStartListeners: {name: string, foo: Function}[];

  constructor(objectHandler: IObjectHandler, arrayUtil: ArrayUtil, screen: IScreen) {
    this._objectHandler = objectHandler;
    this._screen = screen;
    this._arrayUtil = arrayUtil;

    this._animList = [];

    this._onCompleteListeners = [];
    this._onUpdateListeners = [];
    this._onRepeatListeners = [];
    this._onStartListeners = [];

    this._actor = null;
  }

  public addOnComplete(name: string, foo: Function) {
    this._onCompleteListeners.push({name: name, foo: foo});
  }

  public addOnUpdate(name: string, foo: Function) {
    this._onUpdateListeners.push({name: name, foo: foo});
  }

  public addOnRepeat(name: string, foo: Function) {
    this._onRepeatListeners.push({name: name, foo: foo});
  }

  public addOnStart(name: string, foo: Function) {
    this._onStartListeners.push({name: name, foo: foo});
  }


  public setOnComplete(name: string, foo: Function) {
    this._onCompleteListeners[0] = {name: name, foo: foo};
  }

  public setOnUpdate(name: string, foo: Function) {
    this._onUpdateListeners[0] = {name: name, foo: foo};
  }

  public setOnRepeat(name: string, foo: Function) {
    this._onRepeatListeners[0] = {name: name, foo: foo};
  }

  public setOnStart(name: string, foo: Function) {
    this._onStartListeners[0] = {name: name, foo: foo};
  }

  public addAnimation(name: string, sheet: string, frames: string[], fps: number, repeat: number = 0) {
    if (!this._exists(name)) {
      let data = this._screen.addFrameAnimation(name, sheet, frames, fps, repeat);

      let a = this._createAnim(data, name, sheet, frames, fps, repeat);
      this._animList.push(a);
    } else {
      console.error("Animation named '%s' already exists!", name);
    }
  }

  public start(name: string) {
    let anim = this._getAnimation(name);

    this._objectHandler.playFrameAnimation(this._actor, name,
    () => {
      this._execute(name, this._onCompleteListeners);
    },
    () => {
      this._execute(name, this._onUpdateListeners);
    },
    () => {
      this._execute(name, this._onRepeatListeners);
    },
    ()=> {
      this._execute(name, this._onStartListeners);
    });

    //console.log("Will play anim! ", anim);
  }

  public frameGen(prefix: string, start: number, end: number, suffix: string = "") {
    let snd: string[] = [];

    for (let c = start; c <= end; c++) {
      snd.push(prefix + c + suffix);
    }

    return snd;
  }

  public init(object: any) {
    this._actor = object;
  }

  public createNew() {
    return new SheetAnim(this._objectHandler.createNew(), this._arrayUtil, this._screen);
  }

  private _createAnim(data: any, name: string, sheet: string, frames: string[], fps: number, repeat: number): Anim {
    let a: Anim = {
      sheet: sheet,
      name: name,
      frames: frames,
      fps: fps,
      repeat: repeat,
      data: data
    }

    return a;
  }

  private _exists(name: string): boolean {
    let elm = this._getAnimation(name);

    if (elm != null) {
      return true;
    } else {
      return false;
    }
  }

  private _getAnimation(name: string): any {
    let elm = this._arrayUtil.getElement(this._animList, 'name', name);

    return elm;
  }

  private _execute(name: string, arr: Array<{name: string, foo: Function}>) {
    for (let c = 0; c < arr.length; c++) {
      let elm = arr[c];
      if (elm.name == name) {
        let g = elm.foo;
        g();
      }
    }
  }

}

export default SheetAnim;
