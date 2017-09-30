/**
 * @module UtilService
 * @author ManhNV
 * @description additional functions
 * @version
 */

export class UtilService {
  /**
   * @method encodeParams
   * @param params - object param need convert
   * @returns {String}
   */
  public static encodeParams(params: any): String {
    let res = '';
    for (let p in params) {
      res += `&${p}=${params[p]}`;
    }
    return '?' + res.substring(1);
  }

  /**
   * @method removeUnicodeViWhiteSpace
   * @description remove unicode + remove whitespace
   * @param str
   */
  public static removeUnicodeViWhiteSpace(str): string {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str.replace(/(\s)/g, '');
  }
}
