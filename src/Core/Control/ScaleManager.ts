import Config from './Config';

class ScaleManager {
  private _config: Config;
  private _isHeightBased: boolean;

  constructor(config: Config) {
    this._config = config;

    this._isHeightBased = false;
  }

  get ratio(): number {
    return this._getRatio();
  }

  get gameWidth(): number {
    return this.width / this._getRatio();
  }

  get gameHeight(): number {
    return this.height / this._getRatio();
  }

  get width(): number {
    if (this._isResponsive) {
      return this.windowWidth;
    } else {
      //console.log("ratio: %s, targetWidth: %s, width: %s ", this._getRatio(), this._targetWidth, this._getRatio() * this._targetWidth);
      return this._getRatio() * this._targetWidth;
    }
  }

  get height(): number {
    if (this._isResponsive) {
      return this.windowHeight;
    } else {
      //console.log("ratio: %s, targetHeight: %s, height: %s ", this._getRatio(), this._targetHeight, this._getRatio() * this._targetHeight);
      return this._getRatio() * this._targetHeight;
    }
  }

  get windowWidth(): number {
    //console.log(window.innerWidth);
    return window.innerWidth;
  }

  get windowHeight(): number {
    //console.log(window.innerHeight);
    return window.innerHeight;
  }

  get isHeightBased(): boolean {
    return this._isHeightBased;
  }

  get _targetWidth(): number {
    return this._config.width;
  }

  get _targetHeight(): number {
    return this._config.height;
  }

  get _isResponsive(): boolean {
    return this._config.responsive;
  }

  set isHeightBased(val: boolean) {
    this._isHeightBased = val;
  }

  public scale(val: number): number {
    let ratio = this._getRatio();

    //console.log("ratio: %s, val: %s, result: %s", ratio, val, ratio * val);

    return ratio * val;
  }

  public inverseScale(val: number): number {
    let ratio = this._getRatio();
    return val / ratio;
  }

  public createNew(): ScaleManager {
    return new ScaleManager(this._config);
  }

  private _getRatio(): number {
    let width = this.windowWidth;
    let height = this.windowHeight;

    if (this._isHeightBased) {
      return height / this._targetHeight;
    } else {
      return width / this._targetWidth;
    }
  }
}

export default ScaleManager;
