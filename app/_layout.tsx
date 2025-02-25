import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ImageBackground,
  StatusBar,
  View,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useUserStore } from "~/store/user-store";
import useLoadFonts from "~/hooks/use-load-fonts";
import { PortalHost } from "@rn-primitives/portal";
import "~/global.css";
import { askForLocationPermission } from "~/utils/helper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const { isLogin } = useUserStore();
  const { fontsLoaded } = useLoadFonts();

  const { LinkSquareModule } = NativeModules;
  const eventEmitter = new NativeEventEmitter(LinkSquareModule);

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
        console.log("Scanned Frames:", frames);
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

  useEffect(() => {
    if (fontsLoaded) {
      // Ensure auth is checked before navigating

      if (isLogin === true) {
        router.replace("/(main)/home");
      } else if (isLogin === false) {
        router.replace("/(auth)/login");
      }

      // After landing the app, hide the splash screen
      SplashScreen.hide;
      askForLocationPermission();
    }
  }, [isLogin, fontsLoaded]);

  // If fonts are not loaded, show the splash screen
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
