import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UnderestimateService } from "../../../common/service/component-service/underestimate.service";
import { UnderestimateRewardModel } from "./underestimate-reward.model";
import { UnderestimateReasonModel } from "./underestimate-reason.model";
import { UnderestimateNotifyModel } from "./underestimate-notify.model";
import { ToasterService } from "angular2-toaster";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Moment } from "moment";
import { AccountManagementService } from "../../../common/service/component-service/account-management.service";

@Component({
  selector: "app-underestimate",
  templateUrl: "./underestimate.component.html",
  styleUrls: ["./underestimate.component.scss"]
})
export class UnderestimateComponent implements OnInit {
  underestimateReward: UnderestimateRewardModel = { points: 0 };
  underestimateReason: UnderestimateReasonModel = { threshold: 0, reasons: [] };
  underestimateNotify: UnderestimateNotifyModel = {
    emails: { type: 1, values: "" },
    sms: { time: "", values: "" },
    push_notification: { time: "", values: "" }
  };
  // reason input
  reason: string = "";
  // model time picker
  underestimateSmsStartedTime: Date = new Date();
  underestimateSmsFinishedTime: Date = new Date();
  underestimatePushStartedTime: Date = new Date();
  underestimatePushFinishedTime: Date = new Date();

  // save original value
  originalUnderestimateReward: UnderestimateRewardModel = { points: 0 };
  originalUnderestimateReason: UnderestimateReasonModel = {
    threshold: 0,
    reasons: []
  };
  originalReasons = [];
  originalUnderestimateNotify: UnderestimateNotifyModel = {
    emails: { type: 1, values: "" },
    sms: { time: "", values: "" },
    push_notification: { time: "", values: "" }
  };
  originalUnderestimateSmsStartedTime: Date = new Date();
  originalUnderestimateSmsFinishedTime: Date = new Date();
  originalUnderestimatePushStartedTime: Date = new Date();
  originalUnderestimatePushFinishedTime: Date = new Date();

  // config time picker
  optionsLeft = {
    format: "HH:mm",
    widgetPositioning: {
      horizontal: "left",
      vertical: "top"
    }
  };
  optionsRight = {
    format: "HH:mm",
    widgetPositioning: {
      horizontal: "right",
      vertical: "bottom"
    }
  };

  // multi select setting
  dropdownSettings = {
    singleSelection: false,
    text: "Chọn tài khoản",
    selectAllText: "Chọn tất cả",
    unSelectAllText: "Bỏ chọn tất cả",
    enableSearchFilter: true
  };
  // data multi select
  dropdownList = [];
  selectedItems = [];

  _stateEditScore: boolean = false;
  _stateEditReason: boolean = false;
  _stateEditNotification: boolean = false;
  _stateCreateReason: boolean = false;
  @ViewChild("divAddReason") divAddReason: ElementRef;
  constructor(
    private _underestimateService: UnderestimateService,
    private _toasterService: ToasterService,
    private _router: Router,
    private _accountManagementService: AccountManagementService
  ) {}

  ngOnInit() {
    this._accountManagementService
      .getAccountManagement({ page: -1 })
      .subscribe(data => {
        data.staffs.forEach((staff, index) => {
          this.dropdownList.push({ id: index, itemName: staff["TenTruyCap"] });
        });
      }, this.funcError);
    this._underestimateService.getRewardPoint().subscribe(
      data => {
        this.underestimateReward = UnderestimateService.toUnderestimateReward(
          data.config.underestimate
        );
        this.originalUnderestimateReward = Object.assign(
          {},
          this.underestimateReward
        );
      },
      err => console.log(err)
    );
    this._underestimateService.getNotify().subscribe(
      data => {
        this.underestimateNotify = UnderestimateService.toUnderestimateNotify(
          data.config.underestimate
        );
        this.originalUnderestimateNotify = Object.assign(
          {},
          this.underestimateNotify
        );
        // split time string '08:00;18:00' to start date and finish date
        let timeSmsSplit: string[] = this.underestimateNotify.sms.time.split(
          ";"
        );
        let timePushSplit: string[] = this.underestimateNotify.push_notification.time.split(
          ";"
        );
        if (timeSmsSplit[0]) {
          this.underestimateSmsStartedTime = this.createDateFromTime(
            timeSmsSplit[0]
          );
          this.originalUnderestimateSmsStartedTime = new Date(
            this.underestimateSmsStartedTime
          );
        }
        if (timeSmsSplit[1]) {
          this.underestimateSmsFinishedTime = this.createDateFromTime(
            timeSmsSplit[1]
          );
          this.originalUnderestimateSmsFinishedTime = new Date(
            this.underestimateSmsFinishedTime
          );
        }
        if (timePushSplit[0]) {
          this.underestimatePushStartedTime = this.createDateFromTime(
            timePushSplit[0]
          );
          this.originalUnderestimatePushStartedTime = new Date(
            this.underestimatePushStartedTime
          );
        }
        if (timePushSplit[1]) {
          this.underestimatePushFinishedTime = this.createDateFromTime(
            timePushSplit[1]
          );
          this.originalUnderestimatePushFinishedTime = new Date(
            this.underestimatePushFinishedTime
          );
        }
        this.underestimateNotify.push_notification.values
          .split(";")
          .forEach((item, index) => {
            if (item.trim().length > 0)
              this.selectedItems.push({ id: index, itemName: item });
          });
      },
      err => console.log(err)
    );
    this._underestimateService.getThresholdAndReason().subscribe(
      data => {
        this.underestimateReason = UnderestimateService.toUnderestimateReason(
          data.config.underestimate
        );
        this.originalUnderestimateReason = Object.assign(
          {},
          this.underestimateReason
        );
        this.originalReasons = Object.assign(
          [],
          this.originalUnderestimateReason.reasons
        );
      },
      err => console.log(err)
    );
  }

