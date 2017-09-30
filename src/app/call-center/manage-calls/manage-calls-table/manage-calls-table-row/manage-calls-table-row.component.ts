import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { PhoneService } from "../../../../common/service/common-service/phone.service";

@Component({
  selector: 'mo-manage-calls-table-row',
  templateUrl: './manage-calls-table-row.component.html',
  styleUrls: ['./manage-calls-table-row.component.scss']
})
export class ManageCallsTableRowComponent implements OnInit {
  @Input("data") item:any;
  isEdittingNote: boolean = false;
  @Output() eventAudio:EventEmitter<object> = new EventEmitter<object>();
  constructor(
    private phoneService: PhoneService
  ) { }

  ngOnInit() {
  }
  editNote(id){
    this.isEdittingNote = true;
  }
  call(number){
    this.phoneService.phoneSubject.next(number);
  }
  cancelEditNote(){
    this.isEdittingNote = false;    
  }

  saveEditNote(){
    this.isEdittingNote = false;    
  }
  play(){
    let obj = {
      phone: this.item.phone,
      source: this.item.source,
      time: this.item.time
    }
    this.eventAudio.emit(obj);
  }
}
