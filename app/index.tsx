import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import LoadingIndicator from "~/components/Loading-indicator";
import useLoadFonts from "~/hooks/use-load-fonts";
import { askForLocationPermission } from "~/utils/helper";

SplashScreen.preventAutoHideAsync();

const IndexPage = () => {
  const router = useRouter();

  const { fontsLoaded } = useLoadFonts();

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_BASEURL);
    if (fontsLoaded) {
      router.replace("/(main)/home");

      // After landing the app, hide the splash screen
      askForLocationPermission();
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, router]);

  // If fonts are not loaded, show the splash screen
  if (!fontsLoaded) {
    return <LoadingIndicator />;
  }

  return null;
};

export default IndexPage;
