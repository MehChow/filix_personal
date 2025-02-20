import { StyleSheet, View } from "react-native";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";
import Feather from "@expo/vector-icons/Feather";
import colors from "~/constants/color";

const StepOne = () => {
  return (
    <View style={styles.step}>
      <View style={styles.stepHeader}>
        <DMSans700 style={styles.stepTitle}>➀ CONNECT</DMSans700>
        <Feather name="info" size={20} color={colors.mainGreen} />
      </View>

      <DMSans500 style={styles.stepDescription}>
        Confirm mobile phone is connected to LinkSquareNIR Wi-Fi
      </DMSans500>
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
