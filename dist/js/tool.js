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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(9);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue) {
    Vue.component('commenter', __webpack_require__(3));
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(8)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Comment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Comment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Comment__);
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
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['resourceName', 'resourceId', 'field'],

    components: { Comment: __WEBPACK_IMPORTED_MODULE_0__Comment___default.a },

    data: function data() {
        return {
            baseCommentUri: '/nova-api/comments',
            comment: '',
            data: {
                next_page_url: '',
                prev_page_url: '',
                resources: {}
            }
        };
    },
    mounted: function mounted() {
        this.getComments(this.commentsUri);
    },


    computed: {
        commentsUri: function commentsUri() {
            return this.baseCommentUri + '?page=1';
        },
        hasComments: function hasComments() {
            return Boolean(this.data.resources.length);
        },
        hasNextLink: function hasNextLink() {
            return Boolean(this.data.next_page_url);
        },
        hasPrevLink: function hasPrevLink() {
            return Boolean(this.data.prev_page_url);
        },
        hasPagination: function hasPagination() {
            return this.hasNextLink || this.hasPrevLink;
        },
        queryParams: function queryParams() {
            return '&orderBy=created_at&orderByDirection=desc&viaResource=' + this.resourceName + '&viaResourceId=' + this.resourceId + '&viaRelationship=comments&relationshipType=hasMany';
        }
    },

    methods: {
        createComment: function createComment() {
            var _this = this;

            if (!this.comment) {
                return false;
            }

            var payload = {
                comment: this.comment,
                viaResource: this.resourceName,
                viaResourceId: this.resourceId,
                viaRelationship: 'comments'
            };

            axios.post(this.baseCommentUri, payload).then(function () {
                _this.getComments(_this.commentsUri);

                _this.resetComment();

                _this.$toasted.show('A new comment has been created.', { type: 'success' });
            }).catch(function (response) {
                return _this.$toasted.show(response, { type: 'error' });
            });
        },
        getComments: function getComments(uri) {
            var _this2 = this;

            axios.get('' + uri + this.queryParams).then(function (_ref) {
                var data = _ref.data;
                return _this2.data = data;
            });
        },
        paginationClass: function paginationClass(isActive) {
            return isActive ? 'text-primary dim' : 'text-80 opacity-50';
        },
        resetComment: function resetComment() {
            this.comment = '';
        }
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(6)
/* template */
var __vue_template__ = __webpack_require__(7)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Comment.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54ded044", Component.options)
  } else {
    hotAPI.reload("data-v-54ded044", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

// require('moment-timezone');

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        comment: {
            type: Object,
            required: true
        }
    },

    computed: {
        commentString: function commentString() {
            return _.find(this.comment.fields, { attribute: 'comment' }).value;
        },
        commenter: function commenter() {
            return _.find(this.comment.fields, { attribute: 'commenter' }).value;
        },
        commenterUrl: function commenterUrl() {
            var commenterId = _.find(this.comment.fields, { attribute: 'commenter' }).belongsToId;

            return '/nova/resources/users/' + commenterId;
        },
        date: function date() {
            var now = moment();
            var date = moment.utc(_.find(this.comment.fields, { attribute: 'created_at' }).value).tz(moment.tz.guess());

            if (date.isSame(now, 'minute')) {
                return 'just now';
            }

            if (date.isSame(now, 'day')) {
                return 'at ' + date.format('LT');
            }

            if (date.isSame(now, 'year')) {
                return 'on ' + date.format('MMM D');
            }

            return 'on ' + date.format('ll');
        },
        hasCommenter: function hasCommenter() {
            return Boolean(this.commenter);
        }
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "commenter__comment py-4 border-t border-40" },
    [
      _c(
        "div",
        { staticClass: "font-light text-80 text-sm" },
        [
          _vm.hasCommenter
            ? [
                _c("a", {
                  staticClass: "no-underline dim text-primary font-bold",
                  attrs: { href: _vm.commenterUrl },
                  domProps: { textContent: _vm._s(_vm.commenter) }
                }),
                _vm._v(
                  "\n\n            " + _vm._s(_vm.__("said")) + "\n        "
                )
              ]
            : [_vm._v("\n            {{__('Written')}\n        ")],
          _vm._v("\n\n        " + _vm._s(_vm.date) + "\n    ")
        ],
        2
      ),
      _vm._v(" "),
      _c("div", {
        staticClass: "mt-2",
        domProps: { innerHTML: _vm._s(_vm.commentString) }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-54ded044", module.exports)
  }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h4", { staticClass: "text-90 font-normal text-2xl mb-3" }, [
      _vm._v("\n        " + _vm._s(_vm.__("Comments")) + "\n    ")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card mb-6 overflow-hidden" }, [
      _c(
        "div",
        { staticClass: "flex border-b border-40 remove-bottom-border px-8" },
        [
          _c("div", { staticClass: "w-full pt-6 pb-2" }, [
            _c("h4", { staticClass: "font-normal text-80" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.__("Write new comment")) +
                  "\n                "
              )
            ]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.comment,
                  expression: "comment"
                }
              ],
              staticClass:
                "w-full form-control form-input form-input-bordered py-3 h-auto mt-2",
              attrs: { id: "commenter", dusk: "commenter", rows: "5" },
              domProps: { value: _vm.comment },
              on: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    $event.keyCode !== 93 &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.createComment($event)
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.comment = $event.target.value
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "flex justify-between px-8 pb-4 border-b border-40" },
        [
          _c("div", { staticClass: "help-text" }, [
            _vm._v(
              "\n                " +
                _vm._s(_vm.__("On MacOS, press ⌘ + Enter to save")) +
                "\n            "
            )
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass:
                "btn btn-default btn-primary inline-flex items-center relative mt-4",
              attrs: { type: "submit" },
              on: { click: _vm.createComment }
            },
            [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.__("Save Comment")) +
                  "\n            "
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _vm.hasComments
        ? _c(
            "div",
            {
              staticClass: "flex border-b border-40 remove-bottom-border px-8"
            },
            [
              _c(
                "div",
                { staticClass: "w-full py-6" },
                [
                  _c("h3", { staticClass: "text-90 font-bold text-lg mb-4" }, [
                    _vm._v(_vm._s(_vm.__("Comments")))
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.data.resources, function(comment, key) {
                    return _c("comment", {
                      key: key,
                      attrs: { comment: comment }
                    })
                  })
                ],
                2
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.hasPagination
        ? _c("div", { staticClass: "bg-20 rounded-b" }, [
            _c("nav", { staticClass: "flex justify-between items-center" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-link py-3 px-4",
                  class: _vm.paginationClass(_vm.hasNextLink),
                  attrs: { disabled: !_vm.hasNextLink },
                  on: {
                    click: function($event) {
                      return _vm.getComments(_vm.data.next_page_url)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.__("Older")) +
                      "\n                "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-link py-3 px-4",
                  class: _vm.paginationClass(_vm.hasPrevLink),
                  attrs: { disabled: !_vm.hasPrevLink },
                  on: {
                    click: function($event) {
                      return _vm.getComments(_vm.data.prev_page_url)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.__("Newer")) +
                      "\n                "
                  )
                ]
              )
            ])
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);