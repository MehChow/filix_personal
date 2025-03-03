import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const useCheckWifi = (prefix: string) => {
  const [detectedLSWifFi, setDetectedLSWiFi] = useState(false);

  useEffect(() => {
    const loadWifiName = async () => {
      const state = await NetInfo.fetch();
      // console.log("Current connected wifi: ", state.details?.ssid);
      if (state.details?.ssid?.startsWith(prefix)) {
        setDetectedLSWiFi(true);
        // Clear the interval if LSWiFi is found
        clearInterval(intervalId);
      }
    };

    loadWifiName();

    // Set up an interval to call it every 2 seconds
    const intervalId = setInterval(loadWifiName, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return detectedLSWifFi;
};

export default useCheckWifi;
