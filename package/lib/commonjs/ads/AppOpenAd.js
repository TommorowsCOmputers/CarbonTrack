"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppOpenAd = void 0;
var _common = require("../common");
var _MobileAds = require("../MobileAds");
var _validateAdRequestOptions = require("../validateAdRequestOptions");
var _MobileAd = require("./MobileAd");
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
class AppOpenAd extends _MobileAd.MobileAd {
  static createForAdRequest(adUnitId, requestOptions) {
    if (!(0, _common.isString)(adUnitId)) {
      throw new Error("AppOpenAd.createForAdRequest(*) 'adUnitId' expected an string value.");
    }
    let options = {};
    try {
      options = (0, _validateAdRequestOptions.validateAdRequestOptions)(requestOptions);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`AppOpenAd.createForAdRequest(_, *) ${e.message}.`);
      }
    }
    const requestId = AppOpenAd._appOpenRequest++;
    return new AppOpenAd('app_open', (0, _MobileAds.MobileAds)(), requestId, adUnitId, options);
  }
  addAdEventsListener(listener) {
    return this._addAdEventsListener(listener);
  }
  addAdEventListener(type, listener) {
    return this._addAdEventListener(type, listener);
  }
}
exports.AppOpenAd = AppOpenAd;
_defineProperty(AppOpenAd, "_appOpenRequest", 0);
//# sourceMappingURL=AppOpenAd.js.map