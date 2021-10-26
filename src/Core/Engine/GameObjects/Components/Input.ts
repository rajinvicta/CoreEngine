import IObjectHandler from '../../../Plugins/IObjectHandler';
import ScaleManager from '../../../Control/ScaleManager';

class Input {
  private _objectHandler: IObjectHandler;
  private _scaleManager: ScaleManager;

  private _surface: any | null;

  constructor(objectHandler: IObjectHandler, scaleManager: ScaleManager) {
    this._objectHandler = objectHandler;
    this._scaleManager = scaleManager;

    this._surface = null;
  }

  public init(foreignObject: any) {
    this._surface = foreignObject;
  }

  public createNew(): Input {
    return new Input(this._objectHandler.createNew(), this._scaleManager);
  }

  public addMouseUp(foo: Function) {
    this._addMouseUp(foo);
  }

  public addMouseDown(foo: Function) {
    this._addMouseDown(foo);
  }

  public addDrag(dragStart: Function, drag: Function, dragEnd: Function) {
    //console.log("debug 7 input: adding drag: ", this._surface, this._surface.scene);

    this._objectHandler.addDrag(this._surface, dragStart, (pointer: any, dragX: any, dragY: any) => {
      drag(pointer, this._inverseScale(dragX), this._inverseScale(dragY));
    }, dragEnd);
  }

  //Foreign Functions
  private _addMouseUp(foo: Function) {
    if (this._surface != null) this._objectHandler.addMouseUp(this._surface, foo);
  }

  private _addMouseDown(foo: Function) {
    if (this._surface != null) this._objectHandler.addMouseDown(this._surface, foo);
  }

  private _inverseScale(val: number): number {
    return this._scaleManager.inverseScale(val);
  }
}

export default Input;
