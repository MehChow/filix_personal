import { Slot } from "expo-router";
import {
  ImageBackground,
  StatusBar,
  View,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import "~/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useScannedFrameStore } from "~/store/scanned-frame-store";

export default function RootLayout() {
  const queryClient = new QueryClient();

  const { LinkSquareModule } = NativeModules;
  const eventEmitter = new NativeEventEmitter(LinkSquareModule);

  const { setScannedFrameData } = useScannedFrameStore();

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
