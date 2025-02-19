import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import colors from "~/constants/color";
import { DMSans400 } from "~/utils/dmsans-text";

const FooterHelper = () => {
  return (
    <View style={styles.registerHelper}>
      <DMSans400>Don't have an account?</DMSans400>
      <Link href="/(auth)/register" style={styles.registerLink}>
        Register Now!
      </Link>
    </View>
  );
};

export default FooterHelper;

const styles = StyleSheet.create({
  registerHelper: {
    alignSelf: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 6,
  },
  registerLink: {
    color: colors.primary1,
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: "DMSans_400Regular",
  },
});
