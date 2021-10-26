import PhScene from './PhScene';

class PhFactory {
  private _phScene: PhScene;

  constructor(phScene: PhScene) {
    this._phScene = phScene;
  }

  phScene(): PhScene {
    return this._phScene.createNew();
  }
}

export default PhFactory;
