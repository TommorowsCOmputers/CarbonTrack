package com.javenly.carbontracker.app.ads

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView

class BannerView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private var adView: AdView? = null
    private var adUnitId: String? = null   // must be var

    init {
        createAdViewIfNeeded()
    }

    private fun createAdViewIfNeeded() {
        if (adView == null) {
            adView = AdView(context).apply {
                setAdSize(AdSize.BANNER)
                adListener = object : com.google.android.gms.ads.AdListener() {
                    override fun onAdLoaded() {
                        Log.i("BannerView", "Ad loaded for unit=${adUnitId}")
                        val payload: WritableMap = Arguments.createMap()
                        try {
                            val adSize = this@BannerView.adView?.adSize
                            if (adSize != null) {
                                payload.putDouble("width", adSize.getWidth().toDouble())
                                payload.putDouble("height", adSize.getHeight().toDouble())
                            }
                        } catch (e: Exception) {
                        }
                        sendEvent("onAdLoaded", payload)
                    }

                    override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                        Log.e("BannerView", "Ad failed to load for unit=${adUnitId} code=${loadAdError.code} msg=${loadAdError.message}")
                        val payload: WritableMap = Arguments.createMap()
                        try {
                            payload.putInt("code", loadAdError.code)
                            payload.putString("message", loadAdError.message)
                        } catch (e: Exception) {
                        }
                        sendEvent("onAdFailedToLoad", payload)
                    }
                }
            }
            addView(
                adView,
                LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
            )
        }
    }

    private fun sendEvent(type: String, payload: WritableMap?) {
        val event = Arguments.createMap()
        event.putString("type", type)
        if (payload != null) {
            try {
                event.merge(payload)
            } catch (e: Exception) {
            }
        }

        if (context is ThemedReactContext) {
            val themed = context as ThemedReactContext
            themed.getJSModule(RCTEventEmitter::class.java).receiveEvent(this.id, "onNativeEvent", event)
        }
    }

    fun setAdUnitId(id: String?) {
        if (id.isNullOrBlank() || id == adUnitId) return

        adUnitId = id
        createAdViewIfNeeded()

        adUnitId?.let { safeId ->   // ✅ safe cast
            adView?.let { view ->
                view.adUnitId = safeId
                val adRequest = AdRequest.Builder().build()
                view.loadAd(adRequest)
            }
        }
    }

    override fun onDetachedFromWindow() {
        adView?.destroy()
        super.onDetachedFromWindow()
    }
}
