class Config {
  public CANVAS: number;
  public WEBGL: number;

  private _renderMode: number;
  private _width: number;
  private _height: number;
  private _responsive: boolean;
  private _background: string;
  private _parent: string;

  get renderMode(): number {
    return this._renderMode;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get responsive(): boolean {
    return this._responsive;
  }

  get background(): string {
    return this._background;
  }

  get parent(): string {
    return this._parent;
  }


  set renderMode(val: number) {
    this._renderMode = val;
  }

  set width(val: number) {
    this._width = val;
  }

  set height(val: number) {
    this._height = val;
  }

  set responsive(val: boolean) {
    this._responsive = val;
  }

  set background(val: string) {
    this._background = val;
  }

  set parent(val: string) {
    this._parent = val;
  }

  constructor() {
    this.CANVAS = 0;
    this.WEBGL = 1;

    this._width = 720;
    this._height = 1280;
    this._responsive = false;
    this._background = '#fff';
    this._parent = 'gameBox';

    this._renderMode = this.CANVAS;
  }
}

export default Config;
