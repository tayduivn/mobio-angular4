import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PhoneService } from "../../../common/service/common-service/phone.service";
@Component({
  selector: "mo-table-top-call",
  templateUrl: "./table-top-call.component.html",
  styleUrls: ["./table-top-call.component.scss"]
})
export class TableTopCallComponent implements OnInit {
  @Input("data") data: any;
  @Output() eventAudio: EventEmitter<object> = new EventEmitter<object>();

  call(number) {
    this.phoneService.phoneSubject.next(number);
  }

  constructor(private phoneService: PhoneService) {}

  ngOnInit() {}
  play(item) {
    let obj = {
      phone: item.phone,
      source: item.source,
      time: item.time
    };
    this.eventAudio.emit(obj);
  }
}
