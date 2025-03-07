import { StyleSheet, View } from "react-native";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import colors from "~/constants/color";
import { Button } from "~/components/ui/button";

interface StepOneProps {
  NIRDeviceConnected: boolean;
}

const StepOne = ({ NIRDeviceConnected }: StepOneProps) => {
  const buttonBgColor = NIRDeviceConnected ? "bg-[#55BB7F]" : "bg-transparent";
  const buttonBorder = NIRDeviceConnected ? "" : "border-[2px]";
  const buttonBorderColor = NIRDeviceConnected ? "" : "border-[#B3B1B8]";
  const buttonText = NIRDeviceConnected
    ? "NIR DEVICE CONNECTED"
    : "NIR DEVICE NOT CONNECTED";
  const buttonTextColor = NIRDeviceConnected ? "text-white" : "text-[#B3B1B8]";

  return (
    <View style={styles.step}>
      <View style={styles.stepHeader}>
        <DMSans700 style={styles.stepTitle}>➀ CONNECT</DMSans700>
        <Feather name="info" size={20} color={colors.mainGreen} />
      </View>

      <DMSans500 style={styles.stepDescription}>
        Confirm mobile phone is connected to LinkSquareNIR Wi-Fi. If NIR device
        is not automatically connected, please restart the app and try again.
      </DMSans500>

      <Button
        className={`${buttonBgColor} ${buttonBorder} ${buttonBorderColor} flex-row items-center rounded-full gap-2 !h-12 !py-0 opacity-100`}
        disabled={true}
      >
        <DMSans500 className={`font-bold ${buttonTextColor}`}>
          {buttonText}
        </DMSans500>
        <FontAwesome6
          name={NIRDeviceConnected ? "face-smile" : "face-meh"}
          size={20}
          color={NIRDeviceConnected ? "white" : "#B3B1B8"}
        />
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
