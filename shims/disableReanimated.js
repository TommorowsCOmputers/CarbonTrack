// shim to aggressively neutralize react-native-reanimated when global.__DISABLE_REANIMATED is true
try {
  // eslint-disable-next-line no-undef
  if ((global && (global.__DISABLE_REANIMATED === true))) {
    // require directly so we patch the same module instance other modules import
    const Reanimated = require('react-native-reanimated');
    const RN = require('react-native');

    // safe no-op implementations
    const noopSharedValue = (init) => ({ value: init });
    const noopAnimatedStyle = () => ({});
    const noopDerivedValue = () => ({ value: 0 });
    const identity = (v) => v;
    const passthroughDelay = (delay, anim) => anim;
    const passthroughCreate = (Comp) => Comp;

    try {
      Reanimated.useSharedValue = Reanimated.useSharedValue || noopSharedValue;
      Reanimated.useAnimatedStyle = Reanimated.useAnimatedStyle || noopAnimatedStyle;
      Reanimated.useAnimatedProps = Reanimated.useAnimatedProps || noopAnimatedStyle;
      Reanimated.useAnimatedRef = Reanimated.useAnimatedRef || noopSharedValue;
      Reanimated.useDerivedValue = Reanimated.useDerivedValue || noopDerivedValue;
      Reanimated.withSpring = Reanimated.withSpring || identity;
      Reanimated.withTiming = Reanimated.withTiming || identity;
      Reanimated.withDelay = Reanimated.withDelay || passthroughDelay;
      Reanimated.withSequence = Reanimated.withSequence || identity;
      Reanimated.withRepeat = Reanimated.withRepeat || identity;
      Reanimated.createAnimatedComponent = Reanimated.createAnimatedComponent || passthroughCreate;
      Reanimated.enableLayoutAnimations = Reanimated.enableLayoutAnimations || (() => {});

      // Map common Animated components to their native counterparts
      Reanimated.Animated = Reanimated.Animated || {};
      Reanimated.Animated.View = RN.View;
      Reanimated.Animated.ScrollView = RN.ScrollView;
      Reanimated.Animated.FlatList = RN.FlatList;
      Reanimated.Animated.Image = RN.Image;
      Reanimated.Animated.Text = RN.Text;

      // Defensive: no-op native-facing update hooks to reduce risk of
      // IllegalViewOperationExceptions when native scheduler tries to update
      // props for tags that may have been unmounted.
      try {
        if (Reanimated.NativeReanimated) {
          Reanimated.NativeReanimated.updateProps = Reanimated.NativeReanimated.updateProps || function() {};
          Reanimated.NativeReanimated.installTurboModule = Reanimated.NativeReanimated.installTurboModule || function() {};
        }

        if (Reanimated.NativeProxyCommon) {
          Reanimated.NativeProxyCommon.updateProps = Reanimated.NativeProxyCommon.updateProps || function() {};
        }
      } catch (err) {
        console.warn('[shim] failed to patch native update hooks', err);
      }

      // Additionally, ensure the global native module proxy used by Reanimated
      // is present and provides no-op implementations for methods that can
      // schedule native UI updates. This helps intercept calls that may come
      // from compiled worklets or native scheduler cycles.
      try {
        // eslint-disable-next-line no-undef
        if (typeof global !== 'undefined') {
          global.__reanimatedModuleProxy = global.__reanimatedModuleProxy || {};
          const proxy = global.__reanimatedModuleProxy;

          proxy.installTurboModule = proxy.installTurboModule || function() {};
          proxy.makeShareableClone = proxy.makeShareableClone || function(v) { return v; };
          proxy.makeSynchronizedDataHolder = proxy.makeSynchronizedDataHolder || function(v) { return v; };
          proxy.getDataSynchronously = proxy.getDataSynchronously || function() { return null; };
          proxy.updateProps = proxy.updateProps || function() {};
          proxy.registerEventHandler = proxy.registerEventHandler || function() {};
          proxy.installUIImplementation = proxy.installUIImplementation || function() {};
        }
      } catch (err) {
        console.warn('[shim] failed to patch global.__reanimatedModuleProxy', err);
      }

      // Some code expects default export to be the Animated object
      if (!Reanimated.default) Reanimated.default = Reanimated;

      console.warn('[shim] react-native-reanimated disabled by shim');
    } catch (err) {
      console.warn('[shim] failed to patch react-native-reanimated', err);
    }
  }
} catch (e) {
  // ignore if globals unavailable
}
