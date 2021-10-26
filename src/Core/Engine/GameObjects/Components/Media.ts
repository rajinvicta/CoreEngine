class Media {
  private _surface: any;

  constructor() {
    this._surface = null;
  }

  public init(foreignObject: any) {
    this._surface = foreignObject;
  }

  public play(loop: boolean) {
    this._surface.play(loop);
  }

  public setMute(val: boolean) {
    this._surface.setMute(val);
  }

  public stop() {
    this._surface.stop();
  }

  public createNew(): Media {
    return new Media();
  }
}

export default Media;
