"use client";
import React, {
  ReactNode,
  useReducer,
  useMemo,
  useContext,
  createContext,
  Dispatch,
} from "react";

export type StateType = {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
};

export type ActionType =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: string }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

type ContextType = [StateType, React.Dispatch<ActionType>];

const MaterialTailwind = createContext<ContextType | null>(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

type MaterialTailwindControllerProviderProps = {
  children: ReactNode;
};

export function MaterialTailwindControllerProvider({
  children,
}: MaterialTailwindControllerProviderProps) {
  const initialState: StateType = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value: ContextType = useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController(): ContextType {
  const context = useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController must be used within a MaterialTailwindControllerProvider."
    );
  }

  return context;
}

export const setOpenSidenav = (
  dispatch: Dispatch<ActionType>,
  value: boolean
) => dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch: Dispatch<ActionType>, value: string) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (
  dispatch: Dispatch<ActionType>,
  value: string
) => dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (
  dispatch: Dispatch<ActionType>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (
  dispatch: Dispatch<ActionType>,
  value: boolean
) => dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (
  dispatch: Dispatch<ActionType>,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });
