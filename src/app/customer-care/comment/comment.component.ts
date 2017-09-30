/**
 * @auth TungBD, ManhNV
 * @description comment and chat detail
 */

import {Component, OnInit} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {CommentService} from '../../common/service/component-service/comment.service';
import {ProductsComments} from './model/product-comments.model';
import {ItemsComments} from './model/item-comments.model';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MerchantComments} from './model/merchant-comment.model';
import {Customer} from '../../common/model/customer.model';
import {CustomerService} from '../../common/service/common-service/customer.service';

// import * as _ from 'lodash';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public showmoreorder: number = 2;
  public showmorecomment: number = 4;
  public _showmoreproduct: number;
  public showUpdate: boolean = true
  public hidden: boolean = false;
  public count: any[] = new Array();
  public _isAction: boolean = false;
  public _isReply: boolean = false;

  // data card demo
  public cards: Array<any> = [
    {
      id: '1',
      image: 'https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      comments: [
        {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '19/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }
      ],
      orders: [
        {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          date: '17/06/2017',
          time: '17h30',
          address: 'CS1 145 Lê Đại Hành, Hà Nội',
          numberOfPerson: 5,
          phone: '0123456789'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          date: '17/06/2017',
          time: '17h30',
          address: 'CS1 145 Lê Đại Hành, Hà Nội',
          numberOfPerson: 5,
          phone: '0123456789'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          date: '17/06/2017',
          time: '17h30',
          address: 'CS1 145 Lê Đại Hành, Hà Nội',
          numberOfPerson: 5,
          phone: '0123456789'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          date: '17/06/2017',
          time: '17h30',
          address: 'CS1 145 Lê Đại Hành, Hà Nội',
          numberOfPerson: 5,
          phone: '0123456789'
        }
      ]
    }
  ];
  // data demo products
  public products: Array<any> = [
    {
      id: '1',
      name: 'Lẩu thái',
      price: 2000000,
      image: 'https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      comments: [
        {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '19/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }
      ]
    }, {
      id: '2',
      name: 'Lẩu thái',
      price: 2000000,
      image: 'https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      comments: [
        {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '12/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }
      ]
    }
  ];
  public voucher: Array<any> = [
    {
      id: '1',
      name: 'Giảm giá 50% combo Lẩu thái',
      dateStart: '20/8/2017 19:05',
      dateEnd: '30/8/2017 10:05',
      image: 'https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      comments: [
        {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '19/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }
      ]
    }, {
      id: '2',
      name: 'Giảm giá 50% combo Lẩu thái',
      dateStart: '20/8/2017 19:05',
      dateEnd: '30/8/2017 10:05',
      image: 'https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      comments: [
        {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '12/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }, {
          avatar: 'http://imgur.com/5ZEgPYm.png',
          name: 'Nhật Linh',
          comment: 'Chủ nhật vừa rồi mình vừa ăn ở đây, đồ ăn ngon , nhân viên phục vụ rất nhiệt tình.',
          date: '18/08/2017 8:08'
        }
      ]
    }
  ];

  // ------ common variable ---------------------------------------------
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 1,
    timeout: 5000,
    animationClass: 'flyRight'
  });
  public customerInfo: Customer = null;
  public cardComments: MerchantComments = null;
  public productsComments: ProductsComments = null;
  public itemsComments: ItemsComments = null;

  // ------- variable filter --------------------------------------------
  public dataFilterCard = {
    page: 1,
    per_page: 5
  };
  public dataFilterProducts = {
    page: 1,
    per_page: 5
  };
  public dataFilterItems = {
    page: 1,
    per_page: 5
  };

  constructor(private _toasterService: ToasterService,
              private _router: Router,
              private _customerService: CustomerService,
              private _commentService: CommentService) {
  }

  ngOnInit() {
    this.filterCardComments({page: -1});
    this.filterProductsComments({page: -1});
    this.filterItemsComments({page: -1});
  }

  // ===================== FUNCTION AND VARIABLE COMMON SECTION ========================================
  /**
   * @method changeStatusCommentForProduct
   * @description change status comment is hide | unhide
   * @summary if update success => change state in element local (todo pending integrated socket)
   * @param {number} status
   * @param {string} idComment
   * @param {string} idTypeComment - id is idProductComments or idItemComments
   * @param {number} type | type is 1: card (merchant-comment), 2: product, 3: voucher/promotion/foot-traffic
   */
  public changeStatusComment(status: number, idComment: string, idTypeComment: string, type: number) {
    status = status === 1 ? 2 : 1;
    this._commentService.changeStatusComment(status, idComment)
      .subscribe(() => {
        // update state element dom product-comment
        let typeCommentSelect: any;
        if (type === 1) {
          typeCommentSelect = this.cardComments.data;
        } else if (type === 2) {
          typeCommentSelect = this.productsComments.products
            .find(productComments => productComments.id === idTypeComment);
        } else {
          typeCommentSelect = this.itemsComments.items
            .find(itemComments => itemComments.id === idTypeComment);
        }
        // change status for dom element
        if (!!typeCommentSelect) {
          let commentChangeState = typeCommentSelect.comments.find(comment => comment.id === idComment);
          if (!!commentChangeState) {
            commentChangeState.status = status;
          }
        }
        // message
        this._toasterService.clear();
        this._toasterService.pop('success', null, 'Thay đổi trạng thái thành công');
      }, this.funcError);
  }

  /**
   * @method removeComment
   * @description remove item comment
   * @summary remove item for local dom element when execute api delete is success (todo confirm integrate socket)
   * @param {string} idComment
   * @param {string} idTypeComment - id is idProductComments or idItemComments
   * @param {number} type | type is 1: card (merchant-comment), 2: product, 3: voucher/promotion/foot-traffic
   */
  public removeComment(idComment: string, idTypeComment: string, type: number) {
    if (!confirm('Bạn có muốn xóa comment lựa chọn này không?'))
      return;
    this._commentService.deleteComment(idComment)
      .subscribe(data => {
        // select element dom type-comment (product | voucher/promotion/foot-traffic)
        let typeCommentSelect: any;
        if (type === 1) {
          typeCommentSelect = this.cardComments.data;
        } else if (type === 2) {
          typeCommentSelect = this.productsComments.products
            .find(productComments => productComments.id === idTypeComment);
        } else {
          typeCommentSelect = this.itemsComments.items
            .find(itemComments => itemComments.id === idTypeComment);
        }
        // delete element dom
        if (!!typeCommentSelect) {
          let commentHasRemove = typeCommentSelect.comments.find(comment => comment.id === idComment);
          if (!!commentHasRemove) {
            const index = typeCommentSelect.comments.indexOf(commentHasRemove);
            typeCommentSelect.comments.splice(index, 1);
          }
        }
        // message
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
      }, this.funcError);
  }

  /**
   * @method replyComment
   * @description reply new comment
   * @param {string} idComment
   * @param {string} content
   * @param {string} idTypeComment
   * @param {number} type | type is 1: card (merchant-comment), 2: product, 3: voucher/promotion/foot-traffic
   */
  public replyComment(idComment: string, content: string, idTypeComment: string, type: number) {
    if (content === '') {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Nội dung tin nhắn không được phép để trống!');
      return;
    }
    this._commentService.replyComment(idComment, content, [])
      .subscribe(data => {
        // select element dom type-comment (product | voucher/promotion/foot-traffic)
        let typeCommentSelect: any;
        if (type === 1) {
          typeCommentSelect = this.cardComments.data;
          // hide textarea reply card
          this.stateReplyCard = '';
        } else if (type === 2) {
          typeCommentSelect = this.productsComments.products
            .find(productComments => productComments.id === idTypeComment);
          // hide textarea reply product
          this.stateReplyProduct = '';
        } else {
          typeCommentSelect = this.itemsComments.items
            .find(itemComments => itemComments.id === idTypeComment);
          // hide textarea reply promotion/ voucher/ foot-traffic
          this.stateReplyItem = '';
        }
        // push new comment in list comment current reply
        typeCommentSelect.comments.unshift(data);
        // show message
        this._toasterService.clear();
        this._toasterService.pop('success', null, 'Gửi tin nhắn thành công');
      }, this.funcError);
  }

  // ===================== FUNCTION AND VARIABLE CARD SECTION ============================================
  /**
   * @method filterCardComments
   * @description get list card comments
   * @param dataFilter
   */
  public filterCardComments(dataFilter: any = this.dataFilterCard) {
    this._commentService.getMerchantComments(dataFilter)
      .subscribe(data => {
        this.cardComments = data;
      }, this.funcError);
  }

  public genderTemp = '';
  public stateReplyCard: string = '';

  /**
   * @method showInfoCustomer
   * @description get customer info when click customer is owner (type = 1)
   * @param {string} typeOwner
   * @param {string} idOwner
   */
  public showInfoCustomer(typeOwner: number, idOwner: string) {
    if (typeOwner === 2) return;
    this._customerService.getCustomerSummary(idOwner)
      .subscribe(data => {
        this.customerInfo = data;
        // load birthday
        let birthDayCustom = this.customerInfo.customer.profile.birthday;
        if (this.customerInfo.customer.profile.birthday !== '')
          this.customerInfo.customer.profile.birthday =
            `${birthDayCustom.slice(6, 8)}/${birthDayCustom.slice(4, 6)}/${birthDayCustom.slice(0, 4)}`;
        // load gender
        let gender = this.customerInfo.customer.profile.gender;
        this.genderTemp = gender === 1 ? 'Không xác định' : (gender === 2 ? 'Nam' : 'Nữ');
      }, this.funcError);
  }

  public showRelyForCardComment(idComment: string) {
    this.stateReplyCard = this.stateReplyCard === idComment ? '' : idComment;
  }

  // ===================== FUNCTION AND VARIABLE PRODUCTION SECTION ========================================
  public stateReplyProduct: string = '';

  /**
   * @method filterProductsComments
   * @description filter list product-comments
   * @param dataFilter
   */
  public filterProductsComments(dataFilter: any = this.dataFilterProducts) {
    this._commentService.getProductsComments(dataFilter)
      .subscribe(data => {
        this.productsComments = data;
        // push default number data
        this.productsComments.products.map(productComments => productComments.numberCommentShow = 2);
      }, this.funcError);
  }

  /**
   * @method loadMoreProductComment
   * @description load all comment in product comment select
   * @param {string} idProductComment
   */
  public loadMoreProductComment(idProductComment: string) {
    this._commentService.getProductComments({page: -1}, idProductComment)
      .subscribe(data => {
        let productCommentsLoadMore = this.productsComments.products
          .find(productComments => productComments.id === idProductComment);
        // set data load more in productComments
        productCommentsLoadMore.numberCommentShow = data.length;
        productCommentsLoadMore.comments = data;
      }, this.funcError);
  }

  /**
   * @method showReplyForProductComment
   * @description show item choice is reply comment for section product-comment
   * @param {string} idComment
   */
  public showReplyForProductComment(idComment: string) {
    this.stateReplyProduct = this.stateReplyProduct === idComment ? '' : idComment;
  }

  // ===================== FUNCTION AND VARIABLE VOUCHER/PROMOTION/FOOT-TRAFFIC SECTION ====================
  public stateReplyItem: string = '';

  /**
   * @method filterItemsComments
   * @description filter item list comment
   * @param dataFilter
   */
  public filterItemsComments(dataFilter: any = this.dataFilterItems) {
    this._commentService.getItemsComments(dataFilter)
      .subscribe(data => {
        this.itemsComments = data;
        // push default number data
        this.itemsComments.items.map(itemComments => itemComments.numberCommentShow = 2);
      }, this.funcError);
  }

  /**
   * @method loadMoreItemComment
   * @description load all comment in item comment select
   * @param {string} idItemComment
   */
  public loadMoreItemComment(idItemComment: string) {
    this._commentService.getItemComments({page: -1}, idItemComment)
      .subscribe(data => {
        let itemCommentsLoadMore = this.itemsComments.items
          .find(itemComments => itemComments.id === idItemComment);
        // set data load more in itemComments
        itemCommentsLoadMore.numberCommentShow = data.length;
        itemCommentsLoadMore.comments = data;
      }, this.funcError);
  }

  /**
   * @method showReplyForItemComment
   * @description show item choice is reply comment for section item-comment
   * @param {string} idComment
   */
  public showReplyForItemComment(idComment: string) {
    this.stateReplyItem = this.stateReplyItem === idComment ? '' : idComment;
  }

  // Function ??? =======================================
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  showUpdateOrder() {
    this.showUpdate = !this.showUpdate;
  }

  closeAllCardComment(): void {
    for (let i = 0; i < this.cards.length; i++) {
      this.count = this.cards[i].comments;
      this.count.forEach((c) => {
        c.isAction = false;
        c.isReply = false;
      })
    }

  }

  showAction(c) {
    if (!c.isAction) {
      this.closeAllCardComment();
    }
    c.isAction = !c.isAction;
  }

  public showReply(c) {
    if (!c.isReply) {
      this.closeAllCardComment();
    }
    c.isReply = !c.isReply;
  }


  showOrderForm() {
    this.hidden = this.hidden !== true;
  }

  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          return this._router['navigate'](['login']);
        });
    }
  };
}
