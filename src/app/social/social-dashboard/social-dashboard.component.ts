import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-social-dashboard',
  templateUrl: './social-dashboard.component.html',
  styleUrls: ['./social-dashboard.component.scss']
})
export class SocialDashboardComponent implements OnInit {
  public hidden: boolean = false;
  public all: boolean = false;
  public face: boolean = false;
  public ins: boolean = false;
  public zalo: boolean = false;
  public google: boolean = false;
  public youtube: boolean = false;
  public hiddensocial: boolean = false;
  public comment: any[] = new Array();
  public actioncomment: any[] = new Array();
  public commentreply: any[] = new Array();
  public actionpage: any[] = new Array();
  public reply: any[] = new Array();
  public show: number = 5;
  public only: any[] = new Array();
  public onlymes: any[] = new Array();
  public showinfo: boolean = true;
  public post: boolean = true;
  showPost() {
    this.post ? this.post = false : this.post = true;
  }
  showInfo() {
    this.showinfo ? this.showinfo = false : this.showinfo = true;
  }
  actionIns() {
    this.ins = true;
    this.face = false;
    this.all = true;
    this.zalo = false;
  }
  actionZalo() {
    this.zalo = true;
    this.face = false;
    this.ins = false;
    this.all = true;
  }
  actionFace() {
    this.ins = false;
    this.zalo = false;
    this.face = true;
    this.all = true;
  }
  actionAll() {
    this.all = false;
    this.face = false;
    this.zalo = false;
    this.ins = false;
  }
  showAction(event: any, id: number) {
    this.actionpage[id] ? this.actionpage[id] = false : this.actionpage[id] = true;
  }
  showPageSocial(event: any) {
    !this.hiddensocial ? this.hiddensocial = true : this.hiddensocial = false;
  }
  showRely(event: any, id: number) {
    this.reply[id] ? this.reply[id] = false : this.reply[id] = true;
  }
  showContent(event: any) {
    !this.hidden ? this.hidden = true : this.hidden = false;
  }
  showActionComment(event: any, id: number) {
    this.actioncomment[id] ? this.actioncomment[id] = false : this.actioncomment[id] = true;
  }
  showComment(event: any, id: number) {
    this.comment[id] ? this.comment[id] = false : this.comment[id] = true;
  }
  showReplyComment(event: any, id: number) {
    this.commentreply[id] ? this.commentreply[id] = false : this.commentreply[id] = true;
  }
  showOnly(event: any, id: number) {
    this.only[id] ? this.only[id] = false : this.only[id] = true;
  }
  showOnlyMes(event: any, id: number) {
    this.onlymes[id] ? this.onlymes[id] = false : this.onlymes[id] = true;
  }
  constructor() { }

  ngOnInit() {
  }
  public facebook = [{
    posts: [
      {
        id: '1',
        pageName: 'Cocasuki Việt Nam',
        avatar: 'https://imgur.com/AeqvEKN.png',
        time: '10/08/2017 10:28',
        content: 'Nhớ nha! Hiệu quả lắm đó các bạn ạ. Tag ngay đối tượng ấy vào ngay nào !!!',
        image: 'https://imgur.com/bbXmG0F.png',
        totalComment: 330,
        totalLike: 200,
        noReply: 10,
        comments: [
          {
            id: '1',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '2',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '3',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '4',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '5',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '6',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '7',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '8',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }]
      }
    ],
    messenger: [{
      id: '1',
      name: 'Mèo Pen',
      avatar: 'https://imgur.com/TlflmpH.png',
      content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
      time: '10/08/2017 08:30',
    }, {
      id: '2',
      name: 'Mèo Pen',
      avatar: 'https://imgur.com/TlflmpH.png',
      content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
      time: '10/08/2017 08:30',
    }, {
      id: '3',
      name: 'Mèo Pen',
      avatar: 'https://imgur.com/TlflmpH.png',
      content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
      time: '10/08/2017 08:30',
    }]
  }]
  public instargram = [{
    posts: [
      {
        id: '1',
        pageName: 'Cocasuki Việt Nam',
        avatar: 'https://imgur.com/AeqvEKN.png',
        time: '10/08/2017 10:28',
        content: 'Nhớ nha! Hiệu quả lắm đó các bạn ạ. Tag ngay đối tượng ấy vào ngay nào !!!',
        image: 'https://imgur.com/bbXmG0F.png',
        totalComment: 330,
        totalLike: 200,
        noReply: 10,
        comments: [
          {
            id: '1',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '2',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '3',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '4',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '5',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '6',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '7',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }, {
            id: '8',
            name: 'Mèo Pen',
            avatar: 'https://imgur.com/TlflmpH.png',
            content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
            time: '10/08/2017 08:30',
            totalReply: 1,
            reply: [
              {
                id: '1',
                name: 'Cocasuki Việt Nam',
                content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
                time: '10/08/2017 08:30'
              }
            ]
          }]
      }
    ],
    messenger: [{
      id: '1',
      name: 'Mèo Pen',
      avatar: 'https://imgur.com/TlflmpH.png',
      content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
      time: '10/08/2017 08:30',
    }, {
      id: '2',
      name: 'Mèo Pen',
      avatar: 'https://imgur.com/TlflmpH.png',
      content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
      time: '10/08/2017 08:30',
    }, {
      id: '3',
      name: 'Mèo Pen',
      avatar: 'https://imgur.com/TlflmpH.png',
      content: 'Có chương trình giảm giá khi đi nhóm đông người không ad ơi ? :D :D :D',
      time: '10/08/2017 08:30',
    }]
  }]

}
