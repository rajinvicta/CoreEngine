import Position from './Components/Position';
import Scale from './Components/Scale';
import Display from './Components/Display';
import Message from './Components/Message';
import Input from './Components/Input';

import World from '../World';
import IScreen from '../../Plugins/IScreen';
import IGameObject from '../GameObjects/IGameObject';
import GOCore from '../GameObjects/Components/GOCore';

class Text implements IGameObject {
  private _position: Position;
  private _scale: Scale;
  private _display: Display;
  private _message: Message;
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

  get message(): Message {
    return this._message;
  }

  get input(): Input {
    return this._input;
  }

  constructor(position: Position, scale: Scale, display: Display, message: Message, input: Input, goCore: GOCore,
  screen: IScreen, world: World) {
    this._position = position;
    this._scale = scale;
    this._display = display;
    this._message = message;
    this._input = input;
    this._goCore = goCore;
    this._world = world;

    this._screen = screen;
  }

  public init(x: number, y: number, text: string, style: any): any {
    let foreignObject = this._screen.addText(text, style);

    this._position.init(foreignObject);
    this._scale.init(foreignObject);
    this._display.init(foreignObject);
    this._message.init(foreignObject);
    this._input.init(foreignObject);

    this._position.x = x;
    this._position.y = y;

    this._message.text = text;
    this._message.style = style;

    this._addToWorld();

    return foreignObject;
  }

  public createNew(): Text {
    let position = this._position.createNew();
    let scale = this.scale.createNew();
    let display = this._display.createNew();
    let message = this._message.createNew();
    let input = this._input.createNew();
    let goCore = this._goCore.createNew();

    return new Text(position, scale, display, message, input, goCore, this._screen, this._world);
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

export default Text;
