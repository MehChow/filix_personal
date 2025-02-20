import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { DMSans500 } from "~/utils/dmsans-text";
import colors from "~/constants/color";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <DMSans500 style={styles.poweredBy}>Powered by</DMSans500>
      <Image
        source={require("~/assets/images/filix_logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    alignSelf: "flex-start",
    position: "absolute",
    marginBottom: 60,
    gap: 16,
    bottom: 0,
    left: 0,
  },
  poweredBy: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  logo: {
    width: 205,
    height: 40,
    alignSelf: "flex-start",
  },
});
