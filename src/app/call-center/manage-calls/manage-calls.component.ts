import { Component, OnInit } from "@angular/core";

@Component({
  selector: "mo-call-center-manage-calls",
  templateUrl: "./manage-calls.component.html",
  styleUrls: ["./manage-calls.component.scss"]
})
export class CallCenterManageCallsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  dataTest = {
    paging: {
      page: 1,
      total_page: 5,
      per_page: 5,
      total_count: 25
    },
    data: [
      {
        id: 1,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        id: 2,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"        
      },
      {
        id: 3,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"        
      },
      {
        id: 4,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"        
      },
      {
        id: 5,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"        
      },
      {
        id: 6,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"        
      },
      {
        id: 7,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"        
      },
      {
        id: 8,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        icon: "../../../../assets/img/call-center/call-in.svg",
        card: "Thẻ vàng",
        phone: "0123456789",
        time: "09:10:34 12/12/2017",
        timeWaiting: "00:05",
        duration: "01:30",
        employee: "abcdef@gmail.com",
        note: "Khách hàng hài lòng về chất lượng dịch vụ",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"        
      }
    ]
  };
}
