import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux"; // Use direct import
import { store } from "@/store";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