  // ==================================       FUNCTION DATE TIME      ===========================================
  createDateFromTime(time: string): Date {
    console.log(time);
    let now: Date = new Date();
    let month =
      Number(now.getMonth() + 1) < 9
        ? String("0" + now.getMonth())
        : now.getMonth();
    let date =
      Number(now.getDate() + 1) < 9
        ? String("0" + now.getDate())
        : now.getDate();
    let dateString =
      now.getFullYear() +
      "-" +
      ("0" + month).slice(-2) +
      "-" +
      date +
      "T" +
      time +
      ":00+07:00";
    console.log(dateString);
    return new Date(dateString);
  }

  dateToTimeString(date: Moment): string {
    let hour =
      Number(date.hours() + 1) < 9 ? String("0" + date.hours()) : date.hours();
    let minute =
      Number(date.minutes() + 1) < 9
        ? String("0" + date.minutes())
        : date.minutes();
    return hour + ":" + minute;
  }

  // ==================================     ADD UNDERESTIMATE REASON  =========================================
  addReasonToList(event: any, newReason: string) {
    if (event.keyCode === 13) {
      if (!newReason.trim()) return;
      if (!this.underestimateReason.reasons) {
        this.underestimateReason.reasons = [];
      }
      this.underestimateReason.reasons.push(newReason);
      this._stateCreateReason = false;
      this.reason = "";
    }
  }

  addNewReason() {
    this._stateCreateReason = true;
  }

  // =================================    FUNCTION EDIT, SAVE         ===========================================
  onClickEditRewardPoint(event: any) {
    this._stateEditScore = true;
  }

  onClickSubmitRewardPoint(event: any) {
    this._stateEditScore = false;
    this._underestimateService
      .setRewardPoint(this.underestimateReward)
      .subscribe(data => {
        this.originalUnderestimateReward = Object.assign(
          {},
          this.underestimateReward
        );
        this._toasterService.pop("success", "", data["D"]);
      }, this.funcError);
  }

  onClickCancelRewardPoint(event: any) {
    this._stateEditScore = false;
    this.underestimateReward = Object.assign(
      {},
      this.originalUnderestimateReward
    );
  }

  onClickEditReason(event: any) {
    this._stateEditReason = true;
  }

  onClickSubmitReason(event: any) {
    this._stateEditReason = false;
    this._underestimateService
      .setThresholdAndReason(this.underestimateReason)
      .subscribe(data => {
        this.originalUnderestimateReason = Object.assign(
          {},
          this.underestimateReason
        );
        this.originalReasons = Object.assign(
          [],
          this.originalUnderestimateReason.reasons
        );
        this._toasterService.pop("success", "", data["D"]);
      }, this.funcError);
  }

  onClickCancelReason(event: any) {
    this._stateEditReason = false;
    this.underestimateReason = Object.assign(
      {},
      this.originalUnderestimateReason
    );
    this.underestimateReason.reasons = Object.assign([], this.originalReasons);
  }

