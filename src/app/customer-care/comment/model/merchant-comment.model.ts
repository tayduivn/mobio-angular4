/**
 * @class merchant-comment
 * @alias CardComment
 * @description defind model card comment
 * @version 1.0.0
 */

import Comment from './comment.model';
import { Paging } from '../../../common/model/paging';

export class MerchantComments {
  data?: {
    comments?: Comment[];
    common?: {
      no_replies_number?: number;
    };
  };
  paging?: Paging;
  C?: string;
}
