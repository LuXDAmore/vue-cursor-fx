module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "5118":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("6017");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "6017":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba"), __webpack_require__("4362")))

/***/ }),

/***/ "646a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_style_scss_vue_type_style_index_1_id_2f69e36a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aded");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_style_scss_vue_type_style_index_1_id_2f69e36a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_style_scss_vue_type_style_index_1_id_2f69e36a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_style_scss_vue_type_style_index_1_id_2f69e36a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6d28":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _CursorFx_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b7a4");
// Import vue component

var plugin = {
  CursorFx: _CursorFx_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
  installed: false,
  install: function install(Vue) {
    if (plugin.installed) return;
    plugin.installed = true;
    Vue.component(_CursorFx_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _CursorFx_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
  }
}; // Auto install

var GlobalVue = null;
if (typeof window !== 'undefined') GlobalVue = window.Vue;else if (typeof global !== 'undefined') GlobalVue = global.Vue;
GlobalVue && GlobalVue.use(plugin); // To allow use as module (npm/webpack/etc.) export component

/* harmony default export */ __webpack_exports__["a"] = (plugin);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "ab2f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_global_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b6b5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_global_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_global_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_global_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "aded":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b6b5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b7a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"59c5c80f-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CursorFx/CursorFx.vue?vue&type=template&id=2f69e36a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loaded),expression:"loaded"}],ref:"cursor",staticClass:"cursor-fx",class:_vm.classes,style:(_vm.cssVars),attrs:{"id":"cursor-fx"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(! _vm.hideOutside),expression:"! hideOutside"}],staticClass:"cursor-fx__inner cursor-fx__inner__outside",style:(_vm.outsideSizes)}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(( !! _vm.$slots.default || !! _vm.$scopedSlots.default ) || _vm.forceCustomSlot),expression:"( !! $slots.default || !! $scopedSlots.default ) || forceCustomSlot"}],staticClass:"cursor-fx__inner cursor-fx__inner__custom",style:(_vm.outsideSizes)},[_vm._t("default")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(! _vm.hideInside),expression:"! hideInside"}],staticClass:"cursor-fx__inner cursor-fx__inner__inside",style:(_vm.insideSizes)})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/CursorFx/CursorFx.vue?vue&type=template&id=2f69e36a&scoped=true&

// EXTERNAL MODULE: ./node_modules/timers-browserify/main.js
var main = __webpack_require__("5118");

// CONCATENATED MODULE: ./src/CursorFx/cursor-fx.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCALE_MIN = 0.5,
    SCALE_MAX = 1,
    lerp = function lerp(a, b, n) {
  return (1 - n) * a + n * b;
},
    getMousePos = function getMousePos(e) {
  var posx = 0,
      posy = 0;
  if (!e) e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  };
};

