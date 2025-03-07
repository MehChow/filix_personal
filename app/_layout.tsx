import { Slot } from "expo-router";
import {
  ImageBackground,
  StatusBar,
  View,
  NativeEventEmitter,
  ToastAndroid,
} from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import "~/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useScannedFrameStore } from "~/store/scanned-frame-store";
import initializeNetworkListener from "~/services/network-listener";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const eventEmitter = new NativeEventEmitter();

  const { setScannedFrameData } = useScannedFrameStore();

  // Initialize LS Wifi network listener, keep tracking the LS WiFi connection status
  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_BASEURL);
    const cleanup = initializeNetworkListener();
    return cleanup;
  }, []);

  // Subscribe to events emitted from the native module
  useEffect(() => {
    const connectionEventListener = eventEmitter.addListener(
      "CONNECTED",
      (message) => {
        console.log("Connection Successful:", message);
      }
    );

    const onScanCompleteEventListener = eventEmitter.addListener(
      "onScanComplete",
      (frames) => {
        console.log("Scanned Frames (raw_data list): ", frames);
        if (frames.raw_data.length === 600) {
          ToastAndroid.show("Data scanned successfully!", ToastAndroid.LONG);
        }
        setScannedFrameData(frames.raw_data);
      }
    );

    const errorEventListener = eventEmitter.addListener(
      "onError",
      (errorMessage) => {
        console.error("Connection Error:", errorMessage);
      }
    );

    return () => {
      connectionEventListener.remove();
      onScanCompleteEventListener.remove();
      errorEventListener.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" translucent />

        <ImageBackground
          source={require("~/assets/images/background.png")}
          style={{ flex: 1 }}
        >
          <Slot />
        </ImageBackground>
      </View>
      <PortalHost />
    </QueryClientProvider>
  );
}
