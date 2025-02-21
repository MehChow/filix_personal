import { StyleSheet, View } from "react-native";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";
import Feather from "@expo/vector-icons/Feather";
import colors from "~/constants/color";

const StepThree = () => {
  return (
    <View style={styles.step}>
      <View style={styles.stepHeader}>
        <DMSans700 style={styles.stepTitle}>➂ SCAN</DMSans700>
        <Feather name="info" size={20} color={colors.mainGreen} />
      </View>

      <DMSans500 style={styles.stepDescription}>
        Place the NIR scanner on the product and press the button on NIR
        scanner. Wait until the light of button stop blinking.
      </DMSans500>

      <View>
        <DMSans700 style={{ fontSize: 16, marginBottom: 4 }}>
          Important notes:
        </DMSans700>
        <DMSans500 style={{ paddingLeft: 12, fontSize: 16 }}>
          1. Scanning will last around 1 minute{"\n"}
          2. Make sure NIR scanner is completely placed on the product when
          scanning
        </DMSans500>
      </View>
    </View>
  );
};

export default StepThree;

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
