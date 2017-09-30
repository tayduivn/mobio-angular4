import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiRequestService } from '../common/service/common-service/api-request.service';
import { AuthenticateService } from "app/common/service/common-service/authenticate.service";
@Injectable()
export class DashboardService {
  private status: number = 1;
  private baseUrl: string = 'http://mbo.pingcom.vn/api/v1.0';
  private merchantId: string = this._authService.jwtDecode().merchantID;
  public basePath: string;
  constructor(private http: Http, private _apiRequest: ApiRequestService, private _authService: AuthenticateService) {
    this.basePath = `merchants/${this.merchantId}`;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${this._authService.getToken()}`);
    return headers;
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getMembershipStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/customers/cards/count?status=2`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getCurrentPointStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/point/count`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getNotVerifiedVoucherStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/customers/cards/count?status=1`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getVisibleProductStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/products/count?status=1`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getActivedPromotionStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/offers/count?offer_type=1&status=3`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getActivedVoucherPromotionStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/offers/count?offer_type=2&status=3`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getActivedFootTrafficVoucherPromotionStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/offers/count?offer_type=3&status=3`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getActivedGiftStatus() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/offers/count?offer_type=4&status=3`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getMembershipChart(): Observable<any> {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/customers/active`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getShoppingChart() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/customers/shopping`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getMobioChart() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/redeem`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getVoucherChart() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/vouchers`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getMinRateShops() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/ratings/stores`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getTopViewed() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/top?view_type=1&report_view=1`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getTopChanged() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/top?view_type=1&report_view=2`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

  getMerchantRating() {
    return this.http
      .get(
      `${this.baseUrl}/merchants/${this.merchantId}/insights/ratings`,
      {
        headers: this.getHeaders()
      }
      )
      .map(res => res.json())
  }

}
