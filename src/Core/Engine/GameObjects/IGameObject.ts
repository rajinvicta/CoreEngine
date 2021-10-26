import Position from './Components/Position';
import Scale from './Components/Scale';
import Display from './Components/Display';
import Input from './Components/Input';

interface IGameObject {
  position: Position;
  scale: Scale;
  display: Display;
  input: Input;
  destroy(): void;
}

export default IGameObject;
