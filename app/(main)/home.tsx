import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SelectSchema, selectSchema } from "~/schema/select-schema";
import { useSelectStore } from "~/store/select-store";
import useCheckWifi from "~/hooks/use-check-wifi";
import useCheckScanned from "~/hooks/use-check-scanned";
import StepSeparator from "~/components/home/steps/Step-separator";
import StepTwo from "~/components/home/steps/Step-two";
import StepOne from "~/components/home/steps/Step-one";
import StepThree from "~/components/home/steps/Step-three";
import StepFour from "~/components/home/steps/Step-four";
import Button from "~/components/Button";
import Footer from "~/components/Footer";
import HomeHeader from "~/components/home/header";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "~/store/user-store";

const HomePage = () => {
  useCheckWifi("LS");

  const router = useRouter();

  const { checkDataStatus } = useCheckScanned();
  const { setSelectOption } = useSelectStore();

  const handleConfirm = () => {
    const selectedOptions = {
      category: getValues().category.label,
      productName: getValues().productName.label,
    };
    setSelectOption(selectedOptions);

    const isDataReady = checkDataStatus();
    if (!isDataReady) return;

    router.replace("/(main)/comparing");
  };

  // Form for handling selection
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SelectSchema>({
    resolver: zodResolver(selectSchema),
  });

  const { userInfo } = useUserStore();
  console.log(userInfo);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
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
        buttonText="Confirm"
        width="100%"
        onPress={handleSubmit(handleConfirm)}
      />

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
  stepsContainer: {
    width: "100%",
    paddingBottom: 20,
  },
});
