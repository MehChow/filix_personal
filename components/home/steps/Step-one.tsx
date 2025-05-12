import {
  ActivityIndicator,
  NativeEventEmitter,
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

const StepOne = () => {
  const eventEmitter = new NativeEventEmitter();
  const {
    setNIRDeviceConnected,
    NIRDeviceConnected,
    isConnecting,
    handleConnect,
  } = useConnectNIR();

  useEffect(() => {
    const connectListener = eventEmitter.addListener("CONNECTED", (message) => {
      console.log("CONNECTED: ", message);
      setNIRDeviceConnected(true);
    });

    const errorEventListener = eventEmitter.addListener(
      "onError",
      (errorMessage) => {
        setNIRDeviceConnected(false);
        console.log("Connection Error:", errorMessage);
      }
    );

    return () => {
      connectListener.remove();
      errorEventListener.remove();
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
