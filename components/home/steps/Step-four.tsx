import { StyleSheet, View } from "react-native";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";
import colors from "~/constants/color";

const StepFour = () => {
  return (
    <View style={styles.step}>
      <DMSans700 style={styles.stepTitle}>➃ COMPARE</DMSans700>
      <DMSans500 style={styles.stepDescription}>
        Please confirm the above steps are completed in order.
      </DMSans500>
    </View>
  );
};

export default StepFour;

const styles = StyleSheet.create({
  step: {
    gap: 12,
  },
  stepTitle: {
    fontSize: 16,
    color: colors.mainGreen,
  },
  stepDescription: {
    fontSize: 16,
  },
});
