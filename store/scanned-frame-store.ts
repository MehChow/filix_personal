import { create } from "zustand";

interface ScannedFrameState {
  pixel_array: number[];
  setScannedFrameData: (data: number[]) => void;
  clearScannedFrameData: () => void;
}

/**
 * A Zustand store that stores the scanned frame data
 *
 * @description
 * This store is used for storing the scanned frame data from the NIR device.
 * The data is an array of numbers representing the pixel values of the scanned frame.
 * When the user click the back home button, the data should be cleared by calling the `clearScannedFrameData` function.
 */
export const useScannedFrameStore = create<ScannedFrameState>()((set) => ({
  pixel_array: [],
  setScannedFrameData: (data) => set({ pixel_array: data }),
  clearScannedFrameData: () => set({ pixel_array: [] }),
}));
