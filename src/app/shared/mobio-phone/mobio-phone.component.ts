import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { PhoneService } from "../../common/service/common-service/phone.service";

@Component({
  selector: "mo-phone",
  templateUrl: "./mobio-phone.component.html",
  styleUrls: ["./mobio-phone.component.scss"]
})
export class PhoneComponent {
  @Input("phoneToCall") phoneToCall;
  STATUS_CALL = ["not call", "calling out", "calling in", "talking"];
  isAcceptCall: boolean = true;
  isShowPhone: boolean = false;
  isMinimizePhone: boolean = false;
  isShowInfoReceiver: boolean = false;
  isNoting: boolean = false;
  phoneNumber: string = "";
  statusCall: string = this.STATUS_CALL[0];
  phoneKeyboard: Array<string> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "0",
    "#"
  ];
  acceptCharactor: Array<string> = [];
  constructor(private phoneService: PhoneService) {
    this.acceptCharactor = this.phoneKeyboard.concat(['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'End', 'Home']);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.phoneToCall.currentValue) {
      this.phoneNumber = this.phoneToCall;
      this.showPhone(true);
      this.checkPhoneNumber();
    }
  }
  changeStatus(isAccept): void {
    this.isAcceptCall = isAccept;
  }
  showPhone(isShow: boolean): void {
    this.isShowPhone = isShow;
    if (!this.isShowPhone) {
      this.minimizePhone(false);
      this.statusCall = this.STATUS_CALL[0];
      this.isNoting = false;
      this.isShowInfoReceiver = false;
      this.phoneNumber = "";
      this.onChangePhone();
    }
  }
  minimizePhone(isMinimize: boolean): void {
    this.isMinimizePhone = isMinimize;
  }
  filterChar(e?: KeyboardEvent): boolean {
    if (e && this.acceptCharactor.indexOf(e.key) === -1) {
      e.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  checkPhoneNumber(e?: KeyboardEvent): void {
    if (this.phoneNumber && this.phoneNumber.toString().length > 9) {
      this.isShowInfoReceiver = true;
    } else {
      this.isShowInfoReceiver = false;
    }
  }
  clearLastNumber(): void {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
    this.checkPhoneNumber();
    this.onChangePhone();
  }
  clearPhoneNumber(): void {
    this.phoneNumber = "";
    this.checkPhoneNumber();
    this.onChangePhone();
  }
  noteCall(isNoting): void {
    this.isNoting = isNoting;
  }
  cancelNote(): void {
    this.noteCall(false);
  }
  saveNote(): void {
    this.noteCall(false);
  }
  call(): void {
    if (!this.phoneNumber) return;
    this.statusCall = this.STATUS_CALL[1];
  }
  answer(): void {
    this.statusCall = this.STATUS_CALL[3];
    this.minimizePhone(false);
  }
  endCall(): void {
    this.statusCall = this.STATUS_CALL[0];
    this.minimizePhone(false);
    this.noteCall(false);
  }
  addNumber(number) {
    this.phoneNumber = this.phoneNumber + number;
    this.checkPhoneNumber();
    this.onChangePhone();
  }
  onChangePhone(e?: KeyboardEvent) {
    this.phoneService.onPhoneChangeSubject.next(this.phoneNumber);
  }
}
