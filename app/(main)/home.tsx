import { View, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";
import { SelectSchema, selectSchema } from "~/schema/select-schema";
import { useSelectStore } from "~/store/select-store";
import { useNetInfo } from "@react-native-community/netinfo";
import useConnectNIR from "~/hooks/use-connect-nir";
import useCheckScanned from "~/hooks/use-check-scanned";
import StepSeparator from "~/components/home/steps/Step-separator";
import StepTwo from "~/components/home/steps/Step-two";
import StepOne from "~/components/home/steps/Step-one";
import StepThree from "~/components/home/steps/Step-three";
import StepFour from "~/components/home/steps/Step-four";
import Button from "~/components/Button";
import Footer from "~/components/Footer";
import HomeHeader from "~/components/home/header";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LanguageToggle from "~/components/language-toggle";
import { useLanguage } from "~/context/language-context";

import translate from "~/services/localization/i18n";
import { useUserStore } from "~/store/user-store";

const HomePage = () => {
  const router = useRouter();
  const netInfo = useNetInfo();

  const { isAuthenticated, isPersistedLogin } = useUserStore();

  useLanguage();

  // NIR device connection status

  // Scanned data status
  const { checkDataStatus } = useCheckScanned();

  // Selection of category and product
  const { setSelectOption } = useSelectStore();

  // Form for handling selection
  const formMethods = useForm<SelectSchema>({
    resolver: zodResolver(selectSchema),
    defaultValues: {
      category: undefined,
      productName: undefined,
    },
  });

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const handleConfirm = () => {
    // Prepare selected data, stored it globally in Zustand store
    const selectedOptions = {
      category: getValues().category.value,
      productName: getValues().productName.value,
    };
    setSelectOption(selectedOptions);

    const isDataReady = checkDataStatus();
    if (!isDataReady) return;

    // Check Internet connectivity
    const internetReachable = netInfo.isInternetReachable;
    // When developing locally, this can bypass the Internet connection check
    if (!internetReachable && process.env.EXPO_PUBLIC_BASEURL !== "http://localhost:8080") {
      ToastAndroid.show(translate.t("alerts.no_internet"), ToastAndroid.LONG);
      return;
    }

    // If user logged in or has persisted login, continue to call api in comparing page
    if (isAuthenticated || isPersistedLogin) {
      router.replace("/(main)/comparing");
    } else {
      // If user is not logged in, redirect to login page
      router.push("/(auth)/login");
    }
  };

  return (
    <FormProvider {...formMethods}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <LanguageToggle />
        {/* Product header */}
        <HomeHeader />

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {/* Step 1: CONNECT */}
          <StepOne />
          <StepSeparator />

          {/* Step 2: PRODUCT */}
          <StepTwo control={control} errors={errors} />
          <StepSeparator />

          {/* Step 3: SCAN */}
          <StepThree />
          <StepSeparator />

          {/* Step 4: COMPARE */}
          <StepFour />
        </View>

        <Button
          buttonText={translate.t("home.step_four.confirm")}
          width="100%"
          onPress={handleSubmit(handleConfirm)}
        />

        <Footer />
      </ScrollView>
    </FormProvider>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  stepsContainer: {
    width: "100%",
    paddingBottom: 20,
  },
});
