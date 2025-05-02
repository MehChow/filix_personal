import NetInfo, { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
import { useLSWifiConnectionStore } from "~/store/ls-wifi-connection-store";

let unsubscribe: NetInfoSubscription | null = null;

const initializeNetworkListener = (): (() => void) => {
  // Clean up existing subscription if any
  if (unsubscribe) {
    unsubscribe();
  }

  const { setIsConnected, setError, setLoading } = useLSWifiConnectionStore.getState();

  const updateNetworkStatus = (state: NetInfoState): void => {
    try {
      setLoading(true);
      if (state.type === "wifi" && state.isConnected) {
        const wifiName = state.details?.ssid || null;
        const isLSNetwork = wifiName?.startsWith("LS") || false;
        setIsConnected(isLSNetwork);
      } else {
        setIsConnected(false);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unknown network error");
    } finally {
      setLoading(false);
    }
  };

  // Set up the network listener
  unsubscribe = NetInfo.addEventListener(updateNetworkStatus);

  // Initial check
  NetInfo.fetch()
    .then(updateNetworkStatus)
    .catch((error: Error) => {
      setError(error.message);
    });

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

export default initializeNetworkListener;
