// Set global flag to disable Reanimated worklets/animations early
// This shim will be loaded before the app to prevent Reanimated
// from creating native update callbacks that race with mount/unmount.
// WARNING: this disables animations globally — restore if you prefer selective fixes.
// eslint-disable-next-line no-undef
global.__DISABLE_REANIMATED = true;
import "./shims/disableReanimated";

import { registerRootComponent } from "expo";

import App from "@/App";

registerRootComponent(App);
