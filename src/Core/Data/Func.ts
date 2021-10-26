class Func {
  private _f: Function;
  private _name: Symbol;

  constructor() {
    this._f = () => {

    }

    this._name = Symbol();
  }

  get f(): Function {
    return this._f;
  }

  get name(): Symbol {
    return this._name;
  }

  set f(val: Function) {
    this._f = val;
  }

  set name(val: Symbol) {
    this._name = val;
  }

  public createNew(name: Symbol, f: Function, context: any = null): Func {
    let func = new Func();
    func.name = name;

    if (context != null){
      func.f = f.bind(context);
    } else {
      func.f = f;
    }

    return func;
  }

  public execute() {
    this._f();
  }
}

export default Func;
