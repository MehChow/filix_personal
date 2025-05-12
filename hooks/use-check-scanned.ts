import { ToastAndroid } from "react-native";
import { useScannedFrameStore } from "~/store/scanned-frame-store";

import translate from "~/services/localization/i18n";

/**
 * A custom hook for alerting the user about the scanned data status
 */
const useCheckScanned = () => {
  const { pixel_array } = useScannedFrameStore();

  const checkDataStatus = () => {
    // User haven't scan the data yet
    if (pixel_array.length === 0) {
      ToastAndroid.show(translate.t("alerts.not_scanned"), ToastAndroid.SHORT);
      return false;
    }

    // Somehow the scanned data is malformed
    // Haven't occurred before, but for safety check
    if (pixel_array.length !== 600) {
      ToastAndroid.show(translate.t("alerts.data_corrupted"), ToastAndroid.SHORT);
      return false;
    }

    return true;
  };

  return { checkDataStatus };
};

export default useCheckScanned;
