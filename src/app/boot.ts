import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import 'rxjs/Rx';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);