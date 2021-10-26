import Dom from './Dom';
import Sprite from './Sprite';
import Text from './Text';
import Video from './Video';
import IScreen from '../../Plugins/IScreen';

class GOFactory {
  private _dom: Dom;
  private _sprite: Sprite;
  private _text: Text;
  private _video: Video;
  private _screen: IScreen;

  constructor(dom: Dom, sprite: Sprite, text: Text, video: Video, screen: IScreen) {
    this._dom = dom;
    this._sprite = sprite;
    this._text = text;
    this._video = video;
    this._screen = screen;
  }

  public sprite(x: number, y: number, source: string, frame: string): Sprite {
    let spriteObject = this._sprite.createNew();
    spriteObject.init(x, y, source, frame);

    return spriteObject;
  }

  public text(x: number, y: number, label: string, style: any) {
    let textObject = this._text.createNew();
    textObject.init(x, y, label, style);

    return textObject;
  }


  public dom(x: number, y: number, source: string) {
    let domObject = this._dom.createNew();
    domObject.init(x, y, source);

    return domObject;
  }

  public video(x: number, y: number, key: string) {
    let videoObject = this._video.createNew();
    videoObject.init(x, y, key);

    return videoObject;
  }

  public canvas(key: string, width: number, height: number): Phaser.Textures.CanvasTexture {
    return this._screen.createCanvas(key, width, height);
  }
}

export default GOFactory;
