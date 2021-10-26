import Position from './Components/Position';
import Scale from './Components/Scale';
import Display from './Components/Display';
import Input from './Components/Input';
import AnimationManager from './Components/AnimationManager';
import Media from './Components/Media';

import World from '../World';
import IScreen from '../../Plugins/IScreen';
import IGameObject from '../GameObjects/IGameObject';
import GOCore from '../GameObjects/Components/GOCore';

class Video implements IGameObject {
  private _position: Position;
  private _scale: Scale;
  private _display: Display;
  private _input: Input;
  private _goCore: GOCore;
  private _media: Media;
  private _animationManager: AnimationManager;

  private _screen: IScreen;
  private _world: World;

  get position(): Position {
    return this._position;
  }

  get scale(): Scale {
    return this._scale;
  }

  get display(): Display {
    return this._display;
  }

  get input(): Input {
    return this._input;
  }

  get media(): Media {
    return this._media;
  }

  get anims(): AnimationManager {
    return this._animationManager;
  }

  constructor(position: Position, scale: Scale, display: Display, input: Input, goCore: GOCore, media: Media,
  animationManager: AnimationManager, screen: IScreen, world: World) {
    this._position = position;
    this._scale = scale;
    this._display = display;
    this._input = input;
    this._media = media;
    this._goCore = goCore;
    this._animationManager = animationManager;

    this._screen = screen;
    this._world = world;
  }

  public init(x: number, y: number, key: string): any {
    let foreignObject = this._screen.addVideo(key);

    this._position.init(foreignObject);
    this._scale.init(foreignObject);
    this._display.init(foreignObject);
    this._input.init(foreignObject);
    this._animationManager.init(foreignObject);
    this._media.init(foreignObject);

    this._position.x = x;
    this._position.y = y;

    this._addToWorld();

    return foreignObject;
  }

  public createNew(): Video {
    let position = this._position.createNew();
    let scale = this.scale.createNew();
    let display = this._display.createNew();
    let input = this._input.createNew();
    let animationManager = this._animationManager.createNew();
    let media = this._media.createNew();
    let goCore = this._goCore.createNew();

    return new Video(position, scale, display, input, goCore, media, animationManager, this._screen, this._world);
  }

  public destroy() {
    this._destroy();
  }

  //Foreign Dependencies
  private _addToWorld() {
    this._goCore.addToWorld(this);
  }

  private _destroy() {
    this._goCore.destroy();
  }
}

export default Video;
