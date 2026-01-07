"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceBase = void 0;
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

class ReferenceBase {
  constructor(_path) {
    _defineProperty(this, "path", void 0);
    let path = _path;
    if (path) {
      path = path.length > 1 && path.endsWith('/') ? path.substring(0, path.length - 1) : path;
      if (path.startsWith('/') && path.length > 1) {
        path = path.substring(1, path.length);
      }
    } else {
      path = '/';
    }
    this.path = path;
  }

  /**
   * The last part of a Reference's path (after the last '/')
   * The key of a root Reference is null.
   * @type {String}
   * {@link https://firebase.google.com/docs/reference/js/firebase.database.Reference#key}
   */
  get key() {
    return this.path === '/' ? null : this.path.substring(this.path.lastIndexOf('/') + 1);
  }
}
exports.ReferenceBase = ReferenceBase;
//# sourceMappingURL=ReferenceBase.js.map