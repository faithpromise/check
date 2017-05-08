/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
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
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(21);



/* harmony default export */ __webpack_exports__["a"] = ({
    signup: function signup(email) {
        return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* default */].signup(email);
    },
    verify: function verify(token) {
        return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* default */].verify(token);
    },
    login: function login(creds) {
        return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* default */].login(creds).then(set_token);
    },
    reset_password: function reset_password(pw) {
        return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* default */].reset_password(pw);
    },
    send_token: function send_token(email) {
        return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* default */].send_token(email);
    },
    token_login: function token_login(token) {
        return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* default */].token_login(token).then(set_token);
    },


    logout: logout,

    has_token: function has_token() {
        var jwtStr = get_local_token();
        return typeof jwtStr === 'string';
    },
    is_authenticated: function is_authenticated() {
        return this.get_seconds_until_logout() > 0;
    },
    get_seconds_until_logout: function get_seconds_until_logout() {
        var jwtStr = get_local_token();
        try {
            var token = __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default()(jwtStr);
            var time_diff = localStorage.getItem('server_time_diff');
            var seconds_remaining = typeof jwtStr === 'string' ? token.exp - time_diff - Date.now() / 1000 : 0;
            return Math.round(Math.max(0, seconds_remaining));
        } catch (err) {
            return 0;
        }
    }
});

function set_token(result) {
    localStorage.setItem('server_time_diff', result.data.current_time - Date.now() / 1000);
    localStorage.setItem('id_token', result.data.token);
    localStorage.setItem('user_name', result.data.user_name);
    localStorage.setItem('user_email', result.data.user_email);
    localStorage.setItem('user_avatar_url', result.data.user_avatar_url);
    localStorage.setItem('remember_me', result.data.remember_me);
}

function get_local_token() {
    return localStorage.getItem('id_token');
}

function logout() {
    localStorage.removeItem('id_token');
    if (!localStorage.getItem('remember_me')) {
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_avatar_url');
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_main_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__layouts_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_components_route_projects_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_components_route_projects_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__route_components_route_projects_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vuex_store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_auth__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_routes__ = __webpack_require__(20);







var placeholder = { template: '<div>Placeholder</div>' };

var routes = [{
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_0__layouts_main_vue___default.a,
    children: [{ name: 'home', path: '', component: __WEBPACK_IMPORTED_MODULE_1__route_components_route_projects_vue___default.a }, { name: 'projects', path: '/projects', component: placeholder }, { name: 'people', path: '/people', component: placeholder }, { name: 'settings', path: '/settings', component: placeholder }, { name: 'profile', path: '/profile', component: placeholder }]
}];

var router = new VueRouter({
    routes: routes.concat(__WEBPACK_IMPORTED_MODULE_4__auth_auth_routes__["a" /* default */]),
    mode: 'history',
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 };
    }
});

router.beforeEach(function (to, from, next) {

    var unrestricted_routes = ['login', 'signup', 'verify', 'forgot_password', 'token_login', 'reset_password'];

    if (unrestricted_routes.indexOf(to.name) < 0 && !__WEBPACK_IMPORTED_MODULE_3__auth_auth__["a" /* default */].is_authenticated()) {
        return next({ name: 'login' });
    }

    NProgress.start();

    __WEBPACK_IMPORTED_MODULE_2__vuex_store__["a" /* default */].dispatch('remove_flash');

    // Set body class
    document.body.classList.remove(from.name + '_page');
    document.body.classList.add(to.name + '_page');

    next();
});

