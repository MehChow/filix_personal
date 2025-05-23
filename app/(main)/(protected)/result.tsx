import { StyleSheet, View } from "react-native";
import { Progress } from "~/components/ui/progress";
import { DMSans400, DMSans700 } from "~/utils/dmsans-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelectStore } from "~/store/select-store";
import { useScannedFrameStore } from "~/store/scanned-frame-store";
import Footer from "~/components/Footer";
import Button from "~/components/Button";
import colors from "~/constants/color";
import useProgressBar from "~/hooks/use-progress-bar";

import translate from "~/services/localization/i18n";
import LanguageToggle from "~/components/language-toggle";
import { useLanguage } from "~/context/language-context";

type ResultRouteParams = {
  similarity: string;
};

const ResultPage = () => {
  // Get similarity value passed from the comparing page
  const { similarity } = useLocalSearchParams<ResultRouteParams>();
  const similarityValue = Number(similarity || 0);

  useLanguage();

  // If this function moved to utils file, the color somehow
  // cannot be passed to the Progress bar
  const getIndicatorColor = () => {
    if (similarityValue >= 90) {
      return ["bg-[#55BB7F]", "text-[#55BB7F]"];
    } else if (similarityValue >= 20) {
      return ["bg-[#F2C94C]", "text-[#F2C94C]"];
    } else {
      return ["bg-[#FF4242]", "text-[#FF4242]"];
    }
  };

  // Get indicator color and text color of the progress bar
  const [indicatorColor, textColor] = getIndicatorColor();

  // Access user's selected data
  const { selectedData, clearSelectOption } = useSelectStore();

  const { clearScannedFrameData } = useScannedFrameStore();

  // Progress Bar
  const { progress } = useProgressBar(similarityValue);

  // Reset selected data state, and return home
  const router = useRouter();
  const handleBack = () => {
    clearSelectOption();
    clearScannedFrameData();
    router.replace("/(main)/home");
  };

  return (
    <View style={styles.container}>
      <LanguageToggle />

      <DMSans700 style={styles.title}>{translate.t("result.title")}</DMSans700>

      {/* Product details */}
      <View style={styles.productContainer}>
        <View style={styles.productDetails}>
          <DMSans400 style={styles.detailLabel}>
            {translate.t("result.product_type")}
          </DMSans400>
          <DMSans700 style={styles.detailContent}>
            {translate.t(`selectOptions.${selectedData.category}`)}
          </DMSans700>
        </View>

        <View style={styles.productDetails}>
          <DMSans400 style={styles.detailLabel}>
            {translate.t("result.product_name")}
          </DMSans400>
          <DMSans700 style={styles.detailContent}>
            {translate.t(`selectOptions.${selectedData.productName}`)}
          </DMSans700>
        </View>
      </View>

      {/* Similarity */}
      <View style={styles.similarityContainer}>
        <View style={styles.metricsContainer}>
          <DMSans700 style={styles.similarityText}>
            {translate.t("result.similarity")}
          </DMSans700>
          <DMSans700 style={styles.percentageText} className={`${textColor}`}>
            {similarityValue}%
          </DMSans700>
        </View>

        <Progress value={progress} indicatorClassName={`${indicatorColor}`} />
      </View>

      <Button
        buttonText={translate.t("result.back_home")}
        width="60%"
        onPress={handleBack}
      />

      <Footer />
    </View>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 60,
    marginBottom: 80,
    fontSize: 16,
    textAlign: "center",
  },
  productContainer: {
    gap: 24,
    marginBottom: 80,
  },
  productDetails: {
    gap: 4,
  },
  detailLabel: {
    color: colors.textSecondary,
  },
  detailContent: {
    fontSize: 16,
    color: colors.textDefault,
  },
  similarityContainer: {
    gap: 16,
    paddingBottom: 80,
  },
  metricsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  similarityText: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.textDefault,
  },
  percentageText: {
    fontSize: 48,
  },
});
