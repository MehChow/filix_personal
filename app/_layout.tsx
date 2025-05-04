import { Slot } from "expo-router";
import { ImageBackground, StatusBar, View } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import "~/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LanguageProvider } from "~/context/language-context";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
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
      </LanguageProvider>
    </QueryClientProvider>
  );
}
