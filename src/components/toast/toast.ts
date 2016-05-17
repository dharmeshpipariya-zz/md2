import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';

import {ToasterConfig} from './toaster-config';


@Injectable()
export class Md2Toast {
  addToast: Observable<Toast>;
  private _addToast: Observer<Toast>;

  clearToasts: Observable<IClearWrapper>;
  private _clearToasts: Observer<IClearWrapper>;

  constructor() {
    this.addToast = new Observable<Toast>(observer => this._addToast = observer).share();
    this.clearToasts = new Observable<IClearWrapper>(observer => this._clearToasts = observer).share();
  }

  pop(type: string | Toast, title?: string, body?: string): Toast {
    let toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;

    toast.toastId = Guid.newGuid();

    if (!this._addToast) {
      throw new Error("No Toaster Containers have been initialized to receive toasts.");
    }

    this._addToast.next(toast);
    return toast;
  }

  popAsync(type: string | Toast, title?: string, body?: string): Observable<Toast> {
    setTimeout(() => {
      this.pop(type, title, body);
    }, 0);

    return this.addToast;
  }

  clear(toastId?: string, toastContainerId?: number) {
    let clearWrapper: IClearWrapper = {
      toastId: toastId, toastContainerId: toastContainerId
    };

    this._clearToasts.next(clearWrapper)
  }
}

export interface IClearWrapper {
  toastId?: string;
  toastContainerId?: number;
}

// http://stackoverflow.com/questions/26501688/a-typescript-guid-class
class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}


export interface Toast {
  type: string;
  title?: string;
  body?: any;

  toastId?: string;
  toastContainerId?: number;
  onShowCallback?: OnActionCallback;
  onHideCallback?: OnActionCallback;
  data?: Object;

  timeout?: number;
  timeoutId?: number;
  clickHandler?: ClickHandler;
  showCloseButton?: boolean;
  closeHtml?: string;

  toasterConfig?: ToasterConfig
}

export interface ClickHandler {
  (toast: Toast, isCloseButton?: boolean): boolean
}

export interface OnActionCallback {
  (toast: Toast): void
}

//======================================================================================================================================================================
//function MdToastProvider($$interimElementProvider) {
//  // Differentiate promise resolves: hide timeout (value == true) and hide action clicks (value == ok).
//  var ACTION_RESOLVE = 'ok';

//  var activeToastContent;
//  var $mdToast = $$interimElementProvider('$mdToast')
//    .setDefaults({
//      methods: ['position', 'hideDelay', 'capsule', 'parent', 'position'],
//      options: toastDefaultOptions
//    })
//    .addPreset('simple', {
//      argOption: 'textContent',
//      methods: ['textContent', 'content', 'action', 'highlightAction', 'highlightClass', 'theme', 'parent'],
//      options: /* @ngInject */ function ($mdToast, $mdTheming) {
//        return {
//          template:
//          '<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">' +
//          '  <div class="md-toast-content">' +
//          '    <span flex class="md-toast-text" role="alert" aria-relevant="all" aria-atomic="true">' +
//          '      {{ toast.content }}' +
//          '    </span>' +
//          '    <md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()" ' +
//          '        ng-class="highlightClasses">' +
//          '      {{ toast.action }}' +
//          '    </md-button>' +
//          '  </div>' +
//          '</md-toast>',
//          controller: /* @ngInject */ function mdToastCtrl($scope) {
//            var self = this;

//            if (self.highlightAction) {
//              $scope.highlightClasses = [
//                'md-highlight',
//                self.highlightClass
//              ]
//            }

//            $scope.$watch(function () { return activeToastContent; }, function () {
//              self.content = activeToastContent;
//            });

//            this.resolve = function () {
//              $mdToast.hide(ACTION_RESOLVE);
//            };
//          },
//          theme: $mdTheming.defaultTheme(),
//          controllerAs: 'toast',
//          bindToController: true
//        };
//      }
//    })
//    .addMethod('updateTextContent', updateTextContent)
//    .addMethod('updateContent', updateTextContent);

//  function updateTextContent(newContent) {
//    activeToastContent = newContent;
//  }

//  return $mdToast;

