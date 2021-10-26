import Func from '../Data/Func';
import DataFactory from '../Data/DataFactory';
import ArrayUtil from '../Utils/ArrayUtil';

class Loop {
  private _dataFactory: DataFactory;
  private _arrayUtil: ArrayUtil;

  private _funcList: Func[];

  constructor(dataFactory: DataFactory, arrayUtil: ArrayUtil) {
    this._dataFactory = dataFactory;
    this._arrayUtil = arrayUtil;

    this._funcList = [];
  }

  public addFunction(name: Symbol, func: Function, context: any) {
    if (!this._elmExists(this._funcList, 'name', name)) {
      let f = this._dataFactory.func(name, func, context);
      this._funcList.push(f);
    }
  }

  public removeFunction(name: Symbol) {
    if (this._elmExists(this._funcList, 'name', name)) {
      this._complexRemove(this._funcList, 'name', name);
    }
  }

  public update(time: number) {
    for (let c = 0; c < this._funcList.length; c++) {
      this._funcList[c].f(time);
    }
  }

  public clear() {
    this._funcList = [];
  }

  private _complexRemove(array: Array<any>, key: string, value: Symbol) {
    this._arrayUtil.removeElement(array, key, value);
  }

  private _elmExists(array: Array<any>, key: string, value: Symbol) {
    let i = this._getComplexIndex(array, key, value);

    if (i > -1) {
      return true;
    } else {
      return false;
    }
  }

  private _getComplexIndex(array: Array<any>, key: string, value: Symbol) {
    let elm = this._arrayUtil.getElement(array, key, value);

    return array.indexOf(elm);
  }
}

export default Loop;
