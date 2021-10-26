import 'phaser';

import PhGame from './PhGame';

class PhObjectFactory {
  private _phGame: PhGame;

  constructor(phGame: PhGame) {
    this._phGame = phGame;
  }

  public createNew(): PhObjectFactory {
    return new PhObjectFactory(this._phGame);
  }

  public text(text: string, style: any): Phaser.GameObjects.Text | null {
    //console.log("debug2: text currentScene: ", (<any>this._phGame).currentScene.parentScene);
    if (this._phGame.currentScene != null) {
      let txt = this._phGame.currentScene.add.text(0, 0, text, style);
      return txt;
    } else {
      this._noActiveSceneError();
      return null;
    }
  }

  public frameAnimation(name: string, sheet: string, frames: string[], frameRate: number, repeat: number): Phaser.Animations.Animation | null {
    if (this._phGame.currentScene != null) {
      let anim = this._phGame.currentScene.anims.create({
        key: name,
        frameRate: frameRate,
        frames: this._generateFrames(sheet, frames),
        repeat: repeat
      });

      if (anim) {
        return anim;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  public maskArc(
    sprite: Phaser.GameObjects.Sprite,
    arc: {
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number
    }): any {
      if (this._phGame.currentScene != null) {
        let shape = this._phGame.currentScene.make.graphics({});
        shape.fillStyle(0xffffff);

        shape.slice(
          arc.x,
          arc.y,
          arc.radius,
          Phaser.Math.DegToRad(arc.startAngle),
          Phaser.Math.DegToRad(arc.endAngle),
          false
        );

        //console.log("clockwise");

        shape.fillPath();

        let mask = shape.createGeometryMask();
        sprite.setMask(mask);

        return shape;

      } else {
        return null;
      }
    }

  public maskRects(sprite:Phaser.GameObjects.Sprite, rects: any[]): any | null {
    if (this._phGame.currentScene != null) {
      let shape = this._phGame.currentScene.make.graphics({});
      shape.fillStyle(0xffffff);
      shape.beginPath();

      for (let c = 0; c < rects.length; c++) {
        let rect = rects[c];
        shape.fillRect(rect.x, rect.y, rect.width, rect.height);
      }

      let mask = shape.createGeometryMask();
      sprite.setMask(mask);

      return shape;
    } else {
      this._noActiveSceneError();

      return null;
    }
  }

  public sprite(key: string, key2: string | null = null): Phaser.GameObjects.Sprite | null {
    if (this._phGame.currentScene != null) {
      if(key2 != null) {
        let spr = this._phGame.currentScene.add.sprite(0, 0, key, key2);
        (<any>spr).onpointerup = () => {

        };

        spr.on('pointerup', (pointer: any) => {
          (<any>spr).onpointerup(pointer);
        });

        spr.setInteractive();
        return spr;
      } else {
        let spr = this._phGame.currentScene.add.sprite(0, 0, key);
        spr.setInteractive();
        return spr;
      }
    } else {
      this._noActiveSceneError();
      return null;
    }
  }


  public video(key: string): Phaser.GameObjects.Video | null {
    if (this._phGame.currentScene != null) {
      let spr = this._phGame.currentScene.add.video(0, 0, key);
      spr.setInteractive();
      return spr;
    } else {
      this._noActiveSceneError();
      return null;
    }
  }

  public dom(name: string): Phaser.GameObjects.DOMElement | null {
    if (this._phGame.currentScene != null) {
      return this._phGame.currentScene.add.dom(0, 0).createFromCache(name);
    } else {
      this._noActiveSceneError();
      return null;
    }
  }

  public tween(tweenData: any): Phaser.Tweens.Tween | null {
    if (this._phGame.currentScene != null) {
      console.log(tweenData);
      console.log(this._phGame.currentScene);
      return this._phGame.currentScene.add.tween(tweenData);
    } else {
      this._noActiveSceneError();
      return null;
    }
  }

  public loader(): Phaser.Loader.LoaderPlugin | null {
    let scene = this._phGame.currentScene;

    if (scene != null) {
      return new Phaser.Loader.LoaderPlugin(scene);
    } else {
      this._noActiveSceneError();
      return null;
    }
  }

  private _noActiveSceneError() {
    console.error("No scene currently in play, can't create a loader");
  }

  private _generateFrames(key: string, frames: string[]): Phaser.Types.Animations.AnimationFrame[] {
    let phFrames: Phaser.Types.Animations.AnimationFrame[] = [];

    for (let c = 0; c < frames.length; c++) {
      phFrames.push({key: key, frame: frames[c]});
    }

    return phFrames;
  }
}

export default PhObjectFactory;
