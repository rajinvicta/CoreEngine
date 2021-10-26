interface IObjectHandler {
  createNew(): IObjectHandler;
  x(object: any, val: number): void;
  y(object: any, val: number): void;
  getX(object: any): number;
  getY(object: any): number;
  originX(object: any, val: number): void;
  originY(object: any, val: number): void;
  alpha(object: any, val: number): void;
  angle(object: any, val: number): void;
  visible(object: any, val: boolean): void;
  scaleX(object: any, val: number): void;
  scaleY(object: any, val: number): void;
  text(object: any, val: string): void;
  style(object: any, val: any): void;
  destroy(object: any): void;
  addMouseUp(object: any, foo: Function): void;
  addMouseDown(object: any, foo: Function): void;
  addMaskRects(obect: any, rects: any[]): any;
  addMaskArc(object: any, arc: any): any;
  addDrag(object: any, dragStart: Function, drag: Function, dragEnd: Function): void;
  getWidth(object: any): number;
  getHeight(object: any): number;
  setWidth(object: any, val: number): void;
  setHeight(object: any, val: number): void;
  getOriginalWidth(object: any): number;
  getOriginalHeight(object: any): number;
  setTexture(object: any, source: string, frame: string): void;

  playFrameAnimation(object: any, name: string, onComplete: Function, onUpdate: Function,
  onRepeat: Function, onStart: Function): void;
}

export default IObjectHandler;
