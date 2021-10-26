import ScaleManager from '../../../Control/ScaleManager';
import IObjectHandler from '../../../Plugins/IObjectHandler';

class Position {
  private _scaleManager: ScaleManager;
  private _objectHandler: IObjectHandler;

  private _x: number;
  private _y: number;
  private _originX: number;
  private _originY: number;
  private _angle: number;

  private _surface: any | null;
  private _alignX: number;
  private _alignY: number;


  private _ALIGNMODES: {
    CENTER: number,
    LEFT: number,
    RIGHT: number
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get originX(): number {
    return this._originX;
  }

  get originY(): number {
    return this._originY;
  }

  get angle(): number {
    return this._angle;
  }

  get ALIGNMODES() {
    return this._ALIGNMODES;
  }

  get globalX() {
    let width = this._getWidthHeight().width;

    return this._getGlobalXY(this._x, width, this._alignX);
  }

  get globalY() {
    let height = this._getWidthHeight().height;

    return this._getGlobalXY(this._y, height, this._alignY);
  }

  set x(val: number) {
    this._x = val;

    this._updatePosX();
  }

  set y(val: number) {
    this._y = val;

    this._updatePosY();
  }

  set originX(val: number) {
    this._originX = val;

    this._updateOriginX();
  }

  set originY(val: number) {
    this._originY = val;

    this._updateOriginY();
  }

  set angle(val: number) {
    this._angle = val;

    this._updateAngle();
  }

  set alignX(val: number) {
    this._alignX = val;
    this._updatePosX();
  }

  set alignY(val: number) {
    this._alignY = val;
    this._updatePosY();
  }

  constructor(scaleManager: ScaleManager, objectHandler: IObjectHandler) {
    this._scaleManager = scaleManager;
    this._objectHandler = objectHandler;

    this._x = 0;
    this._y = 0;
    this._originX = 0.5;
    this._originY = 0.5;
    this._angle = 0;

    this._surface = null;

    this._ALIGNMODES = {
      CENTER: 0,
      LEFT: 1,
      RIGHT: 2
    }

    this._alignX = this._ALIGNMODES.LEFT;
    this._alignY = this._ALIGNMODES.LEFT;
  }

  public init(foreignObject: any) {
    this._surface = foreignObject;

    this._updatePosX();
    this._updatePosY();
  }

  public createNew(): Position {
    return new Position(this._scaleManager.createNew(), this._objectHandler.createNew());
  }

  public updateScale() {
    this._updatePosX();
    this._updatePosY();
  }

  private _scaleX(val: number): number {
    let width = this._getWidthHeight().width;

    return this._scaleXY(val, width, this._alignX);
  }


  private _scaleY(val: number): number {
    let height = this._getWidthHeight().height;

    return this._scaleXY(val, height, this._alignY);
  }

  private _scaleXY(val: number, sideLength: number, align: number) {
    let scaled = this._scale(val);

    return this._getGlobalXY(scaled, sideLength, align)
  }

  private _getGlobalXY(val: number, sideLength: number, align: number) {
    if (align == this._ALIGNMODES.CENTER) {
      return (sideLength / 2) + val;
    } else if (align == this._ALIGNMODES.LEFT) {
      return val;
    } else if (align == this._ALIGNMODES.RIGHT) {
      return sideLength + val;
    } else {
      console.warn("Alignment not found in the Position! Using default align 'LEFT'");
      return val;
    }
  }

  //Foreign Dependencies
  private _updatePosX() {
    if (this._surface != null) {
      this._objectHandler.x(this._surface, this._scaleX(this._x));
    }
  }

  private _updatePosY() {
    if (this._surface != null) {
      this._objectHandler.y(this._surface, this._scaleY(this._y));
    }
  }

  private _updateOriginX() {
    if (this._surface != null) {
      this._objectHandler.originX(this._surface, this._originX);
    }
  }

  private _updateOriginY() {
    if (this._surface != null) {
      this._objectHandler.originY(this._surface, this._originY);
    }
  }

  private _updateAngle() {
    if (this._surface != null) {
      this._objectHandler.angle(this._surface, this._angle);
    }
  }

  private _scale(val: number): number {
    return this._scaleManager.scale(val);
  }

  private _getWidthHeight(): {width: number, height: number} {
    return {width: this._scaleManager.width, height: this._scaleManager.height};
  }
}

export default Position;
