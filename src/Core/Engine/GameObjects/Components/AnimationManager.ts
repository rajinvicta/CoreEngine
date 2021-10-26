import Tween from '../../Animation/Tween';
import SheetAnim from '../../Animation/SheetAnim';

class AnimationManager {
  private _tween: Tween;
  private _sheetAnim: SheetAnim;

  get tween(): Tween {
    return this._tween;
  }

  get sheetAnim(): SheetAnim {
    return this._sheetAnim;
  }

  constructor(tween: Tween, sheetAnim: SheetAnim) {
    this._tween = tween;
    this._sheetAnim = sheetAnim;
  }

  public init(actor: any) {
    this._sheetAnim.init(actor);
  }

  public createNew(): AnimationManager {
    return new AnimationManager(this._tween.createNew(), this._sheetAnim.createNew());
  }
}

export default AnimationManager;
