import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  NativeEventEmitter,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { getWindowWidth } from "~/utils/helper";
import translate from "~/services/localization/i18n";
import { useScannedFrameStore } from "~/store/scanned-frame-store";

const windowWidth = getWindowWidth();

export default function MainLayout() {
  const eventEmitter = new NativeEventEmitter();

  const { setScannedFrameData } = useScannedFrameStore();

  useEffect(() => {
    const onScanCompleteEventListener = eventEmitter.addListener(
      "onScanComplete",
      (frames) => {
        console.log("Scanned Frames (raw_data list): ", frames);
        if (frames.raw_data.length === 600) {
          ToastAndroid.show(
            translate.t("alerts.scanned_successfully"),
            ToastAndroid.LONG
          );
        }
        setScannedFrameData(frames.raw_data);
      }
    );

    return () => {
      onScanCompleteEventListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="home" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth > 480 ? 100 : 20,
  },
});
