/**
 * @class ResponseCustom
 * @author ManhNV
 * @description ResponseCustom model
 */

export class ResponseCustom {
  D?: string; // message (success || error)
  C?: string; // status error
  [key: string]: any;
  status?: number;
}
