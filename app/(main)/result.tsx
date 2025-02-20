import { StyleSheet, View } from "react-native";
import colors from "~/constants/color";
import { Progress } from "~/components/ui/progress";
import { DMSans400, DMSans700 } from "~/utils/dmsans-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import Footer from "~/components/Footer";
import Button from "~/components/Button";
import { useEffect, useState } from "react";

type ResultRouteParams = {
  similarity: string;
};

const ResultPage = () => {
  const { similarity } = useLocalSearchParams<ResultRouteParams>();
  const similarityValue = Number(similarity || 0);

  const router = useRouter();

  const handleBack = () => {
    router.replace("/(main)/home");
  };

  // Tailwind not allow dynamic className
  const getIndicatorColor = () => {
    if (similarityValue >= 90) {
      return ["bg-[#55BB7F]", "text-[#55BB7F]"];
    } else if (similarityValue >= 20) {
      return ["bg-[#F2C94C]", "text-[#F2C94C]"];
    } else {
      return ["bg-[#FF4242]", "text-[#FF4242]"];
    }
  };

  const [progress, setProgres] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgres(similarityValue), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <DMSans700 style={styles.title}>Result</DMSans700>

      {/* Product details */}
      <View style={styles.productContainer}>
        <View style={styles.productDetails}>
          <DMSans400 style={styles.detailLabel}>Product Type</DMSans400>
          <DMSans700 style={styles.detailContent}>Agarwood</DMSans700>
        </View>

        <View style={styles.productDetails}>
          <DMSans400 style={styles.detailLabel}>Product Name</DMSans400>
          <DMSans700 style={styles.detailContent}>
            A grade NYCX powder
          </DMSans700>
        </View>
      </View>

      {/* Similarity */}
      <View style={styles.similarityContainer}>
        <View style={styles.metricsContainer}>
          <DMSans700 style={styles.similarityText}>Similarity</DMSans700>
          <DMSans700
            style={styles.percentageText}
            className={getIndicatorColor()[1]}
          >
            {similarityValue}%
          </DMSans700>
        </View>

        <Progress
          value={progress}
          indicatorClassName={getIndicatorColor()[0]}
        />
      </View>

      <Button buttonText="Back to Homepage" width="60%" onPress={handleBack} />

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
    marginTop: 20,
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
