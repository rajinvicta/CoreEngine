import ILoaderWall from './ILoaderWall';
import ILoaderPlugin from './ILoaderPlugin';

import PhLoader from './Phaser/PhLoader';

class LoaderWall implements ILoaderWall {
  private _imageLoader: ILoaderPlugin;

  constructor(phLoader: PhLoader) {
    this._imageLoader = phLoader;
  }

  get imageLoader(): ILoaderPlugin {
    return this._imageLoader;
  }
}

export default LoaderWall;
