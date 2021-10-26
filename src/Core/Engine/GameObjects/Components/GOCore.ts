import IGameObject from '../IGameObject';
import World from '../../World';

class GOCore {
  private _world: World;
  private _gObject: IGameObject | null;

  constructor(world: World) {
    this._world = world;
    this._gObject = null;
  }

  public createNew(): GOCore {
    return new GOCore(this._world);
  }

  public destroy() {
    if (this._gObject) {
      this._gObject.display.destroy();
      this._gObject.scale.cleanListners();
    }
  }

  public addToWorld(gobj: IGameObject) {
    if (this._world.activeScene) {
      this._world.activeScene.objects.push(gobj);
    }
  }
}

export default GOCore;
