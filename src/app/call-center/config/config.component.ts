import { Component, OnInit } from "@angular/core";

@Component({
  selector: "mo-call-center-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"]
})
export class CallCenterConfigComponent implements OnInit {
  configList = [
    {
      phone: "19007777",
      color: "#ecec3f",
      exts: [{
        number: "101",
        employee: "abcdef@cocasuki",
        forward: "0123456789"
      }]
    },{
      phone: "19009181",
      color: "#69c2e6",
      exts: [{
        number: "101",
        employee: "abcdef@cocasuki",
        forward: "0123456789"
      },{
        number: "102",
        employee: "abcdef@cocasuki",
        forward: "0123456789"
      },{
        number: "103",
        employee: "abcdef@cocasuki",
        forward: "0123456789"
      },{
        number: "104",
        employee: "abcdef@cocasuki",
        forward: "0123456789"
      },{
        number: "105",
        employee: "abcdef@cocasuki",
        forward: "0123456789"
      }]
    }
  ];
  constructor() {}

  ngOnInit() {}
}