router.afterEach(function () {
    NProgress.done();
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuex__);


var state = {
    flash_message: null
};

var mutations = {
    insert_flash: function insert_flash(state, payload) {
        state.flash_message = payload;
    }
};

var actions = {
    remove_flash: function remove_flash(context) {
        context.commit('insert_flash', null);
    }
};

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_vuex___default.a.Store({
    state: state,
    mutations: mutations,
    actions: actions
}));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(41),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/auth/login-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47f1f83f", Component.options)
  } else {
    hotAPI.reload("data-v-47f1f83f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(46),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/layouts/auth.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] auth.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d82cd364", Component.options)
  } else {
    hotAPI.reload("data-v-d82cd364", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = axios;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vuex_store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_head__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_head__);






/**
 * Send token with each request
 */
__WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

/**
 * Bootstrap Vue app
 */
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$http = __WEBPACK_IMPORTED_MODULE_3_axios___default.a;

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_head___default.a);

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  store: __WEBPACK_IMPORTED_MODULE_1__vuex_store__["a" /* default */],
  router: __WEBPACK_IMPORTED_MODULE_2__routes__["a" /* default */],
  el: '#app'
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(2);
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





var error_messages = {
    email_invalid: 'The email address provided is not a valid email address.',
    user_not_found: 'We couldn\'t find an account with that email address.',
    invalid_credentials: 'The password provided is incorrect.',
    unknown: 'An error occurred. Please try again.'
};

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            is_logging_in: false,
            error_code: false,
            creds: {
                email: localStorage.getItem('user_email'),
                password: ''
            }
        };
    },


    watch: {
        error: function error(value) {
            this.$emit('error-change', value);
        }
    },

    computed: {
        error: function error() {
            return error_messages.hasOwnProperty(this.error_code) ? error_messages[this.error_code] : null;
        }
    },

    mounted: function mounted() {

        // Focus on applicable field
        var focused_input = this.creds.email ? 'login_password' : 'login_email';
        document.getElementById(focused_input).focus();
    },


    methods: {
        submit: function submit() {
            var _this = this;

            this.clear_error();
            this.is_logging_in = true;

            __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].login(this.creds).then(function () {
                _this.$emit('login-success');
                _this.creds.password = '';
                __WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */].push({ name: 'home' });
            }).catch(function (error) {
                _this.is_logging_in = false;
                _this.set_error(error.response && error.response.data.error ? error.response.data.error : 'unknown');
            });
        },
        set_error: function set_error(code) {
            this.error_code = code || 'unknown';
        },
        clear_error: function clear_error() {
            this.error_code = false;
        }
    }

});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_modal_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_modal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_modal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_form_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__login_form_vue__);
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


var check_timer = void 0,
    interval_sec = 10,
    show_within = 60;





/* harmony default export */ __webpack_exports__["default"] = ({

    components: {
        modal: __WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_modal_vue___default.a,
        loginForm: __WEBPACK_IMPORTED_MODULE_2__login_form_vue___default.a
    },

    data: function data() {
        return {
            show_login_form: false,
            error: null
        };
    },
    created: function created() {
        this.check();
    },


    methods: {
        check: function check() {
            var sec_to_logout = __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].get_seconds_until_logout();
            console.log('sec_to_logout', sec_to_logout);

            if (sec_to_logout <= show_within) {
                this.show_login_form = true;
            } else {
                this.error = null;
                this.show_login_form = false;
                this.is_logging_in = false;
                check_timer = setTimeout(this.check, interval_sec * 1000);
            }
        },
        onErrorChange: function onErrorChange(error) {
            this.error = error;
        }
    }

});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_auth_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_auth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__layouts_auth_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_form_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__login_form_vue__);
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

    components: {
        authLayout: __WEBPACK_IMPORTED_MODULE_0__layouts_auth_vue___default.a,
        loginForm: __WEBPACK_IMPORTED_MODULE_1__login_form_vue___default.a
    },

    data: function data() {
        return {
            error: null
        };
    },


    methods: {
        onErrorChange: function onErrorChange(error) {
            this.error = error;
        }
    }

});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(2);
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    created: function created() {

        console.log('logging out');

        __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].logout();
        __WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */].push({ name: 'login' });
    }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_auth_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layouts_auth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layouts_auth_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sunday_morning_core_js_helpers_client_storage__ = __webpack_require__(22);
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






