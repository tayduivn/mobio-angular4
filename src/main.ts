import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  // config remove log when build production
  window.console.log = function () {
  };
  window.console.dir = function () {
  };
  window.console.error = function () {
  };
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
