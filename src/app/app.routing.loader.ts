/**
 * @author ManhNV
 * @description config lazy-load module
 * @link https://coryrylan.com/blog/custom-preloading-and-lazy-loading-strategies-with-angular
 */

import {PreloadingStrategy, Route} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class AppCustomPreload implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : Observable.of(null);
  }
}