var error_messages = {
    email_invalid: 'The email address provided is not a valid email address.',
    user_not_found: 'We couldn\'t find an account with that email address.',
    unknown: 'An error occurred. Please try again.'
};

/* harmony default export */ __webpack_exports__["default"] = ({

    components: {
        authLayout: __WEBPACK_IMPORTED_MODULE_1__layouts_auth_vue___default.a
    },

    data: function data() {
        return {
            email: localStorage.getItem('user_email'),
            success: false,
            error_code: null
        };
    },


    computed: {
        error: function error() {
            return error_messages.hasOwnProperty(this.error_code) ? error_messages[this.error_code] : null;
        }
    },

    mounted: function mounted() {
        document.getElementById('login_email').focus();
    },


    methods: {
        submit: function submit() {
            var _this = this;

            this.clear_error();

            __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].send_token(this.email).then(function () {
                _this.success = true;
            }).catch(function (error) {
                _this.set_error(error.response && error.response.data.error ? error.response.data.error : 'unknown');
            });
        },
        set_error: function set_error(code) {
            this.error_code = code || 'unknown';
        },
        clear_error: function clear_error() {
            this.error_code = false;
        }
    }

});

/***/ }),
/* 14 */
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
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        error: { default: false }
    },
    computed: {
        show_error: function show_error() {
            return !!this.error;
        }
    }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sunday_morning_admin_js_components_nav_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sunday_morning_admin_js_components_nav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sunday_morning_admin_js_components_nav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_flash_message_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_flash_message_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_flash_message_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_re_login_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_re_login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__auth_re_login_vue__);
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

    components: {
        navMenu: __WEBPACK_IMPORTED_MODULE_0__sunday_morning_admin_js_components_nav_vue___default.a,
        flashMessage: __WEBPACK_IMPORTED_MODULE_1__sunday_morning_admin_js_components_flash_message_vue___default.a,
        reLogin: __WEBPACK_IMPORTED_MODULE_2__auth_re_login_vue___default.a
    },

    data: function data() {
        return {
            nav: [{ route: 'home', title: 'Dashboard' }, { route: 'projects', title: 'Projects' }, { route: 'people', title: 'People' }],
            account_nav: [{ route: 'profile', title: 'Profile' }, { route: 'settings', title: 'Settings' }, { route: 'logout', title: 'Sign Out' }]
        };
    }
});

/***/ }),
/* 16 */
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


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 17 */
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


/* harmony default export */ __webpack_exports__["default"] = ({

    watch: {
        flash: function flash(new_value) {
            if (new_value !== null) window.scrollTo(0, 0);
        }
    },

    computed: {
        flash: function flash() {
            return this.$store.state.flash_message;
        },
        flash_class: function flash_class() {
            return this.flash ? 'Flash--' + this.flash.type : '';
        }
    },

    methods: {
        close: function close() {
            this.$store.dispatch('remove_flash');
        }
    }

});

/***/ }),
/* 18 */
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
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

    props: {
        show: { required: true },
        size: { default: 'medium' }
    },

    components: {},

    data: function data() {
        return {
            is_visible: false
        };
    },


    computed: {
        klass: function klass() {
            return 'Modal--' + this.size;
        }
    },

    mounted: function mounted() {
        this.is_visible = true;
    },

    created: function created() {
        this.add_esc_closing();
    },

    beforeDestroy: function beforeDestroy() {
        this.remove_esc_closing();
        this.enable_scrolling();
    },

    methods: {
        close: function close() {
            this.is_visible = false;
        },
        escClose: function escClose(e) {
            if (e.keyCode === 27) {
                this.close();
            }
        },
        before_enter: function before_enter() {
            this.disable_scrolling();
        },
        after_leave: function after_leave() {

            this.enable_scrolling();
            this.$emit('close');
            this.is_visible = true;
        },
        enable_scrolling: function enable_scrolling() {
            document.documentElement.classList.remove('modal-open');
        },
        disable_scrolling: function disable_scrolling() {
            document.documentElement.classList.add('modal-open');
        },
        add_esc_closing: function add_esc_closing() {
            document.addEventListener('keyup', this.escClose);
        },
        remove_esc_closing: function remove_esc_closing() {
            document.removeEventListener('keyup', this.escClose);
        }
    }

});

