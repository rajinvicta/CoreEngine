import ScaleManager from '../../../Control/ScaleManager';
import IObjectHandler from '../../../Plugins/IObjectHandler';
import ArrayUtil from '../../../Utils/ArrayUtil';

class Scale {
  private _scaleManager: ScaleManager;
  private _objectHandler: IObjectHandler;
  private _arrayUtil: ArrayUtil;

  private _SCALEMODES: {
    NORMAL: number,
    FILL: number,
    MAINTAIN_RATIO: number
  };

  private _scaleModeX: number;
  private _scaleModeY: number;
  private _scaleModeXModifier: number;
  private _scaleModeYModifier: number;

  private _x: number;
  private _y: number;

  private _surface: any | null;

  private _listenOnUpdate: Function[];

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get scaleModeX(): number {
    return this._scaleModeX;
  }

  get scaleModeY(): number {
    return this._scaleModeY;
  }

  get width(): number {
    let w = this._getWidth();

    return this._applyScaleInverse(w);
  }

  get height(): number {
    let h = this._getHeight();

    return this._applyScaleInverse(h);
  }

  get SCALEMODES() {
    return this._SCALEMODES;
  }


  get scaleModeXModifier(): number {
    return this._scaleModeXModifier;
  }

  get scaleModeYModifier(): number {
    return this._scaleModeYModifier;
  }

  set x(val: number) {
    if (this._scaleModeX == this._SCALEMODES.NORMAL) {
      this._x = val;

      this._updateScaleX();
    } else {
      console.warn("Can't overwrite the x scale in this Scale Mode");
    }
  }

  set y(val: number) {
    if (this._scaleModeY == this._SCALEMODES.NORMAL) {
      this._y = val;

      this._updateScaleY();
    } else {
      console.warn("Can't overwrite the y scale in this Scale Mode");
    }
  }

  set scaleModeX(val: number) {
    let smArray = this._getPlainArray(this._SCALEMODES);

    if (smArray.indexOf(val) > -1) {
      this._scaleModeX = val;
      this._applyScaleModes();
    } else {
      console.error("ScaleMode not defined, can't set it!");
    }
  }

  set scaleModeY(val: number) {
    let smArray = this._getPlainArray(this._SCALEMODES);

    if (smArray.indexOf(val) > -1) {
      this._scaleModeY = val;
      this._applyScaleModes();
    } else {
      console.error("ScaleMode not defined, can't set it!");
    }
  }

  set scaleModeXModifier(val: number) {
    this._scaleModeXModifier = val;
  }

  set scaleModeYModifier(val: number) {
    this._scaleModeYModifier = val;
  }

  set width(val: number) {
    let w = this._applyScaleInverse(val);

    this._setWidth(w);
  }

  set height(val: number) {
    let h = this._applyScaleInverse(val);

    this._setHeight(h);
  }



  constructor(scaleManager: ScaleManager, objectHandler: IObjectHandler, arrayUtil: ArrayUtil) {
    this._scaleManager = scaleManager;
    this._objectHandler = objectHandler;
    this._arrayUtil = arrayUtil;

    this._SCALEMODES = {
      NORMAL: 0,
      FILL: 1,
      MAINTAIN_RATIO: 3
    }

    this._scaleModeX = this._SCALEMODES.NORMAL;
    this._scaleModeY = this._SCALEMODES.NORMAL;

    this._x = 1;
    this._y = 1;

    this._surface = null;
    this._listenOnUpdate = [];

    this._scaleModeXModifier = 1;
    this._scaleModeYModifier = 1;
  }

  public init(foreignObject: any) {
    this._surface = foreignObject;

    this._updateScaleX();
    this._updateScaleY();
    this._applyScaleModes();
  }

  public addOnUpdate(foo: Function) {
    if (this._listenOnUpdate.indexOf(foo) == -1) {
      this._listenOnUpdate.push(foo);
    } else {
      console.warn("Function already added to the scale listner!");
    }
  }

  public getOriginalWidth(): number {
    let w = this._getOriginalWidth();

    return this._applyScaleFactor(w);
  }

  public getOriginalHeight(): number {
    let h = this._getOriginalHeight();

    return this._applyScaleFactor(h);
  }

  public createNew(): Scale {
    let scaleManager = this._scaleManager.createNew();
    let objectHandler = this._objectHandler.createNew();
    let arrayUtil = this._arrayUtil.createNew();

    return new Scale(scaleManager, objectHandler, arrayUtil);
  }

  public updateScale() {
    this._updateScaleX();
    this._updateScaleY();
    this._applyScaleModes();
    this._executeArray(this._listenOnUpdate);
  }

  public cleanListners() {
    this._listenOnUpdate = [];
  }

  private _updateScaleX() {
    let val = this._applyScaleFactor(this._x);

    this._setScaleX(val);
  }

  private _updateScaleY() {
    let val = this._applyScaleFactor(this._y);

    this._setScaleY(val);
  }

  private _applyScaleModes() {
    if (this._scaleModeX == this._SCALEMODES.FILL) {
      this._fillScaleX();
    }

    if (this._scaleModeY == this._SCALEMODES.FILL) {
      this._fillScaleY();
    }
  }

  private _fillScaleX() {
    this._x = 1;
    this._updateScaleX();

    let width = this._getWidth();
    let gameWidth = this._getGameWidth();
    let ratio = gameWidth / width;
    ratio *= this._scaleModeXModifier;

    if (this._scaleModeY == this._SCALEMODES.MAINTAIN_RATIO) {
      this._y = 1;
      this._y *= ratio;
      this._updateScaleY();
    }

    this._x *= ratio;
    this._updateScaleX();
  }

  private _fillScaleY() {
    this._y = 1;
    this._updateScaleY();

    let height = this._getHeight();
    let gameHeight = this._getGameHeight();
    let ratio = gameHeight /height;
    ratio *= this._scaleModeYModifier;

    //console.log (ratio, gameHeight, height);

    if (this._scaleModeX == this._SCALEMODES.MAINTAIN_RATIO) {
      this._x = 1;
      this._x *= ratio;
      this._updateScaleX();
    }

    this._y *= ratio;
    this._updateScaleY();
  }


  //Foreign dependencies
  private _applyScaleFactor(val: number): number {
    return this._scaleManager.scale(val);
  }

  private _applyScaleInverse(val: number): number {
    return this._scaleManager.inverseScale(val);
  }

  private _setScaleX(val: number) {
    this._objectHandler.scaleX(this._surface, val);
  }

  private _setScaleY(val: number) {
    this._objectHandler.scaleY(this._surface, val);
  }

  private _getOriginalWidth(): number {
    return this._objectHandler.getOriginalWidth(this._surface);
  }

  private _getOriginalHeight(): number {
    return this._objectHandler.getOriginalHeight(this._surface);
  }

  private _getWidth(): number {
    return this._objectHandler.getWidth(this._surface);
  }

  private _getHeight(): number {
    return this._objectHandler.getHeight(this._surface);
  }

  private _setWidth(val: number) {
    this._objectHandler.setWidth(this._surface, val);
  }

  private _setHeight(val: number) {
    this._objectHandler.setHeight(this._surface, val);
  }

  private _getPlainArray(object: any) {
    return this._arrayUtil.getPlainArray(object);
  }

  private _getGameWidth(): number {
    return this._scaleManager.width;
  }

  private _getGameHeight(): number {
    return this._scaleManager.height;
  }

  private _executeArray(arr: Array<Function>) {
    this._arrayUtil.executeArray(arr);
  }
}

export default Scale;
