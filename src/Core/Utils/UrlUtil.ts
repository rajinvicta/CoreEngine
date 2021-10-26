class UrlUtil {
  constructor() {

  }

  public getInfo(url: string): {url: string, file: string, fileName: string, ext: string} {
    let sep = '/';

    if(url.indexOf('/') > -1) {

    } else if (url.indexOf('\\')) {
      sep = '\\';
    }

    let urlArr = url.split(sep);
    let file = urlArr[urlArr.length -1];
    let fileArr = file.split('.');
    let ext = fileArr[fileArr.length -1];
    let fileName = file.substr(0, file.indexOf('.' + ext));

    return {url: url, file: file, fileName: fileName, ext: ext};
  }

  public convertExt(url: string, originalExt: string, newExt: string) {
    originalExt = '.' + originalExt;
    newExt = '.' + newExt;

    return url.substr(0, url.length - originalExt.length) + newExt;
  }
}

export default UrlUtil;