/***/ }),
/* 19 */
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

    props: {
        nav: { required: true },
        accountNav: { default: null }
    },

    data: function data() {
        return {
            user_name: localStorage.getItem('user_name'),
            user_avatar_url: localStorage.getItem('user_avatar_url'),
            is_account_nav_visible: false
        };
    },


    watch: {
        is_account_nav_visible: function is_account_nav_visible(value) {
            if (value) return document.addEventListener('click', this.hide);
            document.removeEventListener('click', this.hide);
        }
    },

    methods: {
        toggle_nav: function toggle_nav() {
            this.$store.commit('toggle_nav');
        },
        toggle_account_nav: function toggle_account_nav() {
            this.is_account_nav_visible = !this.is_account_nav_visible;
        },
        hide: function hide() {
            this.is_account_nav_visible = false;
        }
    }

});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__route_login_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__route_login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__route_login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_logout_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route_logout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__route_logout_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route_password_forgot_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route_password_forgot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__route_password_forgot_vue__);




/* harmony default export */ __webpack_exports__["a"] = ([{
    path: '/login',
    name: 'login',
    component: __WEBPACK_IMPORTED_MODULE_0__route_login_vue___default.a
}, {
    path: '/logout',
    name: 'logout',
    component: __WEBPACK_IMPORTED_MODULE_1__route_logout_vue___default.a
}, {
    path: '/forgot-password',
    name: 'forgot_password',
    component: __WEBPACK_IMPORTED_MODULE_2__route_password_forgot_vue___default.a
}]);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


/* harmony default export */ __webpack_exports__["a"] = ({
    login: function login(creds) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/auth/login', creds);
    },
    send_token: function send_token(email) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/auth/send-token', { email: email });
    },
    token_login: function token_login(token) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/auth/token-login', { token: token });
    },
    reset_password: function reset_password(password) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/auth/reset-password', { password: password });
    },
    signup: function signup(email) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/auth/signup', { email: email });
    },
    verify: function verify(token) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/auth/verify', { token: token });
    }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Allows us to:
 *  - Commit objects and arrays to local storage without stringifying
 *  - Set expirations on local storage items
 */
