import { useRouter } from "expo-router";
import { Image, StyleSheet, ToastAndroid, View } from "react-native";
import { DMSans700 } from "~/utils/dmsans-text";
import { getWindowWidth } from "~/utils/helper";
import { useScannedFrameStore } from "~/store/scanned-frame-store";
import { useSelectStore } from "~/store/select-store";
import { useEffect } from "react";
import * as Progress from "react-native-progress";
import calculateSimilarity from "~/api/calculate";
import Footer from "~/components/Footer";
import colors from "~/constants/color";

const windowWidth = getWindowWidth();

const ComparingPage = () => {
  const router = useRouter();

  // Access scanned frame data and selected data
  const { pixel_array, clearScannedFrameData } = useScannedFrameStore();
  const { selectedData } = useSelectStore();

  useEffect(() => {
    const handleCalculate = async () => {
      try {
        const result = await calculateSimilarity(
          pixel_array,
          selectedData.category,
          selectedData.productName
        );

        router.replace({
          pathname: "/(main)/result",
          params: { similarity: result.data.similarity },
        });
      } catch (err) {
        if (err === "INVALID_TOKEN") {
          // Redirect to login page (Will be handled by AuthWrapper)
          return;
        }

        ToastAndroid.show(
          "Something went wrong, please try again",
          ToastAndroid.SHORT
        );

        clearScannedFrameData();
        router.replace({
          pathname: "/(main)/home",
        });
      }
    };

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
      <Progress.CircleSnail
        size={windowWidth * 0.85}
        indeterminate={true}
        color={colors.mainGreen}
        thickness={5}
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
