import IObjectHandler from '../IObjectHandler';
import PhObjectFactory from './PhObjectFactory';

class PhObjectHandler implements IObjectHandler {
  private _phObjectFactory: PhObjectFactory;

  constructor(phObjectFactory: PhObjectFactory) {
    this._phObjectFactory = phObjectFactory;
  }

  public createNew(): IObjectHandler {
    return new PhObjectHandler(this._phObjectFactory.createNew());
  }

  public x(object: any, val: number) {
    object.x = val;
  }

  public y(object: any, val: number) {
    object.y = val;
  }

  public getX(object: any): number {
    return object.x;
  }

  public getY(object: any): number {
    return object.y;
  }

  public originX(object: any, val: number) {
    object.setOrigin(val, object.originY);
  }

  public originY(object: any, val: number) {
    object.setOrigin(object.originX, val);
  }

  public alpha(object: any, val: number) {
    object.alpha = val;
  }

  public angle(object: any, val: number) {
    object.angle = val;
  }

  public visible(object: any, val: boolean) {
    object.visible = val;
  }

  public scaleX(object: any, val: number) {
    object.scaleX = val;
  }

  public scaleY(object: any, val: number) {
    object.scaleY = val;
  }

  public text(object: any, val: string) {
    //console.log("changing text: ", object, val);
    object.text = val;
  }

  public style(object: any, val: any) {
    object.style = val;
  }

  public destroy(object: any) {
    object.destroy();
  }

  public addMouseUp(object: any, foo: Function) {
    object.onpointerup = foo;
  }

  public addMouseDown(object: any, foo: Function) {
    object.on('pointerdown', foo);
  }

  public addDrag(object: any, dragStart: Function, drag: Function, dragEnd: Function) {
    //console.log("object: ", object);
    //console.log("scene: ", object.scene);

    if (object.scene) {
      object.scene.input.setDraggable(object);

      object.scene.input.on('dragstart', (pointer: any, gameObject: any) => {
        if (gameObject == object) dragStart(pointer);
      });

      object.scene.input.on('drag', (pointer: any, gameObject: any, dragX: any, dragY: any) => {
        drag(pointer, dragX, dragY);
      });


      object.scene.input.on('dragend', (pointer: any, gameObject: any) => {
        if (gameObject == object) dragEnd(pointer);
      });
    } else {
      console.error("No scene!");
    }



  }

  public addMaskArc(object: any, arc: any): any {
    return this._phObjectFactory.maskArc(object, arc);
  }

  public addMaskRects(object: any, rects: any[]): any {
    return this._phObjectFactory.maskRects(object, rects);
  }

  public playFrameAnimation(object: any, name: string, onComplete: Function, onUpdate: Function,
  onRepeat: Function, onStart: Function = () => {}) {
    object.play(name);
    object.once(Phaser.Animations.Events.ANIMATION_COMPLETE, onComplete);
    object.once(Phaser.Animations.Events.ANIMATION_UPDATE, onUpdate);
    object.once(Phaser.Animations.Events.ANIMATION_REPEAT, onRepeat);
    object.once(Phaser.Animations.Events.ANIMATION_START, onStart);

    onUpdate();
    onRepeat();
    onComplete();
  }


  public getWidth(object: any): number {
    return object.displayWidth;
  }

  public getHeight(object: any): number {
    return object.displayHeight;
  }

  public setWidth(object: any, val: number) {
    object.displayWidth = val;
  }

  public setHeight(object: any, val: number) {
    object.displayHeight = val;
  }

  public getOriginalWidth(object: any): number {
    return object.width;
  }

  public getOriginalHeight(object: any): number {
    return object.height;
  }

  public setTexture(object: any, source: string, frame: string) {
    object.setTexture(source, frame);
  }

}

export default PhObjectHandler;