/* unused harmony default export */ var _unused_webpack_default_export = ({
    get: function get(key) {

        var dt = Date.now();
        var item = localStorage.getItem(key);

        if (!item) return null;

        var data = JSON.parse(item);

        if (data.expires_at !== null && dt >= data.expires_at) {
            localStorage.removeItem(key);
            return null;
        }

        return data.value;
    },
    set: function set(key, value) {
        var seconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


        var expires_at = seconds ? Date.now() + seconds * 1000 : null;
        var data = JSON.stringify({ value: value, expires_at: expires_at });
        localStorage.setItem(key, data);
    }
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(23);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(24);

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable */
;(function() {

  'use strict'

  var opt = {
    complement: window.document.title,
    separator: '|'
  }

  var diffTitle = {}
  var els = []
  var diffEls = []
  var installed = false

  var util = {
    /**
     * Shorthand
     * @type {Object}
     */
    shorthand: {
      ch: 'charset',
      tg: 'target',
      n: 'name',
      he: 'http-equiv',
      ip: 'itemprop',
      c: 'content',
      p: 'property',
      sc: 'scheme',
      r: 'rel',
      h: 'href',
      sz: 'sizes',
      t: 'type',
      s: 'src',
      a: 'async',
      d: 'defer',
      i: 'inner'
    },

    /**
     * This function return the element <head>
     * @type {Function}
     * @return {Object}
     */
    getPlace: function (place) {
      return window.document.getElementsByTagName(place)[0]
    },

    /**
     * Undo the window.document title for previous state
     * @type {Function}
     * @param  {Object} state 
     */
    undoTitle: function (state) {
      if (!state.before) return
      window.document.title = state.before
    },

    /**
     * Undo elements to its previous state
     * @type {Function}
     */
    undo: function () {
      if (!els.length) return
      els.map(function (el) {
        el.parentElement.removeChild(el)
      })
      els = []
    },

    /**
     * Set attributes in element
     * @type {Function}
     * @param  {Object} obj
     * @param  {HTMLElement} el
     * @return {HTMLElement} with defined attributes
     */
    prepareElement: function (obj, el) {
      var self = this
      Object.keys(obj).map(function (prop) {
        var sh = self.shorthand[prop] || prop
        if (sh.match(/(body|undo|replace)/g)) return
        if (sh === 'inner') {
          el.textContent = obj[prop]
          return
        }
        el.setAttribute(sh, obj[prop])
      })
      return el
    },

    /**
     * Change window.document title
     * @type {Function}
     * @param  {Object} obj
     */
    title: function (obj) {
      if (!obj) return
      diffTitle.before = opt.complement
      var title = obj.inner + ' ' + (obj.separator || opt.separator) +
        ' ' +  (obj.complement || opt.complement)
      window.document.title = title.trim()
    },

    /**
     * Update Element
     */
    update: function () {
      if (!els.length) return
      els.forEach(function(el, key) {
        if (diffEls[key] && !diffEls[key].isEqualNode(el)) {
          el.parentElement.replaceChild(diffEls[key], els[key])
          els.splice(key, 1, diffEls[key])
          return
        }
      })
      diffEls = []
    },

    /**
     * Add Elements
     * @param {Object} obj
     * @param {HTMLElement} el
     * @param {HTMLElement} parent
     */
    add: function (obj, el, parent) {
      parent.appendChild(el)
      // Fixed elements that do not suffer removal
      if (obj.undo !== undefined && !obj.undo) return
      // Elements which are removed
      els.push(el)
    },

    /**
     * Handle of create elements
     * @type {Function}
     * @param  {Array} arr
     * @param  {String} tag   - style, link, meta, script, base
     * @param  {String} place - Default 'head'
     * @param  {Boolean} update
     */
    handle: function (arr, tag, place, update) {
      var self = this
      if (!arr) return
      arr.map(function (obj) {
        var parent = (obj.body) ? self.getPlace('body') : self.getPlace(place)
        var el = window.document.getElementById(obj.id) || window.document.createElement(tag)
        // Elements that will substitute data
        if (el.hasAttribute('id') || obj.id) {
          self.prepareElement(obj, el)
          return
        }
        // Other elements
        el = self.prepareElement(obj, el)
        // Updated elements
        if (update) {
          diffEls.push(el)
          return
        }
        // Append Elements
        self.add(obj, el, parent)
      })
    }
  }

  /**
   * Plugin | vue-head
   * @param  {Function} Vue
   * @param  {Object} options
   */
  function VueHead (Vue, options) {
    if (installed) return

    installed = true

    if (options) {
      Vue.util.extend(opt, options)
    }

    /**
     * Initializes and updates the elements in the head
     * @param  {Boolean} update
     */
    function init (update) {
      var self = this
      var head = self.$options.head
      if (!head) return
      Object.keys(head).map(function (key) {
        var prop = head[key]
        if (!prop) return
        var obj = (typeof prop === 'function') ? head[key].bind(self)() : head[key]
        if (key === 'title') {
          util[key](obj)
          return
        }
        util.handle(obj, key, 'head', update)
      })
      self.$emit('okHead')
    }

    /**
     * Remove the meta tags elements in the head
     */
    function destroy () {
      if (!this.$options.head) return
      util.undoTitle(diffTitle)
      util.undo()
    }

    // v1
    if (Vue.version.match(/[1].(.)+/g)) {
      Vue.mixin({
        ready: function () {
          init.bind(this)()
        },
        destroyed: function () {
          destroy.bind(this)()
        },
        events: {
          updateHead: function () {
            init.bind(this)(true)
            util.update()
          }
        }   
      })
    }
    // v2
    if (Vue.version.match(/[2].(.)+/g)) {
      Vue.mixin({
        created: function () {
          var self = this
          self.$on('updateHead', function () {
            init.bind(self)(true)
            util.update()
          })
        },
        mounted: function () {
          init.bind(this)()
        },
        beforeDestroy: function () {
          destroy.bind(this)()
        }
      })
    }
  }

  VueHead.version = '2.0.11'

  // auto install
  if (typeof Vue !== 'undefined') {
    Vue.use(VueHead)
  }

  if(true) {
    module.exports = VueHead
  } else if(typeof define === 'function' && define.amd) {
    define(function () { return VueHead })
  } else if (typeof window !== 'undefined') {
    window.VueHead = VueHead
  }

})()

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(36),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/auth/re-login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] re-login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13cf6726", Component.options)
  } else {
    hotAPI.reload("data-v-13cf6726", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(39),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/auth/route-login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] route-login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-257b91de", Component.options)
  } else {
    hotAPI.reload("data-v-257b91de", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(43),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/auth/route-logout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] route-logout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51f09b36", Component.options)
  } else {
    hotAPI.reload("data-v-51f09b36", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/auth/route-password-forgot.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] route-password-forgot.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e879aca", Component.options)
  } else {
    hotAPI.reload("data-v-1e879aca", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(40),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/layouts/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e0a4ddf", Component.options)
  } else {
    hotAPI.reload("data-v-3e0a4ddf", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(42),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/js/route-components/route-projects.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] route-projects.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e79f3e3", Component.options)
  } else {
    hotAPI.reload("data-v-4e79f3e3", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(44),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/sunday-morning/admin/js/components/flash-message.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] flash-message.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66e44e05", Component.options)
  } else {
    hotAPI.reload("data-v-66e44e05", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(45),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/sunday-morning/admin/js/components/modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] modal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bd8e41f0", Component.options)
  } else {
    hotAPI.reload("data-v-bd8e41f0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(37),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/broberts/websites/check.faithpromise.org/resources/assets/sunday-morning/admin/js/components/nav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] nav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d8b973e", Component.options)
  } else {
    hotAPI.reload("data-v-1d8b973e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "show": _vm.show_login_form,
      "size": "small"
    }
  }, [_c('template', {
    slot: "title"
  }, [_vm._v("Your session has ended.")]), _vm._v(" "), _c('template', {
    slot: "subtitle"
  }, [_vm._v("Enter your password to log back in.")]), _vm._v(" "), _c('template', {
    slot: "body"
  }, [_c('login-form', {
    on: {
      "error-change": _vm.onErrorChange,
      "login-success": _vm.check
    }
  }), _vm._v(" "), (_vm.error) ? _c('div', {
    staticClass: "Message Message--error"
  }, [_vm._v("\n      " + _vm._s(_vm.error) + "\n    ")]) : _vm._e()], 1)], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-13cf6726", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Nav"
  }, [_c('div', {
    staticClass: "Nav-container"
  }, [_c('div', {
    staticClass: "Nav-main"
  }, [_c('router-link', {
    staticClass: "Nav-logo",
    attrs: {
      "to": {
        name: 'home'
      }
    }
  }, [_c('svg', [_c('use', {
    attrs: {
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xlink:href": "#logo"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "Nav-toggle"
  }, [_c('div', {
    staticClass: "NavToggle",
    on: {
      "click": _vm.toggle_nav
    }
  }, _vm._l((4), function(i) {
    return _c('span')
  }))]), _vm._v(" "), _c('ul', {
    staticClass: "Nav-menu"
  }, _vm._l((_vm.nav), function(item) {
    return _c('li', {
      staticClass: "Nav-item"
    }, [_c('router-link', {
      staticClass: "Nav-link",
      attrs: {
        "to": {
          name: item.route
        }
      }
    }, [_vm._v(_vm._s(item.title))])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "Nav-user",
    class: {
      'has-menu': _vm.accountNav
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggle_account_nav($event)
      }
    }
  }, [_c('img', {
    staticClass: "Nav-avatar",
    attrs: {
      "src": _vm.user_avatar_url
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "Nav-username"
  }, [_vm._v(_vm._s(_vm.user_name))]), _vm._v(" "), _c('svg', {
    staticClass: "Nav-userToggle"
  }, [_c('use', {
    attrs: {
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xlink:href": "#chevron-thin-down"
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "Nav-account"
  }, [_c('transition', {
    attrs: {
      "name": "account-nav"
    }
  }, [_c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.accountNav && _vm.is_account_nav_visible),
      expression: "accountNav && is_account_nav_visible"
    }],
    staticClass: "AccountNav-menu"
  }, _vm._l((_vm.accountNav), function(item) {
    return _c('li', {
      staticClass: "AccountNav-item"
    }, [_c('router-link', {
      staticClass: "AccountNav-link",
      attrs: {
        "to": {
          name: item.route
        }
      },
      nativeOn: {
        "click": function($event) {
          _vm.toggle_account_nav($event)
        }
      }
    }, [_vm._v(_vm._s(item.title))])], 1)
  }))])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1d8b973e", module.exports)
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.success) ? _c('auth-layout', [_c('template', {
    slot: "title"
  }, [_vm._v("Check Your Inbox")]), _vm._v(" "), _c('template', {
    slot: "text"
  }, [_vm._v("\n      We sent an email to " + _vm._s(_vm.email) + ". This email contains a special link to reset your password. If you don't see it, please check your spam, junk, or updates folders.\n    ")])], 2) : _vm._e(), _vm._v(" "), (!_vm.success) ? _c('auth-layout', {
    attrs: {
      "error": _vm.error
    }
  }, [(!_vm.error) ? _c('template', {
    slot: "title"
  }, [_vm._v("Password Reset")]) : _vm._e(), _vm._v(" "), (!_vm.error) ? _c('template', {
    slot: "text"
  }, [_vm._v("Enter your email address and we'll email you a special link to reset your password.")]) : _vm._e(), _vm._v(" "), _c('form', {
    staticClass: "AuthForm",
    attrs: {
      "action": "#",
      "method": "post"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.submit($event)
      }
    }
  }, [_c('div', {
    staticClass: "Field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    staticClass: "Control",
    attrs: {
      "id": "login_email",
      "type": "email",
      "name": "email",
      "placeholder": "you@youremailaddress.com",
      "required": ""
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "keyup": _vm.clear_error,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "Field"
  }, [_c('button', {
    staticClass: "Button Button--primary",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Continue")]), _vm._v(" "), _c('router-link', {
    staticClass: "Button Button--link",
    attrs: {
      "to": {
        name: 'login'
      }
    }
  }, [_vm._v("Back to Login")])], 1)])], 2) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1e879aca", module.exports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('auth-layout', {
    attrs: {
      "error": _vm.error
    }
  }, [_c('template', {
    slot: "title"
  }, [_vm._v("Sign In")]), _vm._v(" "), _c('template', {
    slot: "text"
  }, [_vm._v("\n    Welcome back! If you have trouble signing in, please try "), _c('span', [_c('router-link', {
    staticClass: "nowrap",
    attrs: {
      "to": {
        name: 'forgot_password'
      }
    }
  }, [_vm._v("resetting your password")]), _vm._v(".")], 1)]), _vm._v(" "), _c('login-form', {
    on: {
      "error-change": _vm.onErrorChange
    }
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-257b91de", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('nav-menu', {
    attrs: {
      "nav": _vm.nav,
      "account-nav": _vm.account_nav
    }
  }), _vm._v(" "), _c('flash-message'), _vm._v(" "), _c('router-view'), _vm._v(" "), _c('re-login')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e0a4ddf", module.exports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "AuthForm",
    attrs: {
      "action": "#",
      "method": "post"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.submit($event)
      }
    }
  }, [_c('div', {
    staticClass: "Field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.creds.email),
      expression: "creds.email"
    }],
    staticClass: "Control",
    attrs: {
      "id": "login_email",
      "type": "email",
      "name": "email",
      "placeholder": "email",
      "required": ""
    },
    domProps: {
      "value": (_vm.creds.email)
    },
    on: {
      "keyup": _vm.clear_error,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.creds.email = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "Field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.creds.password),
      expression: "creds.password"
    }],
    staticClass: "Control",
    attrs: {
      "id": "login_password",
      "type": "password",
      "name": "password",
      "placeholder": "password",
      "required": ""
    },
    domProps: {
      "value": (_vm.creds.password)
    },
    on: {
      "keyup": _vm.clear_error,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.creds.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "Field"
  }, [_c('button', {
    staticClass: "Button Button--primary",
    attrs: {
      "type": "submit",
      "disabled": _vm.is_logging_in
    }
  }, [_vm._v(_vm._s(_vm.is_logging_in ? 'Logging in...' : 'Login'))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-47f1f83f", module.exports)
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "Content"
  }, [_c('div', {
    staticClass: "Content-header"
  }, [_c('button', {
    staticClass: "Button",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("Group By")])]), _vm._v(" "), _c('div', {
    staticClass: "Content-container"
  }, [_c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")]), _vm._v(" "), _c('p', [_vm._v("Lorm ipsum means that its really importent for you to stay off drugs and stay in scool. You need to no things that will help you in life. Like MATHS and gym. You don't want to be dum.")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e79f3e3", module.exports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div')
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-51f09b36", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.flash) ? _c('div', {
    staticClass: "Flash",
    class: _vm.flash_class
  }, [_c('div', {
    staticClass: "Flash-container"
  }, [_c('div', {
    staticClass: "Flash-message"
  }, [_vm._v("\n      " + _vm._s(_vm.flash.message) + "\n    ")]), _vm._v(" "), _c('span', {
    staticClass: "Flash-close",
    on: {
      "click": _vm.close
    }
  })])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-66e44e05", module.exports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "modal"
    },
    on: {
      "after-leave": _vm.after_leave,
      "before-enter": _vm.before_enter
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show && _vm.is_visible),
      expression: "show && is_visible"
    }],
    staticClass: "Modal-backdrop",
    on: {
      "click": function($event) {
        if ($event.target !== $event.currentTarget) { return null; }
        _vm.close($event)
      }
    }
  }, [_c('div', {
    staticClass: "Modal",
    class: _vm.klass
  }, [_c('div', {
    staticClass: "Modal-close",
    on: {
      "click": _vm.close
    }
  }, [_c('svg', [_c('use', {
    attrs: {
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xlink:href": "#modal-close"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "Modal-header"
  }, [_vm._t("title")], 2), _vm._v(" "), _c('div', {
    staticClass: "Modal-body"
  }, [_vm._t("body")], 2), _vm._v(" "), _c('div', {
    staticClass: "Modal-footer"
  }, [_vm._t("footer")], 2)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bd8e41f0", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Auth"
  }, [_c('div', {
    staticClass: "Auth-message"
  }, [_c('transition', {
    attrs: {
      "name": "message"
    }
  }, [_c('svg', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.show_error),
      expression: "!show_error"
    }],
    staticClass: "Auth-logo"
  }, [_c('use', {
    attrs: {
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xlink:href": "#logo"
    }
  })])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "message"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show_error),
      expression: "show_error"
    }],
    staticClass: "Auth-error"
  }, [_vm._v(_vm._s(_vm.error))])])], 1), _vm._v(" "), _c('div', {
    staticClass: "Auth-screen"
  }, [_c('div', {
    staticClass: "Auth-title"
  }, [_vm._t("title")], 2), _vm._v(" "), _c('div', {
    staticClass: "Auth-text"
  }, [_vm._t("text")], 2), _vm._v(" "), _vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d82cd364", module.exports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = Vuex;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ })
/******/ ]);