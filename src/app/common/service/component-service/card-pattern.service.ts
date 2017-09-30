/**
 * @module shop-service
 * @author ManhNV
 * @description config shop service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {
  CardPattern, CardPatternConfig,
  CardPatterns
} from '../../../customer-care/content/card-pattern/card-pattern.model';
import {AuthenticateService} from '../common-service/authenticate.service';
import {UtilService} from '../common-service/util.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {CodeTypes} from '../../model/code-type.model';

@Injectable()
export class CardPatternService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  // ================== BASIC SERVICE CRUD ======================================================================
  /**
   * @type get
   * @method getCardPatterns
   * @description get list card pattern
   * @returns {Observable<Shop>}
   */
  public getCardPatterns(dataFilter: any): Observable<CardPatterns> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/templates/cards${queryString}`);
  }

  /**
   * @type post
   * @method createCardPattern
   * @description create new card pattern
   * @param {CardPattern} body
   * @param file
   * @returns {Observable<ResponseCustom>}
   */
  public createCardPattern(body: CardPattern, file: any): Observable<ResponseCustom> {
    let bodyData = {
      LoaiThe: body.cardName,
      TuSinhMa: body.selfGenerateCode,
      KieuHienThiMaNhanDangKhachHang: body.typeCardDisplay,
      DuyetKhachHangTuDong: body.tabbedBrowsing,
      TrangThai: body.state
    };

    return this._apiRequest.sendWithFile(`${this.basePath}/templates/cards`, 'post', bodyData, file);
  }

  public updateCardPattern(body: CardPattern, file: any = []): Observable<ResponseCustom> {
    let bodyData = {
      LoaiThe: body.cardName,
      TuSinhMa: body.selfGenerateCode,
      KieuHienThiMaNhanDangKhachHang: body.typeCardDisplay,
      DuyetKhachHangTuDong: body.tabbedBrowsing,
      TrangThai: body.state || 1 // todo remove
    };
    if (file.length === 0)
      return this._apiRequest.sendNotFile(`${this.basePath}/templates/cards/${body.idCardPattern}`,
        'patch', bodyData);
    return this._apiRequest.sendWithFile(`${this.basePath}/templates/cards/${body.idCardPattern}`,
      'patch', bodyData, file);
  }

  // ================== SUPPORT SERVICE ======================================================================
  /**
   * @type get
   * @method getCodeTypes
   * @description get list code-type
   * @returns {Observable<CodeTypes>}
   * @todo confirm switch codeType in new service
   */
  public getCodeTypes(): Observable<CodeTypes> {
    return this._apiRequest.get(`static/code_types.json`);
  }

  /**
   * @type get
   * @method getCardPatternDetail
   * @param _idCardPattern
   * @returns {Observable<Shop>}
   */
  public getCardPatternDetail(_idCardPattern: string): Observable<CardPattern> {
    return this._apiRequest.get(`${this.basePath}/templates/cards/${_idCardPattern}`);
  }

  /**
   * @method getCardPatternConfigDetail
   * @description get detail card config
   * @returns {Observable<CardPatternConfig>}
   */
  public getCardPatternConfigDetail(): Observable<CardPatternConfig> {
    return new Observable(observer => {
      this._apiRequest.get(`${this.basePath}/settings/templates/cards`)
        .subscribe(data => {
          return observer.next([data].map(CardPatternService.toCardPatternConfig)[0]);
        }, err => observer.error(err));
    })
  }

  /**
   * @method updateCardPatternConfig
   * @description update detail card config
   * @param {CardPatternConfig} cardPatternConfig
   * @returns {Observable<ResponseCustom>}
   */
  public updateCardPatternConfig(cardPatternConfig: CardPatternConfig): Observable<ResponseCustom> {
    let bodyMap = {
      card_condition: cardPatternConfig.setting.card_condition,
      change_card_level: cardPatternConfig.setting.change_card_level,
      cards: !cardPatternConfig.cards || !Array.isArray(cardPatternConfig.cards) || cardPatternConfig.cards.length === 0
        ? [] : cardPatternConfig.cards.map(function (cardItem) {
          return {
            TheMauNhaCungCapID: cardItem.idCardPattern,
            value: cardItem.value
          }
        })
    };
    return this._apiRequest.patch(`${this.basePath}/settings/templates/cards`, bodyMap);
  }

  /**
   * @type patch
   * @method changeStateShowShop
   * @description enable, disable multiple shop
   * @param body
   * @returns {Observable<ResponseCustom>}
   */
  public changeStateShowCardPattern(body: any): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}/templates/cards`, body, 1, {});
  }

  public static toCardPatternConfig(r: any): CardPatternConfig {
    const cardPatternConfig: CardPatternConfig = {
      setting: {
        card_condition: r['setting']['card_condition'],
        change_card_level: r['setting']['change_card_level'],
      },
      cards: !r['cards'] || !Array.isArray(r['cards']) || r['cards'].length === 0
        ? [] : r['cards'].map(function (rCards) {
          return {
            idCardPattern: rCards['TheMauNhaCungCapID'],
            cardName: rCards['LoaiThe'],
            value: rCards['value']
          }
        }),
    };
    console.log(cardPatternConfig);
    return cardPatternConfig;
  }

  /**
   * @method toCardPattern
   * @description mapping card-pattern model
   * @param r
   * @returns {toCardPattern}
   */
  public static toCardPattern(r: any): CardPattern {
    const cardPattern: CardPattern = {
      idCardPattern: r['TheMauNhaCungCapID'],
      cardName: r['LoaiThe'],
      selfGenerateCode: r['TuSinhMa'],
      typeCardDisplay: r['KieuHienThiMaNhanDangKhachHang'],
      tabbedBrowsing: r['DuyetKhachHangTuDong'],
      frontPhoto: r['LinkAnhMatTruoc'],
      backPhoto: r['LinkAnhMatSau'],
      state: r['TrangThai'],
    };
    console.log(cardPattern);
    return cardPattern;
  }
}
