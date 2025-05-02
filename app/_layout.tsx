import { Slot } from "expo-router";
import {
  ImageBackground,
  StatusBar,
  View,
  NativeEventEmitter,
  ToastAndroid,
  NativeModules,
} from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import "~/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppState } from "react-native";
import { useEffect, useRef } from "react";
import { useScannedFrameStore } from "~/store/scanned-frame-store";
import initializeNetworkListener from "~/services/network-listener";
import { LanguageProvider } from "~/context/language-context";

import translate from "~/services/localization/i18n";

import NetInfo, { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
import { useLSWifiConnectionStore } from "~/store/ls-wifi-connection-store";
import useConnectNIR from "~/hooks/use-connect-nir";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const eventEmitter = new NativeEventEmitter();

  const { LinkSquareModule } = NativeModules;

  const appState = useRef(AppState.currentState);
  const {
    setIsConnected,
    setError,
    setLoading,
    isConnected,
    NIRDeviceConnected,
    setNIRDeviceConnected,
  } = useLSWifiConnectionStore.getState();

  NetInfo.fetch().then((netInfoState) => {
    console.log("FIRST", netInfoState);
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      console.log("AppState", appState.current);
      if (appState.current === "active") {
        NetInfo.fetch("wifi").then((netInfoState) => {
          console.log("I FETCH AGAIN WHEN ACTIVE!!!", netInfoState);
          try {
            setLoading(true);
            if (netInfoState.type === "wifi" && netInfoState.isConnected) {
              const wifiName = netInfoState.details?.ssid || null;
              console.log(wifiName);
              const isLSNetwork = wifiName?.startsWith("LS") || false;
              setIsConnected(isLSNetwork);
            } else {
              setIsConnected(false);
            }
          } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Unknown network error");
          } finally {
            setLoading(false);
          }
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const { setScannedFrameData } = useScannedFrameStore();

  // Initialize LS Wifi network listener, keep tracking the LS WiFi connection status
  // useEffect(() => {
  //   console.log(process.env.EXPO_PUBLIC_BASEURL);
  //   const cleanup = initializeNetworkListener();
  //   return cleanup;
  // }, []);

  // Subscribe to events emitted from the native module
  useEffect(() => {
    const connectionEventListener = eventEmitter.addListener("CONNECTED", (message) => {
      console.log("Connection Successful:", message);
    });

    const onScanCompleteEventListener = eventEmitter.addListener("onScanComplete", (frames) => {
      console.log("Scanned Frames (raw_data list): ", frames);
      if (frames.raw_data.length === 600) {
        ToastAndroid.show(translate.t("alerts.scanned_successfully"), ToastAndroid.LONG);
      }
      setScannedFrameData(frames.raw_data);
    });

    const errorEventListener = eventEmitter.addListener("onError", (errorMessage) => {
      console.error("Connection Error:", errorMessage);
      // retry
      if (isConnected && !NIRDeviceConnected) {
        LinkSquareModule.initialize();
        LinkSquareModule.connect("192.168.1.1", 18630);
        setNIRDeviceConnected(true);
      }
    });

    return () => {
      connectionEventListener.remove();
      onScanCompleteEventListener.remove();
      errorEventListener.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" translucent />

          <ImageBackground source={require("~/assets/images/background.png")} style={{ flex: 1 }}>
            <Slot />
          </ImageBackground>
        </View>
        <PortalHost />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
