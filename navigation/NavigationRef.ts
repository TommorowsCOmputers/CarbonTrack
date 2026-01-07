import * as React from "react";
import { CommonActions } from "@react-navigation/native";
import type {
  NavigationContainerRef,
  ParamListBase,
} from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>();

export function navigateToSurvey() {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: "Survey",
      params: { step: 1 },
    })
  );
}
