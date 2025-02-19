import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useUserStore } from "~/store/user-store";
import useLoadFonts from "~/hooks/use-load-fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const { isLogin } = useUserStore();
  const { fontsLoaded } = useLoadFonts();

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
    }
  }, [isLogin, fontsLoaded]);

  // If fonts are not loaded, show the splash screen
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent />

      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={{ flex: 1 }}
      >
        <Slot />
      </ImageBackground>
    </View>
  );
}
