import { useState } from "react";
import { useLSWifiConnectionStore } from "~/store/ls-wifi-connection-store";
import { NativeModules, ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import translate from "~/services/localization/i18n";

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

  const { NIRDeviceConnected, setNIRDeviceConnected } =
    useLSWifiConnectionStore();

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const state = await NetInfo.fetch("wifi");
      if (state.type === "wifi" && state.isConnected) {
        const wifiName = state.details.ssid || null;
        const isLSWiFi = wifiName?.startsWith("LS") || false;
        if (wifiName && isLSWiFi) {
          await LinkSquareModule.initialize();
          await LinkSquareModule.connect("192.168.1.1", 18630);
        } else {
          ToastAndroid.show(
            translate.t("alerts.not_ls_wifi"),
            ToastAndroid.LONG
          );
        }
      } else {
        ToastAndroid.show(translate.t("alerts.not_ls_wifi"), ToastAndroid.LONG);
      }
    } catch (error: any) {
      setNIRDeviceConnected(false);
    }
    setIsConnecting(false);
  };

  return {
    isConnecting,
    NIRDeviceConnected,
    setNIRDeviceConnected,
    handleConnect,
  };
};

export default useConnectNIR;