  onClickEditNotification(event: any) {
    this._stateEditNotification = true;
  }
  getMinutesOfTime(m: Moment) {
    let date = m.toDate();
    return date.getMinutes() + date.getHours() * 60;
  }
  onClickSubmitNotification(event: any) {
    let smsStartedTime = moment(this.underestimateSmsStartedTime, "HH:mm a");
    let smsFinishedTime = moment(this.underestimateSmsFinishedTime, "HH:mm a");
    let pushStartedTime = moment(this.underestimatePushStartedTime, "HH:mm a");
    let pushFinishedTime = moment(
      this.underestimatePushFinishedTime,
      "HH:mm a"
    );
    if (
      this.getMinutesOfTime(smsStartedTime) >
      this.getMinutesOfTime(smsFinishedTime)
    ) {
      return this._toasterService.pop(
        "warning",
        "",
        "Thời gian gửi SMS không hợp lệ, thời điểm bắt đầu muộn hơn thời điểm kết thúc"
      );
    }
    if (
      this.getMinutesOfTime(pushStartedTime) >
      this.getMinutesOfTime(pushFinishedTime)
    ) {
      return this._toasterService.pop(
        "warning",
        "",
        "Thời gian nhận thông báo không hợp lệ, thời điểm bắt đầu muộn hơn thời điểm kết thúc"
      );
    }
    this._stateEditNotification = false;
    this.underestimateNotify.sms.time =
      this.dateToTimeString(smsStartedTime) +
      ";" +
      this.dateToTimeString(smsFinishedTime);
    this.underestimateNotify.push_notification.time =
      this.dateToTimeString(pushStartedTime) +
      ";" +
      this.dateToTimeString(pushFinishedTime);
    this._underestimateService
      .setNotify(this.underestimateNotify)
      .subscribe(data => {
        this.originalUnderestimateNotify = Object.assign(
          {},
          this.underestimateNotify
        );
        this.originalUnderestimateSmsStartedTime = new Date(
          this.underestimateSmsStartedTime
        );
        this.originalUnderestimateSmsFinishedTime = new Date(
          this.underestimateSmsFinishedTime
        );
        this.originalUnderestimatePushStartedTime = new Date(
          this.underestimatePushStartedTime
        );
        this.originalUnderestimatePushFinishedTime = new Date(
          this.underestimatePushFinishedTime
        );
        this._toasterService.pop("success", "", data["D"]);
      }, this.funcError);
  }

  onClickCancelNotification(event: any) {
    this._stateEditNotification = false;
    this.underestimateNotify = Object.assign(
      {},
      this.originalUnderestimateNotify
    );
    console.log(this.underestimateSmsStartedTime);
    console.log(this.originalUnderestimateSmsStartedTime);
    this.underestimateSmsStartedTime = new Date(
      this.originalUnderestimateSmsStartedTime
    );
    this.underestimateSmsFinishedTime = new Date(
      this.originalUnderestimateSmsFinishedTime
    );
    this.underestimatePushStartedTime = new Date(
      this.originalUnderestimatePushStartedTime
    );
    this.underestimatePushFinishedTime = new Date(
      this.originalUnderestimatePushFinishedTime
    );
  }

  setUnderestimateEmailType(endDay: boolean, customerReport: boolean) {
    this.underestimateNotify.emails.type = endDay ? 2 : 1;
    this.underestimateNotify.emails.type = customerReport ? 1 : 2;
  }

  deleteReason(reason: string) {
    this.underestimateReason.reasons.splice(
      this.underestimateReason.reasons.indexOf(reason),
      1
    );
  }

  // ========================== FUNCTION DROPDOWN ACCOUNT MANAGER ==============================
  onItemSelect(item: any) {
    this.underestimateNotify.push_notification.values += String(
      item.itemName + ";"
    );
  }

  OnItemDeSelect(item: any) {
    this.underestimateNotify.push_notification.values.replace(
      String(item.itemName + ";"),
      ""
    );
  }

  onSelectAll(items: any) {
    items.forEach(i => {
      if (!this.underestimateNotify.push_notification.values.includes(i)) {
        this.underestimateNotify.push_notification.values += String(
          i.itemName + ";"
        );
      }
    });
  }

  onDeSelectAll(items: any) {
    this.underestimateNotify.push_notification.values = "";
  }

  /**
   * @method funcError
   * @description execute error function
   * @param err
   */
  funcError = err => {
    this._toasterService.clear();
    this._toasterService.pop("error", null, err.D);
    if (err.status === 401) {
      Observable.timer(2000).subscribe(() => {
        this._router.navigate(["login"]);
      });
    }
  };
  checkValidScore(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
  }
}
