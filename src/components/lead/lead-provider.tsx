"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LeadIntent = "choice" | "sell" | "offer";

type LeadContextValue = {
  open: boolean;
  intent: LeadIntent;
  estimatedValue?: number;
  openLeadCapture: (options?: {
    intent?: LeadIntent;
    estimatedValue?: number;
  }) => void;
  closeLeadCapture: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<LeadIntent>("choice");
  const [estimatedValue, setEstimatedValue] = useState<number | undefined>();

  const openLeadCapture = useCallback(
    (options?: { intent?: LeadIntent; estimatedValue?: number }) => {
      setIntent(options?.intent ?? "choice");
      setEstimatedValue(options?.estimatedValue);
      setOpen(true);
    },
    []
  );

  const closeLeadCapture = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      intent,
      estimatedValue,
      openLeadCapture,
      closeLeadCapture,
    }),
    [open, intent, estimatedValue, openLeadCapture, closeLeadCapture]
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeadCapture() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeadCapture must be used within LeadProvider");
  }
  return context;
}
