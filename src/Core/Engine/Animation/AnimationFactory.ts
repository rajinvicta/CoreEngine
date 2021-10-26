import Tween from './Tween';


class AnimationFactory {
  private _tween: Tween;

  constructor(tween: Tween) {
    this._tween = tween;
  }

  public tween(name: string, ease: string, target: any, repeat: number, delay: number): Tween {
    let t = this._tween.createNew();
    t.init(name, ease, target, repeat, delay)

    return t;
  }
}

export default AnimationFactory;
