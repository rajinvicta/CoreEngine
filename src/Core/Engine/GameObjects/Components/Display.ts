import ScaleManager from '../../../Control/ScaleManager';
import IObjectHandler from '../../../Plugins/IObjectHandler';

class Display {
  private _objectHandler: IObjectHandler;
  private _scaleManager: ScaleManager;

  private _visible: boolean;
  private _alpha: number;

  private _surface: any | null;
  private _mask: any | null;
  private _maskRects: {x: number, y: number, width: number, height: number}[];
  private _maskArc: {
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  }| null;

  get visible(): boolean {
    return this._visible;
  }

  get alpha(): number {
    return this._alpha;
  }

  set visible(val: boolean) {
    this._visible = val;

    this._updateVisible();
  }

  set alpha(val: number) {
    this._alpha = val;

    this._updateAlpha();
  }

  get maskX(): number {
    if (this._mask == null) console.error("Can't get x of non existant mask");
    return this._getInverseScale(this._getForeignX(this._mask));
  }

  get maskY(): number {
    if (this._mask == null) console.error("Can't get y of non existant mask");
    return this._getInverseScale(this._getForeignY(this._mask));
  }

  set maskX(val: number) {
    if(this._mask != null) {
      let newVal = this._getScale(val);
      this._setForeignX(this._mask, newVal);
    } else {
      console.error("Cant set x of non existant mask");
    }
  }

  set maskY(val: number) {
    if (this._mask != null) {
      let newVal = this._getScale(val);
      this._setForeignY(this._mask, newVal);
    } else {
      console.error("can't set y of non existant mask");
    }
  }

  get isDestroyed(): boolean {
    if (this._surface == null) {
      return true;
    } else {
      return false;
    }
  }

  constructor(objectHandler: IObjectHandler, scaleManager: ScaleManager) {
    this._objectHandler = objectHandler;
    this._scaleManager = scaleManager;

    this._visible = true;
    this._alpha = 1;

    this._surface = null;
    this._mask = null;
    this._maskRects = [];
    this._maskArc = null;
  }

  public init(foreignObject: any) {
    this._surface = foreignObject;
  }

  public createNew(): Display {
    return new Display(this._objectHandler.createNew(), this._scaleManager.createNew());
  }

  public setMaskRects(maskRects: any[]) {
    this._maskRects = maskRects;

    this._updateRectMask();
  }

  public setArc(arc: {
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  }) {
    this._maskArc = arc;

    this._updateArcMask();
  }

  public destroy() {
    this._destroySurface();
  }

  public updateScale() {
    if (this._mask != null && this._maskRects.length > 0) {
      this._updateRectMask();
    } else if (this._mask != null && this._maskArc != null) {
      this._updateArcMask();
    }
  }

  public setTexture(source: string, frame: string) {
    this._changeTexture(source, frame);
  }

  private _getScaledMaskRects() {
    let snd = [];

    for (let c = 0; c < this._maskRects.length; c++) {
      let rect = this._maskRects[c];
      snd.push({
          x: this._getScale(rect.x),
          y: this._getScale(rect.y),
          width: this._getScale(rect.width),
          height: this._getScale(rect.height)
        });
    }

    return snd;
  }

  private _getScaledMaskArc() {
    if (this._maskArc != null) {
      return {
        x: this._getScale(this._maskArc.x),
        y: this._getScale(this._maskArc.y),
        radius: this._getScale(this._maskArc.radius),
        startAngle: this._getScale(this._maskArc.startAngle),
        endAngle: this._getScale(this._maskArc.endAngle)
      };
    } else {
      return null;
    }
  }

  //Foreign Dependencies
  private _setForeignX(object: any, val: number) {
    this._objectHandler.x(object, val);
  }

  private _setForeignY(object: any, val: number) {
    this._objectHandler.y(object, val);
  }

  private _getForeignX(object: any): number {
    return this._objectHandler.getX(object);
  }

  private _getForeignY(object: any): number {
    return this._objectHandler.getY(object);
  }

  private _getScale(val: number): number {
    return this._scaleManager.scale(val);
  }

  private _getInverseScale(val: number): number {
    return this._scaleManager.inverseScale(val);
  }

  private _updateRectMask() {
    let maskRects = this._getScaledMaskRects();
    this._mask = this._objectHandler.addMaskRects(this._surface, maskRects);
  }

  private _updateArcMask() {
    let maskArc = this._getScaledMaskArc();
    if (maskArc != null) {
      this._mask = this._objectHandler.addMaskArc(this._surface, maskArc);
    }
  }

  private _updateVisible() {
    if (this._surface != null) {
      this._objectHandler.visible(this._surface, this._visible);
    }
  }

  private _updateAlpha() {
    if (this._surface != null) {
      this._objectHandler.alpha(this._surface, this._alpha);
    }
  }

  private _destroySurface() {
    if (this._surface != null) {
      this._objectHandler.destroy(this._surface);

      this._surface = null;
    }
  }

  private _changeTexture(source: string, frame: string) {
    this._objectHandler.setTexture(this._surface, source, frame);
  }
}

export default Display;
