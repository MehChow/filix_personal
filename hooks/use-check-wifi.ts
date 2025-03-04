import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useLSWifiConnectionStore } from "~/store/ls-wifi-connection-store";
import { NativeModules } from "react-native";

/**
 * A custom hook to check if the device is connected to a WiFi network with a specific prefix.
 * In this filix app, it is used to check if the device is connected to the LS WiFi network.
 *
 * @param {string} prefix - The prefix of the WiFi network name to check for.
 *
 * @example
 * // Check if connected to a WiFi network starting with "LS"
 * useCheckWifi("LS");
 *
 * @description
 * This hook uses NetInfo to periodically check the current WiFi connection.
 * It sets up an interval that checks the WiFi network name every 2 seconds.
 * The interval is automatically cleared when the component unmounts.
 *
 * Then, if the LS WiFi network is detected, and it is not already connected,
 * the LinkSquareModule is initialized and the LS WiFi connection status is set to true.
 */
const useCheckWifi = (prefix: string) => {
  const { LinkSquareModule } = NativeModules;

  const [detectedLSWifFi, setDetectedLSWiFi] = useState(false);
  const { isConnected, setIsConnected } = useLSWifiConnectionStore();

  // Detect LS WiFi with 2 seconds interval
  useEffect(() => {
    const loadWifiName = async () => {
      const state = await NetInfo.fetch();
      // console.log("Current connected wifi: ", state.details?.ssid);
      if (state.details?.ssid?.startsWith(prefix)) {
        setDetectedLSWiFi(true);
        // Clear the interval if LSWiFi is found and connected
        clearInterval(intervalId);
      }
    };

    loadWifiName();

    const intervalId = setInterval(loadWifiName, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Connect to LS WiFi and initialize LinkSquareModule
  useEffect(() => {
    if (detectedLSWifFi && !isConnected) {
      // console.log(
      //   "Connected to LS WiFi!! Now try to connect the NIR device..."
      // );
      LinkSquareModule.initialize();
      LinkSquareModule.connect("192.168.1.1", 18630);
      setIsConnected(true);
    }
  }, [detectedLSWifFi, isConnected]);
};

export default useCheckWifi;
