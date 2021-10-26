import Resource from './Resource';
import Func from './Func';

class DataFactory {
  private _resource: Resource;
  private _func: Func;

  constructor(resource: Resource, func: Func) {
    this._resource = resource;
    this._func = func;
  }

  public resource(url: string): Resource {

    return this._resource.createNew(url);
  }

  public func(name: Symbol, f: Function, context: any = null) {
    return this._func.createNew(name, f, context);
  }
}

export default DataFactory;
