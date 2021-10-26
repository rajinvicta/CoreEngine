import UrlUtil from '../Utils/UrlUtil';
type ResourceType = {
  IMG: string;
  SND: string;
  ATLAS: string;
  JSON: string;
  VID: string;
  HTML: string;
};

class Resource {
  private _urlUtil: UrlUtil;

  private _data: any;
  private _url: string;
  private _type: string;

  private _TYPES: ResourceType;

  get data(): any {
    return this._data;
  }

  get url(): string {
    return this._url;
  }

  get type(): string {
    return this._type;
  }

  get TYPES(): ResourceType {
    return this._TYPES;
  }

  set url(address: string) {
    this._url = address;
  }

  constructor(urlUtil: UrlUtil) {
    this._urlUtil = urlUtil;

    this._url = "";
    this._type = "";

    this._TYPES = {
      IMG: "IMG",
      SND: "SND",
      ATLAS: "ATLAS",
      JSON: "JSON",
      VID: "VID",
      HTML: "HTML"
    }
  }

  public createNew(url: string): Resource {
    let resource = new Resource(this._urlUtil);

    resource.url = url;

    return resource;
  }

  public getType(url: string): string {
    let info = this._urlUtil.getInfo(url);

    if (info.ext == "png" || info.ext == "jpg" || info.ext == 'jpeg') {
      return this._TYPES.IMG;
    } else if (info.ext == 'ogg' || info.ext == 'm4a' || info.ext == 'mp3' || info.ext == 'wav') {
      return this._TYPES.SND;
    } else if (info.ext == 'json') {
      return this._TYPES.ATLAS;
    } else if(info.ext == "mp4") {
      return this._TYPES.VID;
    } else if (info.ext == "html" || info.ext == "htm") {
      return this._TYPES.HTML;
    } else {
      return this._TYPES.IMG;
    }
  }
}

export default Resource;
