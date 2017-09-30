/**
 * @class ItemComment
 * @description comment common for promotion-comment, voucher-comment and foot-traffic-comment
 * @version 1.0.0
 */

import Comment from './comment.model';
import {Paging} from '../../../common/model/paging';

export class ItemComments {
  paging: Paging;
  id?: string;
  title?: string;
  images?: string [];
  subtitle?: {
    type?: number;
    since?: string;
    until?: string;
  };
  comments?: Comment[];
  numberCommentShow?: number = 2; // custom comment show
}

export class ItemsComments {
  paging: Paging;
  common?: {
    no_replies_number?: number;
  };
  items?: ItemComments[];
}