//  /* @ngInject */
//  function toastDefaultOptions($animate, $mdToast, $mdUtil, $mdMedia) {
//    var SWIPE_EVENTS = '$md.swipeleft $md.swiperight $md.swipeup $md.swipedown';
//    return {
//      onShow: onShow,
//      onRemove: onRemove,
//      position: 'bottom left',
//      themable: true,
//      hideDelay: 3000,
//      autoWrap: true,
//      transformTemplate: function (template, options) {
//        var shouldAddWrapper = options.autoWrap && template && !/md-toast-content/g.test(template);

//        if (shouldAddWrapper) {
//          // Root element of template will be <md-toast>. We need to wrap all of its content inside of
//          // of <div class="md-toast-content">. All templates provided here should be static, developer-controlled
//          // content (meaning we're not attempting to guard against XSS).
//          var templateRoot = document.createElement('md-template');
//          templateRoot.innerHTML = template;

//          // Iterate through all root children, to detect possible md-toast directives.
//          for (var i = 0; i < templateRoot.children.length; i++) {
//            if (templateRoot.children[i].nodeName === 'MD-TOAST') {
//              var wrapper = angular.element('<div class="md-toast-content">');

//              // Wrap the children of the `md-toast` directive in jqLite, to be able to append multiple
//              // nodes with the same execution.
//              wrapper.append(angular.element(templateRoot.children[i].childNodes));

//              // Append the new wrapped element to the `md-toast` directive.
//              templateRoot.children[i].appendChild(wrapper[0]);
//            }
//          }


//          return templateRoot.outerHTML;
//        }

//        return template || '';
//      }
//    };

//    function onShow(scope, element, options) {
//      activeToastContent = options.textContent || options.content; // support deprecated #content method

//      var isSmScreen = !$mdMedia('gt-sm');

//      element = $mdUtil.extractElementByName(element, 'md-toast', true);
//      options.element = element;

//      options.onSwipe = function (ev, gesture) {
//        //Add the relevant swipe class to the element so it can animate correctly
//        var swipe = ev.type.replace('$md.', '');
//        var direction = swipe.replace('swipe', '');

//        // If the swipe direction is down/up but the toast came from top/bottom don't fade away
//        // Unless the screen is small, then the toast always on bottom
//        if ((direction === 'down' && options.position.indexOf('top') != -1 && !isSmScreen) ||
//          (direction === 'up' && (options.position.indexOf('bottom') != -1 || isSmScreen))) {
//          return;
//        }

//        if ((direction === 'left' || direction === 'right') && isSmScreen) {
//          return;
//        }

//        element.addClass('_md-' + swipe);
//        $mdUtil.nextTick($mdToast.cancel);
//      };
//      options.openClass = toastOpenClass(options.position);


//      // 'top left' -> 'md-top md-left'
//      options.parent.addClass(options.openClass);

//      // static is the default position
//      if ($mdUtil.hasComputedStyle(options.parent, 'position', 'static')) {
//        options.parent.css('position', 'relative');
//      }

//      element.on(SWIPE_EVENTS, options.onSwipe);
//      element.addClass(isSmScreen ? '_md-bottom' : options.position.split(' ').map(function (pos) {
//        return '_md-' + pos;
//      }).join(' '));

//      if (options.parent) options.parent.addClass('_md-toast-animating');
//      return $animate.enter(element, options.parent).then(function () {
//        if (options.parent) options.parent.removeClass('_md-toast-animating');
//      });
//    }

//    function onRemove(scope, element, options) {
//      element.off(SWIPE_EVENTS, options.onSwipe);
//      if (options.parent) options.parent.addClass('_md-toast-animating');
//      if (options.openClass) options.parent.removeClass(options.openClass);

//      return ((options.$destroy == true) ? element.remove() : $animate.leave(element))
//        .then(function () {
//          if (options.parent) options.parent.removeClass('_md-toast-animating');
//          if ($mdUtil.hasComputedStyle(options.parent, 'position', 'static')) {
//            options.parent.css('position', '');
//          }
//        });
//    }

//    function toastOpenClass(position) {
//      // For mobile, always open full-width on bottom
//      if (!$mdMedia('gt-xs')) {
//        return '_md-toast-open-bottom';
//      }

//      return '_md-toast-open-' +
//        (position.indexOf('top') > -1 ? 'top' : 'bottom');
//    }
//  }

//}