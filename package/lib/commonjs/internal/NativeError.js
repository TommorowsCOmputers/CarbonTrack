"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeError = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
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

class NativeError extends Error {
  static fromEvent(errorEvent, namespace, stack) {
    return new NativeError({
      userInfo: errorEvent
    }, stack || new Error().stack || '', namespace);
  }
  constructor(nativeError, jsStack, namespace) {
    super();
    _defineProperty(this, "namespace", void 0);
    _defineProperty(this, "code", void 0);
    _defineProperty(this, "message", void 0);
    _defineProperty(this, "jsStack", void 0);
    _defineProperty(this, "userInfo", void 0);
    const {
      userInfo
    } = nativeError;
    this.namespace = namespace;
    this.code = `${this.namespace}/${userInfo.code || 'unknown'}`;
    this.message = `[${this.code}] ${userInfo.message}`;
    this.jsStack = jsStack;
    this.userInfo = userInfo;
    this.stack = NativeError.getStackWithMessage(`NativeError: ${this.message}`, this.jsStack);
  }

  /**
   * Build a stack trace that includes JS stack prior to calling the native method.
   *
   * @returns {string}
   */
  static getStackWithMessage(message, jsStack) {
    return [message, ...jsStack.split('\n').slice(2, 13)].join('\n');
  }
}
exports.NativeError = NativeError;
//# sourceMappingURL=NativeError.js.map