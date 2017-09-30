import {Injectable} from '@angular/core';
import {ApiRequestService} from '../common-service/api-request.service';
import {AuthenticateService} from '../common-service/authenticate.service';
import {UnderestimateReasonModel} from '../../../customer-care/config/underestimate/underestimate-reason.model';
import {UnderestimateNotifyModel} from '../../../customer-care/config/underestimate/underestimate-notify.model';
import {UnderestimateRewardModel} from '../../../customer-care/config/underestimate/underestimate-reward.model';

@Injectable()
export class UnderestimateService {

  public basePath: string;

  constructor(private _apiRequest: ApiRequestService,
              private _authService: AuthenticateService) {
    this.basePath = `merchants/${this._authService.jwtDecode().merchantID}`;
  }

  getRewardPoint() {
    return this._apiRequest.get(`${this.basePath}/underestimate/config/reward`);
  }

  setRewardPoint(reward: UnderestimateRewardModel) {
    return this._apiRequest.post(`${this.basePath}/underestimate/config/reward`, reward);
  }

  getNotify() {
    return this._apiRequest.get(`${this.basePath}/underestimate/config/notify`);
  }

  setNotify(notify: UnderestimateNotifyModel) {
    return this._apiRequest.post(`${this.basePath}/underestimate/config/notify`, notify);
  }

  getThresholdAndReason() {
    return this._apiRequest.get(`${this.basePath}/underestimate/config/reason`);
  }

  setThresholdAndReason(reason: UnderestimateReasonModel) {
    return this._apiRequest.post(`${this.basePath}/underestimate/config/reason`, reason);
  }

  public static toUnderestimateNotify(r: any): UnderestimateNotifyModel {
    const underestimateNotify: UnderestimateNotifyModel = {
      emails: {
        values: r['emails']['values'],
        type: r['emails']['type']
      },
      sms: {
        values: r['sms']['values'],
        time: r['sms']['time']
      },
      push_notification: {
        values: r['push-notification']['values'],
        time: r['push-notification']['time']
      }
    };
    return underestimateNotify;
  }

  public static toUnderestimateReason(r: any): UnderestimateReasonModel {
    const underestimateReason: UnderestimateReasonModel = {
      threshold: r['threshold'],
      reasons: r['reasons']
    };
    return underestimateReason;
  }

  public static toUnderestimateReward(r: any): UnderestimateRewardModel {
    const underestimateReward: UnderestimateRewardModel = {
      points: r['reward']
    };
    return underestimateReward;
  }
}
