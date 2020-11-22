/**
 * Framework7 React 3.6.7
 * Build full featured iOS & Android apps using Framework7 & React
 * http://framework7.io/react/
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 22, 2020
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.Framework7React = factory(global.React));
}(this, function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  var Utils = {
    noUndefinedProps: function noUndefinedProps(obj) {
      var o = {};
      Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] !== 'undefined') { o[key] = obj[key]; }
      });
      return o;
    },
    isTrueProp: function isTrueProp(val) {
      return val === true || val === '';
    },
    isStringProp: function isStringProp(val) {
      return typeof val === 'string' && val !== '';
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    now: function now() {
      return Date.now();
    },
    extend: function extend() {
      var assign, assign$1;

      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];
      var deep = true;
      var to;
      var from;
      if (typeof args[0] === 'boolean') {
        (assign = args, deep = assign[0], to = assign[1]);
        args.splice(0, 2);
        from = args;
      } else {
        (assign$1 = args, to = assign$1[0]);
        args.splice(0, 1);
        from = args;
      }
      for (var i = 0; i < from.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (!deep) {
                to[nextKey] = nextSource[nextKey];
              } else if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
    flattenArray: function flattenArray() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var arr = [];
      args.forEach(function (arg) {
        if (Array.isArray(arg)) { arr.push.apply(arr, Utils.flattenArray.apply(Utils, arg)); }
        else { arr.push(arg); }
      });
      return arr;
    },
    classNames: function classNames() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var classes = [];
      args.forEach(function (arg) {
        if (typeof arg === 'object' && arg.constructor === Object) {
          Object.keys(arg).forEach(function (key) {
            if (arg[key]) { classes.push(key); }
          });
        } else if (arg) { classes.push(arg); }
      });
      return classes.join(' ');
    },
  };

  var eventsEmitter = {
    listeners: {},
    on: function on(events, handler) {
      events.split(' ').forEach(function (event) {
        if (!eventsEmitter.listeners[event]) { eventsEmitter.listeners[event] = []; }
        eventsEmitter.listeners[event].unshift(handler);
      });
    },
    off: function off(events, handler) {
      events.split(' ').forEach(function (event) {
        if (!eventsEmitter.listeners[event]) { return; }
        if (typeof handler === 'undefined') {
          eventsEmitter.listeners[event] = [];
        } else {
          eventsEmitter.listeners[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler) {
              eventsEmitter.listeners[event].splice(index, 1);
            }
          });
        }
      });
    },
    once: function once(events, handler) {
      if (typeof handler !== 'function') { return; }
      function onceHandler() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        handler.apply(void 0, args);
        eventsEmitter.off(events, onceHandler);
      }
      eventsEmitter.on(events, onceHandler);
    },
    emit: function emit(events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      events.split(' ').forEach(function (event) {
        if (eventsEmitter.listeners && eventsEmitter.listeners[event]) {
          var handlers = [];
          eventsEmitter.listeners[event].forEach(function (eventHandler) {
            handlers.push(eventHandler);
          });
          handlers.forEach(function (eventHandler) {
            eventHandler.apply(void 0, args);
          });
        }
      });
    },
  };

  var f7 = {
    instance: null,
    Framework7: null,
    init: function init(rootEl, params, routes) {
      if ( params === void 0 ) params = {};

      var f7Params = Utils.extend({}, params, {
        root: rootEl,
      });
      if (routes && routes.length && !f7Params.routes) { f7Params.routes = routes; }

      f7.instance = new f7.Framework7(f7Params);
      if (f7.instance.initialized) {
        eventsEmitter.emit('ready', f7.instance);
      } else {
        f7.instance.on('init', function () {
          eventsEmitter.emit('ready', f7.instance);
        });
      }
    },
    ready: function ready(callback) {
      if (!callback) { return; }
      if (f7.instance) { callback(f7.instance); }
      else {
        eventsEmitter.once('ready', callback);
      }
    },
    routers: {
      views: [],
      tabs: [],
      modals: null,
    },
  };

  /* eslint no-underscore-dangle: "off" */

  var routerComponentIdCounter = 0;

  var componentsRouter = {
    proto: {
      pageComponentLoader: function pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var el = routerEl;
        var routerComponent;
        f7.routers.views.forEach(function (data) {
          if (data.el && data.el === routerEl) {
            routerComponent = data.component;
          }
        });

        if (!routerComponent || !routerComponent.state.pages) {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var pageData = {
          component: component,
          id: id,
          props: Utils.extend(
            {
              f7route: options.route,
              f7router: router,
            },
            options.route.params,
            options.props || {}
          ),
        };
        routerComponent.$f7router = router;
        routerComponent.$f7route = options.route;

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData.component !== routerComponent || resolved) { return; }
          eventsEmitter.off('viewRouterDidUpdate', onDidUpdate);

          var pageEl = el.children[el.children.length - 1];
          pageData.el = pageEl;

          resolve(pageEl);
          resolved = true;
        }

        eventsEmitter.on('viewRouterDidUpdate', onDidUpdate);

        routerComponent.state.pages.push(pageData);
        routerComponent.setState({ pages: routerComponent.state.pages });
      },
      removePage: function removePage($pageEl) {
        if (!$pageEl) { return; }
        var router = this;
        var f7Page;
        if ('length' in $pageEl) { f7Page = $pageEl[0].f7Page; }
        else { f7Page = $pageEl.f7Page; }
        if (f7Page && f7Page.route && f7Page.route.route && f7Page.route.route.keepAlive) {
          router.app.$($pageEl).remove();
          return;
        }
        var routerComponent;
        f7.routers.views.forEach(function (data) {
          if (data.el && data.el === router.el) {
            routerComponent = data.component;
          }
        });

        var pageEl;
        if ('length' in $pageEl) {
          // Dom7
          if ($pageEl.length === 0) { return; }
          pageEl = $pageEl[0];
        } else {
          pageEl = $pageEl;
        }
        if (!pageEl) { return; }

        var pageComponentFound;
        routerComponent.state.pages.forEach(function (page, index) {
          if (page.el === pageEl) {
            pageComponentFound = true;
            routerComponent.state.pages.splice(index, 1);
            routerComponent.setState({ pages: routerComponent.state.pages });
          }
        });
        if (!pageComponentFound) {
          pageEl.parentNode.removeChild(pageEl);
        }
      },
      tabComponentLoader: function tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        if (!tabEl) { reject(); }

        var tabsComponent;
        f7.routers.tabs.forEach(function (tabData) {
          if (tabData.el && tabData.el === tabEl) {
            tabsComponent = tabData.component;
          }
        });
        if (!tabsComponent) {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var tabContent = {
          id: id,
          component: component,
          props: Utils.extend(
            {
              f7route: options.route,
              f7router: router,
            },
            options.route.params,
            options.props || {}
          ),
        };

        tabsComponent.$f7router = router;
        tabsComponent.$f7route = options.route;

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData.component !== tabsComponent || resolved) { return; }
          eventsEmitter.off('tabRouterDidUpdate', onDidUpdate);

          var tabContentEl = tabEl.children[0];
          resolve(tabContentEl);

          resolved = true;
        }

        eventsEmitter.on('tabRouterDidUpdate', onDidUpdate);

        tabsComponent.setState({ tabContent: tabContent });
      },
      removeTabContent: function removeTabContent(tabEl) {
        if (!tabEl) { return; }

        var tabComponent;
        f7.routers.tabs.forEach(function (tabData) {
          if (tabData.el && tabData.el === tabEl) {
            tabComponent = tabData.component;
          }
        });
        var hasComponent = !!tabComponent.state.tabContent;
        if (!tabComponent || !hasComponent) {
          tabEl.innerHTML = ''; // eslint-disable-line
          return;
        }
        tabComponent.setState({ tabContent: null });
      },
      modalComponentLoader: function modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var modalsComponent = f7.routers.modals && f7.routers.modals.component;
        var modalsComponentEl = f7.routers.modals && f7.routers.modals.el;

        {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var modalData = {
          component: component,
          id: id,
          props: Utils.extend(
            {
              f7route: options.route,
              f7router: router,
            },
            options.route.params,
            options.props || {}
          ),
        };
        modalsComponent.$f7router = router;
        modalsComponent.$f7route = options.route;

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData.component !== modalsComponent || resolved) { return; }
          eventsEmitter.off('modalsRouterDidUpdate', onDidUpdate);

          var modalEl = modalsComponentEl.children[modalsComponentEl.children.length - 1];
          modalData.el = modalEl;

          resolve(modalEl);
          resolved = true;
        }

        eventsEmitter.on('modalsRouterDidUpdate', onDidUpdate);

        modalsComponent.state.modals.push(modalData);
        modalsComponent.setState({ modals: modalsComponent.state.modals });
      },
      removeModal: function removeModal(modalEl) {
        var modalsComponent = f7.routers.modals && f7.routers.modals.component;
        { return; }

        var modalDataToRemove;
        modalsComponent.state.modals.forEach(function (modalData) {
          if (modalData.el === modalEl) { modalDataToRemove = modalData; }
        });

        modalsComponent.state.modals.splice(modalsComponent.state.modals.indexOf(modalDataToRemove), 1);
        modalsComponent.setState({ modals: modalsComponent.state.modals });
      },
    },
  };

  /**
   * Framework7 React 3.6.7
   * Build full featured iOS & Android apps using Framework7 & React
   * http://framework7.io/react/
   *
   * Copyright 2014-2020 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: November 22, 2020
   */

  var Plugin = {
    name: 'phenomePlugin',
    install: function install(params) {
      if ( params === void 0 ) params = {};

      var Framework7 = this;
      f7.Framework7 = Framework7;

      var Extend = params.React ? params.React.Component : React.Component; // eslint-disable-line

      
      // Define protos
      Object.defineProperty(Extend.prototype, '$f7', {
        get: function get() {
          return f7.instance;
        },
      });

      var $theme = {};
      var theme = params.theme;
      if (theme === 'md') { $theme.md = true; }
      if (theme === 'ios') { $theme.ios = true; }
      if (!theme || theme === 'auto') {
        $theme.ios = !!(Framework7.Device || Framework7.device).ios;
        $theme.md = !(Framework7.Device || Framework7.device).ios;
      }
      Object.defineProperty(Extend.prototype, '$theme', {
        get: function get() {
          return {
            ios: f7.instance ? f7.instance.theme === 'ios' : $theme.ios,
            md: f7.instance ? f7.instance.theme === 'md' : $theme.md,
          };
        },
      });

      function f7ready(callback) {
        f7.ready(callback);
      }
      Extend.prototype.Dom7 = Framework7.$;
      Extend.prototype.$$ = Framework7.$;
      Extend.prototype.$device = Framework7.device;
      Extend.prototype.$request = Framework7.request;
      Extend.prototype.$utils = Framework7.utils;
      Extend.prototype.$f7ready = f7ready;
      Extend.prototype.$f7Ready = f7ready;

      Object.defineProperty(Extend.prototype, '$f7route', {
        get: function get() {
          var self = this;
          if (self.props && self.props.f7route) { return self.props.f7route; }
          if (self.f7route) { return self.f7route; }
          if (self._f7route) { return self._f7route; }

          var route;
          return route;
        },
        set: function set(value) {
          var self = this;
          self._f7route = value;
        },
      });
      Object.defineProperty(Extend.prototype, '$f7router', {
        get: function get() {
          var self = this;
          if (self.props && self.props.f7router) { return self.props.f7router; }
          if (self.f7router) { return self.f7router; }
          if (self._f7router) { return self._f7router; }

          var router;
          return router;
        },
        set: function set(value) {
          var self = this;
          self._f7router = value;
        },
      });

      // Extend F7 Router
      Framework7.Router.use(componentsRouter);
    },
  };

  return Plugin;

}));
