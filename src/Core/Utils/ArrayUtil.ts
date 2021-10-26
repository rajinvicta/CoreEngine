class ArrayUtil {
  constructor() {

  }

  public createNew(): ArrayUtil {
    return new ArrayUtil();
  }

  public getElement(array: Array<any>, key: string, value: any): any {
    for (let c = 0; c < array.length; c++) {
      let elm = array[c];
      if (elm[key] == value) return elm;
    }

    return null;
  }

  public removeElement(array: Array<any>, key: string, value: any): any {
    let elm = this.getElement(array, key, value);
    let i = array.indexOf(elm);

    if (i > -1) {
      array.splice(i, 1);
    } else {
      console.error("element not found");
    }
  }

  public executeArray(array: Array<any>, key: string | null = null) {
    for (let c = 0; c < array.length; c++) {
      let elm = array[c];
      if (key != null) {
        let f = elm[key];
        f();
      } else {
        elm();
      }
    }
  }

  public getPlainArray(object: any): Array<any> {
    let result = Object.keys(object).map((key) => object[key]);

    return result;
  }
}

export default ArrayUtil;
