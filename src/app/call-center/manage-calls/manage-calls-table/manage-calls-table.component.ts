import { Component, OnInit, Input } from "@angular/core";
import { Paging } from "app/common/model/paging";

@Component({
  selector: "mo-manage-calls-table",
  templateUrl: "./manage-calls-table.component.html",
  styleUrls: ["./manage-calls-table.component.scss"]
})
export class ManageCallsTableComponent implements OnInit {
  @Input("data") data: any;
  sourceAudio: object;
  paging: Paging;
  dataFilter = {
    ChuoiTimKiem: "",
    sort: "",
    order: "",
    page: 1, // default page select is 1
    per_page: 5 // default get 5 item
  };
  constructor() {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
  }
  /**
   * @method getCurrentPage
   * @description get current page selected
   * @param {number} _pageSelected
   */
  getCurrentPage(_pageSelected: number) {
    console.log(_pageSelected);
  }
  filter() {
    
  }
  eventAudio(e) {
    this.sourceAudio = e;
  }
  ngOnInit() {}
}
