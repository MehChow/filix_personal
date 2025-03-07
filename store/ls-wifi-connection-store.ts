import { create } from "zustand";

interface LSWifiConnectionState {
  isConnected: boolean;
  NIRDeviceConnected: boolean;
  isLoading: boolean;
  error: string | null;
  setIsConnected: (data: boolean) => void;
  setNIRDeviceConnected: (data: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
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
    NIRDeviceConnected: false,
    isLoading: false,
    error: null,
    setIsConnected: (data: boolean) => set({ isConnected: data }),
    setNIRDeviceConnected: (data: boolean) => set({ NIRDeviceConnected: data }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: string | null) => set({ error }),
  })
);
