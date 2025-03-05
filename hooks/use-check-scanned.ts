import { ToastAndroid } from "react-native";
import { useScannedFrameStore } from "~/store/scanned-frame-store";

/**
 * A custom hook for alerting the user about the scanned data status
 */
const useCheckScanned = () => {
  const { pixel_array } = useScannedFrameStore();

  const checkDataStatus = () => {
    // User haven't scan the data yet
    if (pixel_array.length === 0) {
      ToastAndroid.show("Please scan the data first", ToastAndroid.SHORT);
      return false;
    }

    // Somehow the scanned data is malformed
    // Haven't occurred before, but for safety check
    if (pixel_array.length !== 600) {
      ToastAndroid.show(
        "Data corrupted. Please scan the data again",
        ToastAndroid.SHORT
      );
      return false;
    }

    return true;
  };

  return { checkDataStatus };
};

export default useCheckScanned;
