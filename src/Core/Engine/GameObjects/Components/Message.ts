import IObjectHandler from '../../../Plugins/IObjectHandler';

class Message {
  private _objectHandler: IObjectHandler;

  private _text: string;
  private _style: any | null;

  private _surface: any | null;

  get text(): string {
    return this._text;
  }

  get style(): any | null {
    return this._style;
  }

  set text(val: string) {
    this._text = val;

    this._updateText(val);
  }

  set style(val: any) {
    this._style = val;

    this._updateStyle(val);
  }

  constructor(objectHandler: IObjectHandler) {
    this._objectHandler = objectHandler;

    this._text = "";
    this._style = null;

    this._surface = null;
  }

  public init(foreignObject: any) {
    this._surface = foreignObject;
  }

  public createNew(): Message {
    return new Message(this._objectHandler.createNew());
  }

  //Foreign Dependencies
  private _updateText(val: string) {
    if (this._surface != null) this._objectHandler.text(this._surface, val);
  }

  private _updateStyle(val: any) {
    if (this._surface != null) this._objectHandler.style(this._surface, val);
  }
}

export default Message;
