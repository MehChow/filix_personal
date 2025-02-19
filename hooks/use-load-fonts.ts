import { useEffect, useState } from "react";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";

const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    } else if (error) {
      console.error("Error loading fonts:", error);
    }
  }, [loaded, error]);

  return {
    fontsLoaded,
  };
};

export default useLoadFonts;
