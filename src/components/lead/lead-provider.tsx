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

type LeadCaptureOptions = {
  intent?: LeadIntent;
  estimatedValue?: number;
  source?: string;
};

type LeadContextValue = {
  open: boolean;
  intent: LeadIntent;
  estimatedValue?: number;
  source?: string;
  openLeadCapture: (options?: LeadCaptureOptions) => void;
  closeLeadCapture: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<LeadIntent>("choice");
  const [estimatedValue, setEstimatedValue] = useState<number | undefined>();
  const [source, setSource] = useState<string | undefined>();

  const openLeadCapture = useCallback((options?: LeadCaptureOptions) => {
    setIntent(options?.intent ?? "choice");
    setEstimatedValue(options?.estimatedValue);
    if (options?.source) setSource(options.source);
    setOpen(true);
  }, []);

  const closeLeadCapture = useCallback(() => {
    setOpen(false);
    setSource(undefined);
  }, []);

  const value = useMemo(
    () => ({
      open,
      intent,
      estimatedValue,
      source,
      openLeadCapture,
      closeLeadCapture,
    }),
    [open, intent, estimatedValue, source, openLeadCapture, closeLeadCapture]
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
