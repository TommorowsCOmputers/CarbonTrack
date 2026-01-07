// Minimal no-op shim for react-native-reanimated used only for Metro aliasing during debugging.
// Exports both named and default exports and maps Animated.* to plain React Native components.
const RN = require('react-native');

const noopSharedValue = (init) => ({ value: init });
const noopAnimatedStyle = () => ({});
const noopDerived = (v) => ({ value: v });
const identity = (v) => v;
const passthroughDelay = (delay, anim) => anim;
const passthroughCreate = (Comp) => Comp;

const FadeIn = { duration: (d) => ({ type: 'fadeIn', duration: d }) };
const FadeOut = { duration: (d) => ({ type: 'fadeOut', duration: d }) };

const Easing = {
  bezier: () => (v) => v,
  linear: (v) => v,
};

function createAnimatedComponent(Comp) {
  return Comp;
}

const mock = {
  // shared primitives
  useSharedValue: noopSharedValue,
  useAnimatedStyle: noopAnimatedStyle,
  useDerivedValue: noopDerived,
  useAnimatedProps: noopAnimatedStyle,
  useAnimatedRef: () => null,
  useAnimatedReaction: () => undefined,
  useAnimatedScrollHandler: () => undefined,
  useScrollViewOffset: () => undefined,
  useEvent: () => undefined,
  useFrameCallback: () => undefined,

  // animation combinators
  withTiming: identity,
  withSpring: identity,
  withDelay: passthroughDelay,
  withSequence: identity,
  withRepeat: identity,
  withDecay: identity,
  Easing,

  // helpers
  createAnimatedComponent,
  Animated: {
    View: RN.View,
    Text: RN.Text,
    Image: RN.Image,
    FlatList: RN.FlatList,
    ScrollView: RN.ScrollView,
  },

  // entering/exiting helpers used by some code
  FadeIn,
  FadeOut,

  // layout animations noop
  enableLayoutAnimations: () => {},
};

// Provide default export as well
mock.default = mock;
mock.Animated = mock.Animated || mock;

module.exports = mock;
