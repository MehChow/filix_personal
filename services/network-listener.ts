import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import { useLSWifiConnectionStore } from "~/store/ls-wifi-connection-store";

let unsubscribe: NetInfoSubscription | null = null;

/**
 * Initializes and manages a global network listener to monitor WiFi connection status,
 * specifically checking for LS WiFi networks (networks starting with "LS").
 * The listener updates the `useLSWiFiConnectionStore` state based on network changes.
 *
 * @returns {() => void} A cleanup function that removes the network listener when called.
 * @throws {Error} If there is an issue fetching the initial network state or during event handling.
 * @example
 * ```typescript
 * import { initializeNetworkListener } from './services/networkListener';
 *
 * useEffect(() => {
 *   const cleanup = initializeNetworkListener();
 *   return cleanup; // Cleanup on component unmount
 * }, []);
 * ```
 * @remarks
 * - This function should be called once during app initialization (e.g., in `App.tsx`).
 * - It handles both initial network state fetching and real-time updates.
 * - The listener checks for WiFi networks and sets the `isConnected` state to `true` only if the SSID starts with "LS".
 * - Errors are captured and stored in the `useLSWiFiConnectionStore` state under the `error` property.
 * - The `isLoading` state is used to indicate when network status is being updated.
 */
const initializeNetworkListener = (): (() => void) => {
  // Clean up existing subscription if any
  if (unsubscribe) {
    unsubscribe();
  }

  const { setIsConnected, setError, setLoading } =
    useLSWifiConnectionStore.getState();

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
      setError(
        error instanceof Error ? error.message : "Unknown network error"
      );
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
