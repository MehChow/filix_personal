import {
  ActivityIndicator,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  View,
} from "react-native";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import colors from "~/constants/color";
import { Button } from "~/components/ui/button";

import translate from "~/services/localization/i18n";

import { useEffect } from "react";
import useConnectNIR from "~/hooks/use-connect-nir";
import useScanIP from "~/hooks/use-scan-ip";

const StepOne = () => {
  const { LinkSquareModule } = NativeModules;
  const eventEmitter = new NativeEventEmitter();
  const {
    setNIRDeviceConnected,
    NIRDeviceConnected,
    isConnecting,
    handleConnect,
  } = useConnectNIR();
  const { isScanning, services, startScan } = useScanIP();

  const handleSetWLanInfoAndClose = async () => {
    try {
      await LinkSquareModule.setWLanInfo("NCH20", "xDNASuperH", 2);
      await LinkSquareModule.close();
    } catch (error) {
      console.error("Error setting WiFi info:", error);
    }
  };

  const handleConnectIoT = async () => {
    try {
      await LinkSquareModule.initialize();
      await LinkSquareModule.connect("192.168.50.195", 18630);
    } catch (error) {
      console.error("Error connecting to IoT:", error);
    }
  };

  useEffect(() => {
    const connectListener = eventEmitter.addListener("CONNECTED", (message) => {
      console.log("CONNECTED: ", message);
      setNIRDeviceConnected(true);
    });

    const disconnectListener = eventEmitter.addListener(
      "DISCONNECTED",
      (message) => {
        console.log("DISCONNECTED: ", message);
        setNIRDeviceConnected(false);
      }
    );

    const errorEventListener = eventEmitter.addListener(
      "onError",
      (errorMessage) => {
        setNIRDeviceConnected(false);
        console.log("Connection Error:", errorMessage);
      }
    );

    const wLanInfoSetListener = eventEmitter.addListener(
      "WLanInfoSet",
      (message) => {
        console.log("WLanInfoSet: ", message);
      }
    );

    return () => {
      connectListener.remove();
      errorEventListener.remove();
      wLanInfoSetListener.remove();
      disconnectListener.remove();
    };
  }, [setNIRDeviceConnected]);

  const buttonBgColor = NIRDeviceConnected ? "bg-[#55BB7F]" : "bg-transparent";
  const buttonBorder = NIRDeviceConnected ? "" : "border-[2px]";
  const buttonBorderColor = NIRDeviceConnected ? "" : "border-[#55BB7F]";
  const buttonText = NIRDeviceConnected
    ? translate.t("home.step_one.connected")
    : translate.t("home.step_one.notConnected");
  const buttonTextColor = NIRDeviceConnected ? "text-white" : "text-[#55BB7F]";

  return (
    <View style={styles.step}>
      <View style={styles.stepHeader}>
        <DMSans700 style={styles.stepTitle}>
          {translate.t("home.step_one.title")}
        </DMSans700>
        <Feather name="info" size={20} color={colors.mainGreen} />
      </View>

      <DMSans500 style={styles.stepDescription}>
        {translate.t("home.step_one.description")}
      </DMSans500>

      <Button
        className={`${buttonBgColor} ${buttonBorder} ${buttonBorderColor} flex-row items-center rounded-full gap-2 !h-12 !py-0 opacity-100`}
        onPress={handleConnect}
        disabled={NIRDeviceConnected || isConnecting}
      >
        {isConnecting && <ActivityIndicator size="small" color="#55BB7F" />}
        <DMSans500 className={`font-bold ${buttonTextColor}`}>
          {isConnecting ? translate.t("home.step_one.connecting") : buttonText}
        </DMSans500>
        {NIRDeviceConnected && (
          <FontAwesome6 name="face-smile" size={20} color="white" />
        )}
      </Button>

      <Button
        className={`${buttonBgColor} ${buttonBorder} ${buttonBorderColor} flex-row items-center rounded-full gap-2 !h-12 !py-0 opacity-100`}
        onPress={handleSetWLanInfoAndClose}
      >
        <DMSans500 className={`font-bold ${buttonTextColor}`}>
          Set Info and Close
        </DMSans500>
      </Button>

      <Button
        className={`${buttonBgColor} ${buttonBorder} ${buttonBorderColor} flex-row items-center rounded-full gap-2 !h-12 !py-0 opacity-100`}
        onPress={startScan}
        disabled={isScanning}
      >
        {isScanning && <ActivityIndicator size="small" color="#55BB7F" />}
        <DMSans500 className={`font-bold ${buttonTextColor}`}>
          {isScanning ? "Scanning..." : "Scan for IoT Device"}
        </DMSans500>
      </Button>

      <Button
        className={`${buttonBgColor} ${buttonBorder} ${buttonBorderColor} flex-row items-center rounded-full gap-2 !h-12 !py-0 opacity-100`}
        onPress={handleConnectIoT}
      >
        <DMSans500 className={`font-bold ${buttonTextColor}`}>
          Connect to IoT
        </DMSans500>
      </Button>
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  step: {
    gap: 12,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepTitle: {
    fontSize: 16,
    color: colors.mainGreen,
  },
  stepDescription: {
    fontSize: 16,
  },
});
