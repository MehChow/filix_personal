import { create } from "zustand";

interface LSWifiConnectionState {
  isConnected: boolean;
  setIsConnected: (data: boolean) => void;
}

/**
 * A Zustand store that stores the LS Wifi connection status
 *
 * @description
 * This store is used for tracking whether the device is connected to the LS WiFi network.
 * When the device is connected to the LS WiFi network, the store will be set to true.
 * It prevents reinitializing the LinkSquare module when the device is already connected
 * to the LS WiFi network after going back to the home screen from the result screen.
 */
export const useLSWifiConnectionStore = create<LSWifiConnectionState>()(
  (set) => ({
    isConnected: false,
    setIsConnected: (data: boolean) => set({ isConnected: data }),
  })
);
