/**
 * @class Comment
 * @description comment model detail
 */

export default class Comment {
  id?: string;
  owner?: {
    id?: string;
    name?: string;
    avatar?: string;
    type?: string;
    email?: string;
  };
  content?: string;
  quote?: {
    comment_id?: string;
    name?: string;
    email?: string;
    content?: string;
  };
  posted_time?: string;
  status?: number;
  is_replied?: number;
  images?: string[];
  contentReply: string = '';
}
