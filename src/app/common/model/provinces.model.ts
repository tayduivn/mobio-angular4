/**
 * @class Provinces
 * @author ManhNV
 * @description Provinces model
 */

export class DomainLang {
  en: string;
  vi: string;
}

export class ProvincesCity {
  code: string;
  name: string
}

export class Provinces {
  code: string;
  name: DomainLang;
  provinces: [ProvincesCity]
}
