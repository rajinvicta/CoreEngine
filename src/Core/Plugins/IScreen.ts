import IScene from '../Engine/IScene';

interface IScreen {
  startGame(config?: any): void;
  addScene(scene: IScene, key: string): void;
  startScene(key: string): void;
  addDom(name: string): any;
  addSprite(source: string, frame: string | null): any;
  addVideo(key: string): any;
  addTween(tweenData: any): any;
  addText(text: string, style: any) : any;
  addFrameAnimation(name: string, sheet: string, frames: string[], frameRate: number, repeat: number): any
  resize(width: number, height: number) : void;
  createCanvas(key: string, width: number, height: number): any;
  addBase64(key: string, texture: string): any;
}

export default IScreen;
