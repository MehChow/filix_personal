import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { DMSans700 } from "~/utils/dmsans-text";
import colors from "~/constants/color";
import StepSeparator from "~/components/home-steps/Step-separator";
import StepTwo from "~/components/home-steps/Step-two";
import StepOne from "~/components/home-steps/Step-one";
import StepThree from "~/components/home-steps/Step-three";
import StepFour from "~/components/home-steps/Step-four";
import Button from "~/components/Button";
import Footer from "~/components/Footer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useUserStore } from "~/store/user-store";

const HomePage = () => {
  const router = useRouter();
  const handleConfirm = () => {
    router.replace("/(main)/comparing");
  };

  // For development use only. Tap the Pen icon 20 times to logout
  const [devLogoutCount, setDevLogoutCount] = useState(0);
  const { clearUserInfo } = useUserStore();
  useEffect(() => {
    if (devLogoutCount > 10) {
      clearUserInfo();
    }
  }, [devLogoutCount]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Product header */}
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

      {/* Steps */}
      <View style={styles.stepsContainer}>
        {/* Step 1: CONNECT */}
        <StepOne />
        <StepSeparator />

        {/* Step 2: PRODUCT */}
        <StepTwo />
        <StepSeparator />

        {/* Step 3: SCAN */}
        <StepThree />
        <StepSeparator />

        {/* Step 4: COMPARE */}
        <StepFour />
      </View>

      <Button buttonText="Confirm" width="100%" onPress={handleConfirm} />

      <Footer />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 200,
    justifyContent: "center",
    alignItems: "center",
  },
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
  stepsContainer: {
    width: "100%",
    paddingBottom: 20,
  },
});
