import * as React from "react";
import type {
  NavigationContainerRef,
  ParamListBase,
} from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export function resetAndNavigateToSurvey() {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: "Welcome" }],
  });
}
