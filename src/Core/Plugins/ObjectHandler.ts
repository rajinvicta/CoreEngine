import IObjectHandler from './IObjectHandler';
import PhObjectHandler from './Phaser/PhObjectHandler';

class ObjectHandler implements IObjectHandler {
  private _phObjectHandler: PhObjectHandler;
  private _handler: IObjectHandler;

  constructor(phObjectHandler: PhObjectHandler) {
    this._phObjectHandler = phObjectHandler;

    this._handler = this._phObjectHandler;
  }

  public createNew(): IObjectHandler {
    return new ObjectHandler((<PhObjectHandler>this._handler.createNew()));
  }

  public x(object: any, val: number) {
    this._handler.x(object, val);
  }

  public y(object: any, val: number) {
    this._handler.y(object, val);
  }

  public getX(object: any): number {
    return this._handler.getX(object);
  }

  public getY(object: any): number {
    return this._handler.getY(object);
  }

  public originX(object: any, val: number) {
    this._handler.originX(object, val);
  }

  public originY(object: any, val: number) {
    this._handler.originY(object, val);
  }

  public alpha(object: any, val: number) {
    this._handler.alpha(object, val);
  }

  public angle(object: any, val: number) {
    this._handler.angle(object, val);
  }

  public visible(object: any, val: boolean) {
    this._handler.visible(object, val);
  }

  public scaleX(object: any, val: number) {
    object.scaleX = val;
  }

  public scaleY(object: any, val: number) {
    object.scaleY = val;
  }

  public text(object: any, val: string) {
    this._handler.text(object, val);
  }

  public style(object: any, val: any) {
    this._handler.style(object, val);
  }

  public destroy(object: any) {
    this._handler.destroy(object);
  }

  public addMouseUp(object: any, foo: Function) {
    this._handler.addMouseUp(object, foo);
  }

  public addMouseDown(object: any, foo: Function) {
    this._handler.addMouseDown(object, foo);
  }

  public addDrag(object: any, dragStart: Function, drag: Function, dragEnd: Function) {
    this._handler.addDrag(object, dragStart, drag, dragEnd);
  }

  public addMaskRects(object: any, rects: any[]): any {
    return this._handler.addMaskRects(object, rects);
  }

  public addMaskArc(object: any, arc: any): any {
    return this._handler.addMaskArc(object, arc);
  }

  public playFrameAnimation(object: any, name: string, onComplete: Function, onUpdate: Function,
  onRepeat: Function, onStart: Function = () => {}) {
    this._handler.playFrameAnimation(object, name, onComplete, onUpdate, onRepeat, onStart);
  }


  public getWidth(object: any): number {
    return this._handler.getWidth(object);
  }

  public getHeight(object: any): number {
    return this._handler.getHeight(object);
  }

  public setWidth(object: any, val: number) {
    this._handler.setWidth(object, val);
  }

  public setHeight(object: any, val: number) {
    this._handler.setHeight(object, val);
  }

  public getOriginalWidth(object: any): number {
    return this._handler.getOriginalWidth(object);
  }

  public getOriginalHeight(object: any): number {
    return this._handler.getOriginalHeight(object);
  }

  public setTexture(object: any, source: string, frame: string) {
    this._handler.setTexture(object, source, frame);
  }

}

export default ObjectHandler;
