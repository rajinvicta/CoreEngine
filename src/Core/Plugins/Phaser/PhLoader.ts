import 'phaser';

import ILoaderPlugin from '../ILoaderPlugin';

import PhObjectFactory from './PhObjectFactory';
import UrlUtil from '../../Utils/UrlUtil';
import Random from '../../Utils/Random';

class PhLoader implements ILoaderPlugin {
  private _onFileDownload: Function;
  private _onAllDone: Function;
  private _onProgress: Function;
  private _random: Random;

  private _phaserLoader: Phaser.Loader.LoaderPlugin | null;

  private _phObjectFactory: PhObjectFactory;
  private _urlUtil: UrlUtil;

  constructor(phObjectFactory: PhObjectFactory, urlUtil: UrlUtil, random: Random) {
    this._phObjectFactory = phObjectFactory;
    this._urlUtil = urlUtil;
    this._random = random;

    this._phaserLoader = null;

    this._onFileDownload = (data: any) => {

    };
    this._onAllDone = () => {};
    this._onProgress= (data: any) => {};
  }

  get onFileDownload(): Function {
    return this._onFileDownload;
  }

  get onAllDone(): Function {
    return this._onAllDone;
  }

  get onProgress(): Function {
    return this._onProgress;
  }

  set onFileDownload(foo: Function) {
    this._onFileDownload = foo;
  }

  set onAllDone(foo: Function) {
    this._onAllDone = foo;
  }

  set onProgress(foo: Function) {
    this._onProgress = foo;
  }

  public init() {
    this._phaserLoader = this._phObjectFactory.loader();
  }

  public addImages(urls: string[]): void {
    if(this._phaserLoader != null) {
      for (let c = 0; c < urls.length; c++) {
        let url = urls[c];
        let fileInfo = this._getFileData(url);

        //console.log("addImages", fileInfo.url);

        this._phaserLoader.image(fileInfo.key, fileInfo.url);
      }
    } else {
      this._loaderInitError();
    }
  }


  public addVideos(urls: string[]): void {
    if(this._phaserLoader != null) {
      for (let c = 0; c < urls.length; c++) {
        let url = urls[c];
        let fileInfo = this._getFileData(url);

        //console.log("addVideos", fileInfo.key, fileInfo.url);

        this._phaserLoader.video(fileInfo.key, fileInfo.url);
      }
    } else {
      this._loaderInitError();
    }
  }

  public addAtlases(urls: string[]) {
    if(this._phaserLoader != null) {
      for (let c = 0; c < urls.length; c++) {
        let url = urls[c];
        let fileInfo = this._getFileData(url);
        let pngUrl = this._convertUrlExt(fileInfo.url, 'json', 'png');

        //console.log("addAtlases", pngUrl, fileInfo.url);

        this._phaserLoader.atlas(fileInfo.key, pngUrl, fileInfo.url);
      }
    } else {
      this._loaderInitError();
    }
  }

  public addHtmls(urls: string[]) {
    if (this._phaserLoader != null) {
      for (let c = 0; c < urls.length; c++) {
        let url = urls[c];
        let fileInfo = this._getFileData(url);


        this._phaserLoader.html(fileInfo.key, fileInfo.url);
      }
    } else {
      this._loaderInitError();
    }
  }

  private _getRndName(): string {
    let allData = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let snd = "";

    for (let c = 0; c < 24; c++) {
      let i = this._random.int(0, allData.length - 1);
      snd += allData[i];
    }

    return snd;
  }

  private _getFileData(url: string): {key: string, url: string} {
    if (url.indexOf("blob:") > -1) {
      let key = url;

      return {key: key, url: url};
    } else {
      let fileInfo = this._getFileInfo(url);
      let key = fileInfo.fileName;

      return {key: key, url: url};
    }
  }

  public download(): void {
    if (this._phaserLoader != null) {
      this._phaserLoader.start();

      //console.log(this._phaserLoader.eventNames());

      this._phaserLoader.on('complete', () => {
        setTimeout(() => {
          this.onAllDone();
        }, 5);
      });

      this._phaserLoader.on('progress', (data: number) => {
        this.onProgress(data * 100);
      });


      this._phaserLoader.on('load', (data: any) => {
        this.onFileDownload(data);
      })

    } else {
      this._loaderInitError();
    }
  }

  private _loaderInitError() {
    console.error("Loader not initialized, can't add images");
  }

  private _getFileInfo(url: string): {url: string, file: string, fileName: string, ext: string} {
    return this._urlUtil.getInfo(url);
  }

  private _convertUrlExt(url: string, originalExt: string, newExt: string): string {
    return this._urlUtil.convertExt(url, originalExt, newExt);
  }
}

export default PhLoader;
