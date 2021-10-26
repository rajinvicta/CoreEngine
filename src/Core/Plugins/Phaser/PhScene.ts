import 'phaser';
import IScene from '../../Engine/IScene';
import Loop from '../../Control/Loop';

class PhScene {
  private _phaserScene: Phaser.Scene | null;
  private _loop: Loop;

  constructor(loop: Loop) {
    this._loop = loop;
    this._phaserScene = null;
  }

  get scene(): Phaser.Scene | null {
    if (this._phaserScene == null) console.warn("Scene accessed before initialization!");

    return this._phaserScene;
  }

  public init(sceneInfo: IScene) {
    this._phaserScene = this._createSceneClass(sceneInfo);
  }

  public createNew(): PhScene {
    return new PhScene(this._loop);
  }

  private _createSceneClass(sceneInfo: IScene): Phaser.Scene {
    let loop = this._loop;

    class SCN extends Phaser.Scene {

      constructor() {
        super({});
      }

      public preload() {
        sceneInfo.boot();
      }

      public create() {
        sceneInfo.create();
      }

      public update(time: number) {
        loop.update(time);
        sceneInfo.update();
      }

      public shutdown() {
        sceneInfo.shutdown();
      }
    }

    let scn = new SCN();

    return scn;
  }
}

export default PhScene;
