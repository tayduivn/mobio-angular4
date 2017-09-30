import Comment from './comment.model';
import {Paging} from '../../../common/model/paging';

export class ProductComments {
  paging: Paging;
  id?: string;
  title?: string;
  images?: string [];
  subtitle?: {
    type: number;
    data: number;
  };
  comments?: Comment[];
  numberCommentShow?: number = 2; // custom comment show
}

export class ProductsComments {
  paging: Paging;
  common?: {
    no_replies_number?: number;
  };
  products?: ProductComments[];
}
