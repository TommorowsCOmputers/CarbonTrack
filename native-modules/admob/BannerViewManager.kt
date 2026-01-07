package com.javenly.carbontracker.app.ads

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.common.MapBuilder

class BannerViewManager : SimpleViewManager<BannerView>() {

    override fun getName(): String = "RNBannerView"

    override fun createViewInstance(reactContext: ThemedReactContext): BannerView {
        return BannerView(reactContext)
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        val builder = MapBuilder.builder<String, Any>()
        builder.put("onNativeEvent", MapBuilder.of("registrationName", "onNativeEvent"))
        return builder.build()
    }

    @ReactProp(name = "adUnitId")
    fun setAdUnitId(view: BannerView, adUnitId: String?) {
        view.setAdUnitId(adUnitId)
    }
}
