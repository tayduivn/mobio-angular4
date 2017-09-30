/**
 * @module customer-insights-service
 * @author ManhNV
 * @description config customer-insight service
 * @version 1.0.0
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../common-service/authenticate.service';
import {
  NumberCustomer, ReportCustomerInsight, ReportPipeAge, ReportPipeCardType, ReportPipeGender, ReportPipeOS,
  ReportRating
} from '../../../customer-insight/customer-insight.model';

@Injectable()
export class CustomerInsightsService {
  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  // ================== BASIC SERVICE CRUD ======================================================================
  // ---- sub report number customer -------
  /**
   * @type get
   * @method getNumberCurrentCustomer
   * @description sum member in system
   * @returns {Observable<Number>}
   */
  public getNumberCurrentCustomer(): Observable<NumberCustomer> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/number_customer`);
  }

  /**
   * @type get
   * @method getNumberCustomerInteractive
   * @returns {Observable<NumberCustomer>}
   */
  public getNumberCustomerInteractive(): Observable<NumberCustomer> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/number_interactive`);
  }

  /**
   * @type get
   * @method getNumberCustomerDeleteRatio
   * @returns {Observable<NumberCustomer>}
   */
  public getNumberCustomerDeleteRatio(): Observable<NumberCustomer> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/deleted_ratio`);
  }

  /**
   * @type get
   * @method getNumberNewCustomer
   * @returns {Observable<NumberCustomer>}
   */
  public getNumberNewCustomer(): Observable<NumberCustomer> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/number_new_customer`);
  }

  // ---- sub report circle chart -------
  /**
   * @method getPipeChartAgeRange
   * @returns {Observable<ReportPipeAge>}
   */
  public getPipeChartAgeRange(): Observable<ReportPipeAge> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/pie_chart/age`);
  }

  /**
   * @method getPipeCardType
   * @returns {Observable<ReportPipeCardType>}
   */
  public getPipeCardType(): Observable<ReportPipeCardType> {
    return Observable.create(observer => {
      this._apiRequest.get(`${this.basePath}/insights/customers/report/pie_chart/cards`)
        .subscribe(data => {
          return observer.next([data].map(CustomerInsightsService.toPipeChartCardType)[0]);
        }, error => observer.error(error));
    })
  }

  /**
   * @method getPipeChartGender
   * @returns {Observable<ReportPipeGender>}
   */
  public getPipeChartGender(): Observable<ReportPipeGender> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/pie_chart/gender`);
  }

  /**
   * @method getPipeChartOS
   * @returns {Observable<ReportPipeOS>}
   */
  public getPipeChartOS(): Observable<ReportPipeOS> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/pie_chart/operating_system`);
  }

  /**
   * @method getRatingReport
   * @description get rating report
   * @returns {Observable<ReportRating>}
   */
  public getRatingReport(): Observable<ReportRating> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/rating`);
  }

  /**
   * @method getReportCustomerInsight
   * @returns {Observable<ReportCustomerInsight>}
   */
  public getReportCustomerInsight(): Observable<ReportCustomerInsight> {
    return this._apiRequest.get(`${this.basePath}/insights/customers/report/line_chart`);
  }

  // cast object -------
  /**
   * @method toPipeChartCardType
   * @description cast to object card-type
   * @param r
   * @returns {}
   */
  public static toPipeChartCardType(r: any): ReportPipeCardType {
    const cardType: ReportPipeCardType = {
      C: r['C'],
      report: {
        data: r['report']['data'].map(rCard => {
          return {
            nameCard: rCard['LoaiThe'],
            idCardPattern: rCard['TheMauNhaCungCapID'],
            number: rCard['number']
          }
        })
      }
    };
    return cardType;
  }
}
