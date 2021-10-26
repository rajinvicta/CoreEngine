import Position from './Components/Position';
import Scale from './Components/Scale';
import Display from './Components/Display';
import Input from './Components/Input';

import World from '../World';
import IScreen from '../../Plugins/IScreen';
import IGameObject from '../GameObjects/IGameObject';
import GOCore from '../GameObjects/Components/GOCore';

class Dom implements IGameObject {
  private _position: Position;
  private _scale: Scale;
  private _display: Display;
  private _input: Input;
  private _goCore: GOCore;

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

  constructor(position: Position, scale: Scale, display: Display, input: Input, goCore: GOCore, screen: IScreen, world: World) {
    this._position = position;
    this._scale = scale;
    this._display = display;
    this._input = input;
    this._goCore = goCore;

    this._screen = screen;
    this._world = world;
  }

  public init(x: number, y: number, source: string): any {
    let foreignObject = this._screen.addDom(source);

    this._position.init(foreignObject);
    this._scale.init(foreignObject);
    this._display.init(foreignObject);
    this._input.init(foreignObject);

    this._position.x = x;
    this._position.y = y;

    this._addToWorld();

    return foreignObject;
  }

  public createNew(): Dom {
    let position = this._position.createNew();
    let scale = this.scale.createNew();
    let display = this._display.createNew();
    let input = this._input.createNew();
    let goCore = this._goCore.createNew();

    return new Dom(position, scale, display, input, goCore, this._screen, this._world);
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

export default Dom;
