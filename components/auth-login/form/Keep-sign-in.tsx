import { StyleSheet, View } from "react-native";
import { DMSans400 } from "~/utils/dmsans-text";
import colors from "~/constants/color";
import { Checkbox } from "~/components/ui/checkbox";

import translate from "~/services/localization/i18n";

interface KeepSignInProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const KeepSignIn = ({ checked, onCheckedChange }: KeepSignInProps) => {
  return (
    <View style={styles.container}>
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={checked ? "" : "border border-primary"}
      />
      <DMSans400 style={{ color: colors.grey1 }}>
        {translate.t("login.keep_sign_in")}
      </DMSans400>
    </View>
  );
};

export default KeepSignIn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
