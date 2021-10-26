import ILoaderWall from '../Plugins/ILoaderWall';
import ILoaderPlugin from '../Plugins/ILoaderPlugin';
import IScreen from '../Plugins/IScreen';
import Resource from '../Data/Resource';

class Loader {
  private _loaderWall: ILoaderWall;
  private _imageLoader: ILoaderPlugin;
  private _resource: Resource;
  private _screen: IScreen;

  private _imageLoaderProgress: number;


  constructor(loaderWall: ILoaderWall, resource: Resource, screen: IScreen) {
    this._loaderWall = loaderWall;
    this._resource = resource;
    this._screen = screen;

    this._imageLoader = this._loaderWall.imageLoader;

    this._imageLoaderProgress = -1;
    this._resetImageLoader();


    this._imageLoader.onAllDone = () => {
      this._resetImageLoader();
    }

    this._imageLoader.onProgress = (prog: number) => {
      this._imageLoaderProgress = prog;
    }
  }

  set onAllDone(foo: Function) {
    this._imageLoader.onAllDone = () => {
      this._resetImageLoader();
      foo();
    }
  }

  set onProgress(foo: Function) {
    this._imageLoader.onProgress = (prog: number) => {
      this._imageLoaderProgress = prog;
      foo(prog);
    }
  }

  get NULLPROGRESS(): number {
    return -1;
  }

  get progress(): number {
    return (this._imageLoaderProgress + 0) / 1;
  }

  public addBase64(key: string, texture: string) {
    this._screen.addBase64(key, texture);
  }

  public add(urls: string[], defaultType: string | null = null) {
    this._initAll();

    let type = this._getType(urls[0], defaultType);

    //console.log("Type : ", type);

    if (type == this._resource.TYPES.IMG) {
      this._imageLoader.addImages(urls);
    } else if (type == this._resource.TYPES.SND) {

    } else if (type == this._resource.TYPES.ATLAS) {
      this._imageLoader.addAtlases(urls);
    } else if (type == this._resource.TYPES.JSON) {
      this._imageLoader.addImages(urls);
    } else if (type == this._resource.TYPES.VID){
      this._imageLoader.addVideos(urls);
    } else if (type == this._resource.TYPES.HTML) {
      this._imageLoader.addHtmls(urls);
    } else {
      this._imageLoader.addImages(urls);
    }
  }

  public addHtmls(urls: string[]) {
    this._imageLoader.addHtmls(urls);
  }

  public download() {
    this._imageLoader.download();
  }

  private _initAll() {
    this._imageLoader.init();
  }

  private _getType(url: string, defaultType: string | null): string {
    if (defaultType != null) {
      return defaultType;
    } else {
      return this._resource.getType(url);
    }
  }

  private _resetImageLoader() {
    this._imageLoaderProgress = -1;
  }
}

export default Loader;
