import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { DMSans700 } from "~/utils/dmsans-text";
import Footer from "~/components/Footer";
import colors from "~/constants/color";
import { getWindowWidth } from "~/utils/helper";
import { useScannedFrameStore } from "~/store/scanned-frame-store";
import { useSelectStore } from "~/store/select-store";
import { useEffect } from "react";
import calculateSimilarity from "~/api/calculate";

const windowWidth = getWindowWidth();

const ComparingPage = () => {
  const router = useRouter();

  const { pixel_array } = useScannedFrameStore();
  const { selectedData } = useSelectStore();

  const handleCalculate = async () => {
    try {
      const result = await calculateSimilarity(
        pixel_array,
        selectedData.category,
        selectedData.productName
      );
      console.log(result.similarity);
      console.log(result.error);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  return (
    <View style={styles.container}>
      {/* Graph + Comparing text container */}
      <View style={styles.content}>
        <Image
          source={require("~/assets/images/comparing_graph.png")}
          style={styles.graph}
        />
        <DMSans700 style={styles.contentText}>
          Comparing with the standard spectrum fingerprint in the blockchain
        </DMSans700>
      </View>

      {/* Circular progress */}
      <AnimatedCircularProgress
        size={windowWidth * 0.85}
        width={5}
        fill={100}
        rotation={180}
        tintColor={colors.mainGreen}
        onAnimationComplete={() =>
          router.replace({
            pathname: "/(main)/result",
            params: { similarity: 46.7 },
          })
        }
        backgroundColor="rgba(186, 186, 186, 0.5)"
        style={styles.circularProgress}
        duration={3000}
      />

      <Footer />
    </View>
  );
};

export default ComparingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    width: windowWidth * 0.7,
    gap: 12,
  },
  graph: { alignSelf: "center" },
  contentText: { textAlign: "center" },
  circularProgress: {
    position: "absolute",
  },
});
