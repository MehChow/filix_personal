import { StyleSheet, View } from "react-native";
import { DMSans400 } from "~/utils/dmsans-text";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "~/constants/color";

const KeepSignIn = () => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={20}
        fillColor={colors.primary1}
        unFillColor="#FFFFFF"
        disableText
        innerIconStyle={{ borderWidth: 1, borderColor: "black" }}
        onPress={(isChecked: boolean) => {
          console.log(isChecked);
        }}
      />
      <DMSans400 style={{ color: colors.grey1 }}>Keep me signed in</DMSans400>
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
