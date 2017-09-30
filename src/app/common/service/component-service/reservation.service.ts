/**
 * @author ManhNV
 * @class Booking
 * @alias Reservation
 * @description
 * @summary not cast object because current key is lan= english
 */

import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {ResponseCustom} from '../../model/response-custom.model';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../common-service/util.service';
import {Reservation, Reservations} from '../../../customer-care/reservation/reservation.model';

@Injectable()
export class ReservationService {

  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}/bookings`;
  }

  /**
   * @method getReservation
   * @description get list reservation
   * @summary using reservation component
   * @param dataFilter
   * @returns {Observable<Reservations>}
   */
  public getReservations(dataFilter: any): Observable<Reservations> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}${queryString}`);
  }

  /**
   * @method getReservationPending
   * @description get list reservation pending
   * @summary using comment component
   * @param dataFilter
   * @returns {Observable<Reservations>}
   */
  public getReservationsPending(dataFilter: any): Observable<Reservations> {
    let queryString = UtilService.encodeParams(dataFilter);
    return this._apiRequest.get(`${this.basePath}/pending${queryString}`);
  }

  /**
   * @method updateReservation
   * @description update detail reservation
   * @param data
   * @param {string} idReservation
   * @returns {Observable<ResponseCustom>}
   */
  public updateReservation(data: any, idReservation: string): Observable<ResponseCustom> {
    return this._apiRequest.patch(`${this.basePath}/${idReservation}`, data);
  }

  /**
   * @method acceptReservation
   * @description accept reservation
   * @param {string} idReservation
   * @returns {Observable<ResponseCustom>}
   */
  public acceptReservation(idReservation: string): Observable<ResponseCustom> {
    return this._apiRequest.post(`${this.basePath}/${idReservation}/actions/accept`, {});
  }

  /**
   * @method rejectReservation
   * @description cacel reservation
   * @param {string} idReservation
   * @returns {Observable<ResponseCustom>}
   */
  public rejectReservation(idReservation: string): Observable<ResponseCustom> {
    return this._apiRequest.post(`${this.basePath}/${idReservation}/actions/cancel`, {});
  }
}
