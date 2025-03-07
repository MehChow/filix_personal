import { useEffect, useState } from "react";
import { useLSWifiConnectionStore } from "~/store/ls-wifi-connection-store";
import { NativeModules } from "react-native";

/**
 * A custom hook to handle the NIR device connection, based on the LS WiFi connection status.
 *
 * @description
 * This hook uses the LS WiFi connection status to initialize the LinkSquareModule and connect to the NIR device.
 * If the LS WiFi network is connected, and the NIR device is not already connected,
 * the LinkSquareModule is initialized and the NIR device connection status is set to true.
 */
const useConnectNIR = () => {
  const { LinkSquareModule } = NativeModules;

  const { isConnected, NIRDeviceConnected, setNIRDeviceConnected } =
    useLSWifiConnectionStore();

  // Initialize LinkSquareModule and connect to NIR device
  useEffect(() => {
    if (isConnected && !NIRDeviceConnected) {
      LinkSquareModule.initialize();
      LinkSquareModule.connect("192.168.1.1", 18630);
      setNIRDeviceConnected(true);
    }
  }, [isConnected, NIRDeviceConnected]);

  return { NIRDeviceConnected };
};

export default useConnectNIR;
