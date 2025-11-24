import * as React from "react";
import type {
  NavigationContainerRef,
  ParamListBase,
} from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
