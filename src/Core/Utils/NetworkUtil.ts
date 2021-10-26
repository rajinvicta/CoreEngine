class NetworkUtil {
  constructor() {

  }

  public get(path: string) {

    return new Promise((resolve: Function, reject: Function) => {
      let that = this;

      var request = new XMLHttpRequest();
      request.open('GET', path, true);

      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          var data = JSON.parse(this.response);
          that._processData(data);

          console.log(data);
          resolve(data);
        } else {
          reject('ERROR');

        }
      };

      request.onerror = function() {
        reject("ERROR");
      };

      request.send();

    });
  }

  public post(url: string, data: any) {
    return new Promise((resolve: Function, reject: Function) => {
      let resData = this._postReq(url, data);

      resolve(resData);
    })
  }

  // Make an HTTP PUT Request
   private async _postReq(url: string, data: any) {

    // Awaiting fetch which contains method,
    // headers and content-type and body
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Awaiting response.json()
    const resData = await response.json();

    // Return response data
    return resData;
  }

  private _processData(data: any) {
    if (data.length != undefined) {
      for (let c = 0; c < data.length; c++) {
        this._cleanObject(data[c]);
      }
    } else {
      this._cleanObject(data);
    }
  }

  private _cleanObject(obj: any) {
    for (const property in obj) {
      if (isNaN( parseInt(obj[property]) )) {
        obj[property] = obj[property].replaceAll("\\n", "\n");
      } else {
        obj[property] = parseFloat(obj[property]);
      }
    }
  }
}

export default NetworkUtil;
