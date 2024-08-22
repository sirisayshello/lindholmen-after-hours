"use client";

import { ReactNode } from "react";
import { GameProvider } from "./hooks/useGame";

export function Providers({ children }: { children: ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