var CursorFx =
/*#__PURE__*/
function () {
  function CursorFx(_ref) {
    var _this = this;

    var el = _ref.el,
        base_class = _ref.base_class;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CursorFx);

    this.DOM = {
      el: el
    };
    this.$options = Object.freeze(_objectSpread({
      mixBlendMode: null,
      lerps: {
        dot: 1,
        circle: 0.18,
        custom: 0.23
      },
      scale: {
        ratio: 0.18,
        min: SCALE_MIN,
        max: SCALE_MAX
      },
      opacity: 0.1
    }, options));
    this.DOM.dot = this.DOM.el.querySelector("".concat(base_class, "__inner__inside"));
    this.DOM.circle = this.DOM.el.querySelector("".concat(base_class, "__inner__outside"));
    this.DOM.custom = this.DOM.el.querySelector("".concat(base_class, "__inner__custom"));
    this.bounds = {
      dot: this.DOM.dot ? this.DOM.dot.getBoundingClientRect() : null,
      circle: this.DOM.circle ? this.DOM.circle.getBoundingClientRect() : null,
      custom: this.DOM.custom ? this.DOM.custom.getBoundingClientRect() : null
    };

    if (this.bounds.dot && !this.bounds.dot.width) {
      var COMPUTED_STYLES = window.getComputedStyle(this.DOM.dot);
      this.bounds.dot.width = parseInt(COMPUTED_STYLES.getPropertyValue('width').replace('px', ''));
      this.bounds.dot.height = parseInt(COMPUTED_STYLES.getPropertyValue('height').replace('px', ''));
    }

    if (this.bounds.circle && !this.bounds.circle.width) {
      var _COMPUTED_STYLES = window.getComputedStyle(this.DOM.circle);

      this.bounds.circle.width = parseInt(_COMPUTED_STYLES.getPropertyValue('width').replace('px', ''));
      this.bounds.circle.height = parseInt(_COMPUTED_STYLES.getPropertyValue('height').replace('px', ''));
    }

    if (this.bounds.custom && !this.bounds.custom.width) {
      var _COMPUTED_STYLES2 = window.getComputedStyle(this.DOM.custom);

      this.bounds.custom.width = parseInt(_COMPUTED_STYLES2.getPropertyValue('width').replace('px', ''));
      this.bounds.custom.height = parseInt(_COMPUTED_STYLES2.getPropertyValue('height').replace('px', ''));
    }

    this.scale = this.$options.scale.min;
    this.lastScale = this.$options.scale.max;
    this.opacity = this.$options.opacity;
    this.lastOpacity = 1;
    this.mousePos = {
      x: 0,
      y: 0
    };
    this.lastMousePos = {
      dot: this.DOM.dot ? this.DOM.dot.getBoundingClientRect() : {
        top: 0,
        left: 0
      },
      custom: this.DOM.custom ? this.DOM.custom.getBoundingClientRect() : {
        top: 0,
        left: 0
      },
      circle: this.DOM.circle ? this.DOM.circle.getBoundingClientRect() : {
        top: 0,
        left: 0
      }
    };
    this.initEvents();
    requestAnimationFrame(function () {
      return _this.render();
    });
  }

  _createClass(CursorFx, [{
    key: "setMouseMove",
    value: function setMouseMove(ev) {
      this.mousePos = getMousePos(ev);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      var mouseMove = function mouseMove(ev) {
        return _this2.setMouseMove(ev);
      };

      window.removeEventListener('mousemove', mouseMove);
      window.addEventListener('mousemove', mouseMove, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      requestAnimationFrame(function () {
        return _this3.render();
      });
      var _this$$options = this.$options,
          _this$$options$lerps = _this$$options.lerps,
          dot = _this$$options$lerps.dot,
          circle = _this$$options$lerps.circle,
          custom = _this$$options$lerps.custom,
          ratio = _this$$options.scale.ratio,
          opacity = _this$$options.opacity;
      this.lastScale = lerp(this.lastScale, this.scale, ratio);
      this.lastOpacity = lerp(this.lastOpacity, this.opacity, opacity);

      if (this.bounds.dot) {
        this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width / 2, dot);
        this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height / 2, dot);
        this.DOM.dot.style.transform = "translateX(".concat(this.lastMousePos.dot.x, "px) translateY(").concat(this.lastMousePos.dot.y, "px)");
      }

      if (this.bounds.circle) {
        this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width / 2, circle);
        this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height / 2, circle);
        this.DOM.circle.style.transform = "translateX(".concat(this.lastMousePos.circle.x, "px) translateY(").concat(this.lastMousePos.circle.y, "px) scale(").concat(this.lastScale, ")");
      }

      if (this.bounds.custom) {
        this.lastMousePos.custom.x = lerp(this.lastMousePos.custom.x, this.mousePos.x - this.bounds.custom.width / 2, custom);
        this.lastMousePos.custom.y = lerp(this.lastMousePos.custom.y, this.mousePos.y - this.bounds.custom.height / 2, custom);
        this.DOM.custom.style.transform = "translateX(".concat(this.lastMousePos.custom.x, "px) translateY(").concat(this.lastMousePos.custom.y, "px) scale(").concat(this.lastScale, ")");
      }
    }
  }, {
    key: "enter",
    value: function enter() {
      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$options.scale.max;
      this.scale = scale;
    }
  }, {
    key: "leave",
    value: function leave() {
      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$options.scale.min;
      this.scale = scale;
    }
  }, {
    key: "click",
    value: function click() {
      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$options.scale.min;
      var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.lastScale = scale;
      this.lastOpacity = opacity;
    }
  }, {
    key: "enterHidden",
    value: function enterHidden() {
      this.DOM.el.style.visibility = 'hidden';
    }
  }, {
    key: "leaveHidden",
    value: function leaveHidden() {
      this.DOM.el.style.visibility = 'visible';
    }
  }, {
    key: "mixBlendMode",
    value: function mixBlendMode() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$options.mixBlendMode;
      this.DOM.el.style.mixBlendMode = value;
    }
  }]);

  return CursorFx;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/CursorFx/CursorFx.vue?vue&type=script&lang=js&
function CursorFxvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function CursorFxvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { CursorFxvue_type_script_lang_js_ownKeys(source, true).forEach(function (key) { CursorFxvue_type_script_lang_js_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { CursorFxvue_type_script_lang_js_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function CursorFxvue_type_script_lang_js_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Timers
 // Cursor

 // Component

/* harmony default export */ var CursorFxvue_type_script_lang_js_ = ({
  name: 'cursor-fx',
  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      "default": function _default() {}
    },
    mixBlendMode: {
      type: String,
      "default": null
    },
    color: {
      type: String,
      "default": '#333333'
    },
    colorHover: {
      type: String,
      "default": '#333333'
    },
    outsideSize: {
      type: String,
      "default": null
    },
    insideSize: {
      type: String,
      "default": null
    },
    shape: {
      type: String,
      "default": null
    },
    delay: {
      type: [Number, String],
      "default": 60
    },
    forceCustomSlot: {
      type: Boolean,
      "default": false
    },
    allowOnMobile: {
      type: Boolean,
      "default": false
    },
    hideOutside: {
      type: Boolean,
      "default": false
    },
    hideInside: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      touch: false,
      hover: false,
      loaded: false
    };
  },
  computed: {
    classes: function classes() {
      return CursorFxvue_type_script_lang_js_defineProperty({
        'cursor-fx--hover': this.hover,
        'cursor-fx--touch': this.touch,
        'cursor-fx--loaded': this.loaded
      }, "cursor-fx--shape-".concat(this.shape), this.shape);
    },
    cssVars: function cssVars() {
      return {
        '--color': this.color,
        '--color-hover': this.colorHover,
        'mix-blend-mode': this.mixBlendMode
      };
    },
    // Sizes
    outsideSizes: function outsideSizes() {
      return {
        width: this.outsideSize,
        height: this.outsideSize
      };
    },
    insideSizes: function insideSizes() {
      return {
        width: this.insideSize,
        height: this.insideSize
      };
    }
  },
  watch: {
    forceCustomSlot: 'refresh',
    outsideSize: 'refresh',
    insideSize: 'refresh',
    config: {
      handler: 'refresh',
      deep: true
    }
  },
  created: function created() {
    this.$timeout = null;
    this.$cursor = null;
  },
  mounted: function mounted() {
    this.touch = this.isTouchDevice();
    (this.allowOnMobile || !this.touch) && this.$nextTick(this.start);
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },
  methods: {
    isTouchDevice: function isTouchDevice() {
      return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    },
    destroy: function destroy() {
      var _this = this;

      document.documentElement.classList.remove('is-cursor-fx-active');

      if (this.$cursor) {
        _toConsumableArray(document.querySelectorAll('[data-cursor-hover]')).forEach(function (link) {
          link.removeEventListener('mouseenter', function () {
            return _this.$cursor.enter();
          }, false);
          link.removeEventListener('mouseleave', function () {
            return _this.$cursor.leave();
          }, false);
          link.removeEventListener('click', function () {
            return _this.$cursor.click();
          }, false);
        });

        _toConsumableArray(document.querySelectorAll('[data-cursor-hidden]')).forEach(function (link) {
          link.removeEventListener('mouseenter', function () {
            return _this.$cursor.enterHidden();
          }, false);
          link.removeEventListener('mouseleave', function () {
            return _this.$cursor.leaveHidden();
          }, false);
        });

        _toConsumableArray(document.querySelectorAll('[data-cursor-mix-blend-mode]')).forEach(function (link) {
          link.removeEventListener('mouseenter', function () {
            return _this.$cursor.mixBlendMode();
          }, false);
          link.removeEventListener('mouseleave', function () {
            return _this.$cursor.mixBlendMode();
          }, false);
        });
      }

      this.$timeout && Object(main["clearTimeout"])(this.$timeout);
    },
    initEvents: function initEvents() {
      var _this2 = this;

      // Custom cursor changes state when hovering on elements with 'data-hover'.
      _toConsumableArray(document.querySelectorAll('[data-cursor-hover]')).forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          _this2.$cursor.enter();

          _this2.hover = true;
        }, false);
        link.addEventListener('mouseleave', function () {
          _this2.$cursor.leave();

          _this2.hover = false;
        }, false);
        link.addEventListener('click', function () {
          return _this2.$cursor.click();
        }, false);
      });

      _toConsumableArray(document.querySelectorAll('[data-cursor-hidden]')).forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          return _this2.$cursor.enterHidden();
        }, false);
        link.addEventListener('mouseleave', function () {
          return _this2.$cursor.leaveHidden();
        }, false);
      });

      _toConsumableArray(document.querySelectorAll('[data-cursor-mix-blend-mode]')).forEach(function (link) {
        link.addEventListener('mouseenter', function (el) {
          return _this2.$cursor.mixBlendMode(el.target.dataset.cursorMixBlendMode);
        }, false);
        link.addEventListener('mouseleave', function () {
          return _this2.$cursor.mixBlendMode();
        }, false);
      });
    },
    init: function init() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.$cursor = new CursorFx({
        el: this.$refs.cursor,
        base_class: '.cursor-fx'
      }, CursorFxvue_type_script_lang_js_objectSpread({
        mixBlendMode: this.mixBlendMode
      }, this.config));
      events && this.initEvents();
      this.$emit('ready', this.$cursor);
      document.documentElement.classList.add('is-cursor-fx-active');
      this.loaded = true;
    },
    start: function start() {
      var _this3 = this;

      this.$timeout = Object(main["setTimeout"])(function () {
        return _this3.init();
      }, parseInt(this.delay));
    },
    refresh: function refresh() {
      var _this4 = this;

      var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      newVal && this.$nextTick(function () {
        return _this4.init(false);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/CursorFx/CursorFx.vue?vue&type=script&lang=js&
 /* harmony default export */ var CursorFx_CursorFxvue_type_script_lang_js_ = (CursorFxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/CursorFx/global.scss?vue&type=style&index=0&lang=scss&
var globalvue_type_style_index_0_lang_scss_ = __webpack_require__("ab2f");

// EXTERNAL MODULE: ./src/CursorFx/style.scss?vue&type=style&index=1&id=2f69e36a&scoped=true&lang=scss&
var stylevue_type_style_index_1_id_2f69e36a_scoped_true_lang_scss_ = __webpack_require__("646a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/CursorFx/CursorFx.vue







/* normalize component */

var component = normalizeComponent(
  CursorFx_CursorFxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "2f69e36a",
  null
  
)

/* harmony default export */ var CursorFx_CursorFx = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/CursorFx/index.js
var CursorFx = __webpack_require__("6d28");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (CursorFx["a" /* default */]);



/***/ })

/******/ })["default"];