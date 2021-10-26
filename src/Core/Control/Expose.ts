class Expose {
  private _baseObject: string;

  constructor() {
    this._baseObject = "CoreEngine";
  }

  public add(name: string, object: any) {
    this._addMainObject();

    this._add(name, object);
  }

  private _add(name: string, object: any) {
    let win = (<any>window);
    let base = win[this._baseObject];
    base[name] = object;
  }

  private _addMainObject() {
    let win = (<any>window);

    if (!win.hasOwnProperty(this._baseObject)) {
      win[this._baseObject] = {};
      (<any>window).CoreEngine__WEBPACK_IMPORTED_MODULE_0___default = {};
      (<any>window).CoreEngine__WEBPACK_IMPORTED_MODULE_0___default.a = win[this._baseObject];
    }

  }
}

export default Expose;
