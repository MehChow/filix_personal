import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { DMSans700 } from "~/utils/dmsans-text";
import { useUserStore } from "~/store/user-store";
import colors from "~/constants/color";

const HomeHeader = () => {
  // For development use only. Tap the Pen icon 10 times to logout
  const [devLogoutCount, setDevLogoutCount] = useState(0);
  const { clearUserInfo } = useUserStore();
  useEffect(() => {
    if (devLogoutCount > 10) {
      clearUserInfo();
    }
  }, [devLogoutCount]);
  return (
    <View style={styles.header}>
      <DMSans700 style={styles.title}>Filix Scan</DMSans700>
      <DMSans700 style={styles.subTitle}>Let's start NIR</DMSans700>

      {/* For development use only, logout test */}
      <Pressable
        onPress={() => setDevLogoutCount(devLogoutCount + 1)}
        style={styles.image}
      >
        <Image
          source={require("~/assets/images/filix_product.png")}
          resizeMode="contain"
        />
      </Pressable>

      {/* Uncomment the code below for demo / production */}
      {/* <Image
          source={require("~/assets/images/filix_product.png")}
          resizeMode="contain"
          style={styles.image}
        /> */}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    position: "relative",
    width: 375,
    maxWidth: 375,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: colors.mainGreen,
  },
  subTitle: {
    fontSize: 16,
    color: colors.textDefault,
  },
  image: {
    position: "absolute",
    marginTop: 20,
    marginLeft: 80,
  },
});
