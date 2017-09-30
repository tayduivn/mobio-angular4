/**
 * @module pager
 * @author ManhNV
 * @description custom paging data
 * @version 1.0.0
 */

import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import * as _ from 'lodash';
import {Pagination} from './pagination.model';
import {Paging} from '../../model/paging'; // paging is a default mobio project response

@Component({
  selector: 'pagination-mobio',
  templateUrl: './pagination.template.html',
  styles: [
      `ul[class='pagination'] li:hover {
      cursor: pointer !important;
    }

    fa {
      font-size: 14px !important;
    }`
  ]
})

export class PaginationDirectiveComponent implements OnChanges {
  public pager: Pagination = {};
  @Input() public paging: Paging = {};
  @Output() public onSelectPage = new EventEmitter<number>();

  constructor() {
    this.pager = this.getPager(this.paging.total_count, this.paging.page, this.paging.per_page, this.paging.max_page_item);
  }

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(this.paging);
    this.pager = this.getPager(this.paging.total_count, this.paging.page, this.paging.per_page, this.paging.max_page_item);
  }

  public getCurrentPage(currentPage: number) {
    this.paging.page = currentPage;
    this.pager = this.getPager(this.paging.total_count, this.paging.page, this.paging.per_page, this.paging.max_page_item);
    this.onSelectPage.emit(currentPage);
  }

  /**
   * @method getPager
   * @param {number} total_count - sum item
   * @param {number} page - current-page
   * @param {number} per_page -
   * @param {number} max_page_item
   * @returns {Pagination}
   */
  public getPager(total_count: number = 0, page: number = 1,
                  per_page: number = 5, max_page_item = 10): Pagination {
    // calculate total pages
    let totalPages = Math.ceil(total_count / per_page);

    let startPage: number, endPage: number;
    if (totalPages <= max_page_item) { // 5
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (page <= Math.floor(max_page_item / 2) + 1) {
        startPage = 1;
        endPage = max_page_item;
      } else if (page + Math.floor(max_page_item / 2) >= totalPages) {
        startPage = totalPages - max_page_item + 1; // 8 9 10 11 12                 13 14 15  13
        endPage = totalPages; // 14
      } else {
        startPage = page - Math.floor(max_page_item / 2);
        endPage = page + Math.floor(max_page_item / 2) - 1;
      }
    }

    // calculate start and end item indexes
    let startIndex = (page - 1) * per_page;
    let endIndex = Math.min(startIndex + per_page - 1, total_count - 1);

    // create an array of pages to ng-repeat in the pager control
    let rangerPage = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      // support input tranfer component
      total_count: total_count,
      page: page,
      per_page: per_page,
      total_page: totalPages,
      // support binding template
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: rangerPage
    };
  }
}
