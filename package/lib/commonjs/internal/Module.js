"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppModule = void 0;
var _nativeModule = require("./registry/nativeModule");
var _SharedEventEmitter = require("./SharedEventEmitter");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
class AppModule {
  constructor(app, config) {
    _defineProperty(this, "_app", void 0);
    _defineProperty(this, "_nativeModule", void 0);
    _defineProperty(this, "_config", void 0);
    this._app = app;
    this._nativeModule = null;
    this._config = Object.assign({}, config);
  }
  get app() {
    return this._app;
  }
  get emitter() {
    return _SharedEventEmitter.SharedEventEmitter;
  }
  eventNameForApp(...args) {
    return `${this.app.name}-${args.join('-')}`;
  }
  get native() {
    if (this._nativeModule) {
      return this._nativeModule;
    }
    this._nativeModule = (0, _nativeModule.getNativeModule)(this);
    return this._nativeModule;
  }
}

// Instance of checks don't work once compiled
exports.AppModule = AppModule;
_defineProperty(AppModule, "__extended__", {});
AppModule.__extended__ = {};
//# sourceMappingURL=Module.js.map