import { createContext, useContext } from "react";

export const SectorRecordsContext = createContext(null);

export function useSectorRecords() {
  const value = useContext(SectorRecordsContext);
  if (!value) {
    throw new Error("useSectorRecords must be used within SectorPageLayout");
  }
  return value;
}
