import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import LoadingIndicator from "~/components/Loading-indicator";
import useLoadFonts from "~/hooks/use-load-fonts";
import { useUserStore } from "~/store/user-store";
import { askForLocationPermission } from "~/utils/helper";

SplashScreen.preventAutoHideAsync();

const IndexPage = () => {
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
      askForLocationPermission();
      SplashScreen.hideAsync();
    }
  }, [isLogin, fontsLoaded]);

  // If fonts are not loaded, show the splash screen
  if (!fontsLoaded || isLogin === undefined) {
    return <LoadingIndicator />;
  }

  return null;
};

export default IndexPage;
