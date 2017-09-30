import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'mo-config-box',
  templateUrl: './config-box.component.html',
  styleUrls: ['./config-box.component.scss']
})
export class ConfigBoxComponent implements OnInit {
  @Input("data") data: any;
  constructor() { }
  isEditting: boolean = false;
  ngOnInit() {
  }
  edit() {
    this.isEditting = true;
  }
  save() {
    this.isEditting = false;
  }
  cancel() {
    this.isEditting = false;
  }
}
