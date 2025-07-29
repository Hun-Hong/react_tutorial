import React, { createContext, useReducer } from "react";
import type { MemoState, MemoAction } from "./MemoTypes";

export const MemoContext = createContext<MemoState | null>(null)
export const UserDispatchContext = createContext<React.Dispatch<MemoAction> | null>(null)

