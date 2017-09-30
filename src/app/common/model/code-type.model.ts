/**
 * @class CodeType
 * @author ManhNV
 * @description mixin model code-type
 */

class Title {
  vi: string;
  en: string;
}

export class CodeType {
  title: Title;
  value: number;
}

export class CodeTypes {
  codes: [CodeType]
}
