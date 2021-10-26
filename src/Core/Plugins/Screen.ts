import PhGame from './Phaser/PhGame';
import PhObjectFactory from './Phaser/PhObjectFactory';
import IScene from '../Engine/IScene';

class Screen {
  private _phGame: PhGame;
  private _phObjectFactory: PhObjectFactory;

  constructor(phGame: PhGame, phObjectFactory: PhObjectFactory) {
    this._phGame = phGame;
    this._phObjectFactory = phObjectFactory;

    (<any>window).Screen = this;
  }

  public startGame(config: any = {}) {
    this._phGame.start(config);
  }

  public addScene(scene: IScene, key: string) {
    this._phGame.addScene(scene, key);
  }

  public startScene(key: string) {
    this._phGame.startScene(key);
  }

  public addSprite(source: string, frame: string | null): any {
    return this._phObjectFactory.sprite(source, frame);
  }

  public addVideo(key: string): any {
    return this._phObjectFactory.video(key);
  }

  public addDom(name: string): any {
    return this._phObjectFactory.dom(name);
  }

  public addText(text: string, style: any) : any {
    return this._phObjectFactory.text(text, style);
  }

  public addTween(tweenData: any): any {
    return this._phObjectFactory.tween(tweenData);
  }

  public addFrameAnimation(name: string, sheet: string, frames: string[], frameRate: number, repeat: number): any {
    return this._phObjectFactory.frameAnimation(name, sheet, frames, frameRate, repeat);
  }

  public resize(width: number, height: number) {
    this._phGame.resize(width, height);
  }

  public createCanvas(key: string, width: number, height: number): any {
    return this._phGame.createCanvas(key, width, height);
  }

  public addBase64(key: string, texture: string) {
    return this._phGame.addBase64(key, texture);
  }
}

export default Screen;
