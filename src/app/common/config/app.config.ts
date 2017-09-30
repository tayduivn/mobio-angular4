/**
 * @author ManhNV
 * @description config base application
 * @version 1.0.0
 */

import initConfig from '../init';

export class AppConfig {
  /**
   * @name lang
   * @description config language used
   */
  private lang: string;
  /**
   * @name pathDomain
   * @description config domain request api
   */
  private pathDomain: string;
  /**
   * @name versionApi
   * @description config version api using
   */
  private versionApi: string;

  constructor() {
    this.lang = initConfig.domainRequest.lang; // default language
    this.pathDomain = initConfig.domainRequest.pathDomain;
    this.versionApi = initConfig.domainRequest.versionApi;
  }

  public setLanguage(_lang: string) {
    this.lang = _lang;
  }

  public getLanguage() {
    return this.lang;
  }

  public setPathDomain(_pathDomain: string) {
    this.pathDomain = _pathDomain;
  }

  public getPathDomain(): string {
    return this.pathDomain;
  }

  /**
   * @method getHostBase
   * @description get host basic
   * @returns {string}
   */
  public getHostBase(): string {
    return `${this.pathDomain}/api/${this.versionApi}/`;
  }
}
