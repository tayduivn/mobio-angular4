/**
 * @author ManhNV
 * @method PagerModel
 * @description Pager config from paging
 */

export class Pagination {
  total_count?: number; // sum item
  page?: number; // current page
  per_page?: number; // size page
  total_page?: number;
  startPage?: number;
  endPage?: number;
  startIndex?: number;
  endIndex?: number;
  pages?: any;
}
