class RemoveDup {
  constructor() {

  }

  public remove(a: any[]): any[] {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs: any[] = [];

    return a.filter(function(item) {
      var type = typeof item;
      if(type in prims)
        return (<any>prims)[type].hasOwnProperty(item) ? false : ((<any>prims)[type][item] = true);
      else
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
  }
}

export default RemoveDup;