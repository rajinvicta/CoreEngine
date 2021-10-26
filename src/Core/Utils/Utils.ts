import ArrayUtil from './ArrayUtil';
import NetworkUtil from './NetworkUtil';
import RemoveDup from './RemoveDup';
import UrlUtil from './UrlUtil';
import Random from './Random';

class Utils {
  private _arrayUtil: ArrayUtil;
  private _networkUtil: NetworkUtil;
  private _removeDup: RemoveDup;
  private _urlUtil: UrlUtil;
  private _random: Random;

  constructor(arrayUtil: ArrayUtil, networkUtil: NetworkUtil, removeDup: RemoveDup, urlUtil: UrlUtil, random: Random) {
    this._arrayUtil = arrayUtil;
    this._networkUtil = networkUtil;
    this._removeDup = removeDup;
    this._urlUtil = urlUtil;
    this._random = random;
  }

  get arrayUtil(): ArrayUtil {
    return this._arrayUtil;
  }

  get networkUtil(): NetworkUtil {
    return this._networkUtil;
  }

  get removeDup(): RemoveDup {
    return this._removeDup;
  }

  get urlUtil(): UrlUtil {
    return this._urlUtil;
  }

  get random(): Random {
    return this._random;
  }
}

export default Utils;
