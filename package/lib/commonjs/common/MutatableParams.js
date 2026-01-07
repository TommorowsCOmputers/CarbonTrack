"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MutatableParams = void 0;
var _deeps = require("./deeps");
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
class MutatableParams {
  constructor(parentInstance) {
    _defineProperty(this, "_mutatableParams", void 0);
    _defineProperty(this, "_parentInstance", void 0);
    if (parentInstance) {
      this._mutatableParams = parentInstance._mutatableParams;
      this._parentInstance = parentInstance;
    } else {
      this._mutatableParams = {};
      this._parentInstance = this;
    }
  }
  set(param, value) {
    (0, _deeps.deepSet)(this._mutatableParams, param, value);
    return this._parentInstance;
  }
  get(param) {
    return (0, _deeps.deepGet)(this._mutatableParams, param, '.');
  }
  toJSON() {
    return Object.assign({}, this._mutatableParams);
  }
  validate() {
    // do nothing
  }
}
exports.MutatableParams = MutatableParams;
//# sourceMappingURL=MutatableParams.js.map