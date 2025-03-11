import { StyleSheet, View } from "react-native";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";
import Feather from "@expo/vector-icons/Feather";
import colors from "~/constants/color";

import translate from "~/services/localization/i18n";

const StepThree = () => {
  return (
    <View style={styles.step}>
      <View style={styles.stepHeader}>
        <DMSans700 style={styles.stepTitle}>
          {translate.t("home.step_three.title")}
        </DMSans700>
        <Feather name="info" size={20} color={colors.mainGreen} />
      </View>

      <DMSans500 style={styles.stepDescription}>
        {translate.t("home.step_three.description")}
      </DMSans500>

      <View>
        <DMSans700 style={{ fontSize: 16, marginBottom: 4 }}>
          {translate.t("home.step_three.important_notes")}
        </DMSans700>
        <DMSans500 style={{ paddingLeft: 12, fontSize: 16 }}>
          {translate.t("home.step_three.note1")}
          {"\n"}
          {translate.t("home.step_three.note2")}
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
