import React, { useContext, createContext } from "react";
import { darkTheme } from "@coral-xyz/themes";

type AnchorContext = {
  navigation: Navigation;
  theme: Theme;
};
const _AnchorContext = createContext<AnchorContext | null>(null);
type Theme = any;

export const NAV_STACK: any = [];

export function AnchorProvider(props: any) {
  const navigation = {
    push: (reactNode: any) => {
      //
      // Push onto the stack to position for the next rerender.
      //
      NAV_STACK.push(reactNode);

      //
      // Tell the host to push and rerender.
      //
      window.anchorUi.navigationPush();
    },
    pop: () => {
      //
      // Pop off the stack to position for the next rerender.
      //
      NAV_STACK.pop();

      //
      // Tell the host to pop and rerender.
      //
      window.anchorUi.navigationPop();
    },
  };
  return (
    <_AnchorContext.Provider
      value={{
        navigation,
        theme: darkTheme,
      }}
    >
      {props.children}
    </_AnchorContext.Provider>
  );
}

function useAnchorContext() {
  const ctx = useContext(_AnchorContext);
  if (ctx === null) {
    throw new Error("Context not available");
  }
  return ctx;
}

export function useNavigation() {
  const { navigation } = useAnchorContext();
  return navigation;
}

export function useTheme() {
  const { theme } = useAnchorContext();
  return theme;
}

type Navigation = any;