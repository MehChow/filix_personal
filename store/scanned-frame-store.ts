import { create } from "zustand";

interface ScannedFrameState {
  pixel_array: number[];
  setScannedFrameData: (data: number[]) => void;
  clearScannedFrameData: () => void;
}

export const useScannedFrameStore = create<ScannedFrameState>()((set) => ({
  pixel_array: [],
  setScannedFrameData: (data) => set({ pixel_array: data }),
  clearScannedFrameData: () => set({ pixel_array: [] }),
}));
