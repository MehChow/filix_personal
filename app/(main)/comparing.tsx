import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Footer from "~/components/Footer";
import colors from "~/constants/color";
import { DMSans700 } from "~/utils/dmsans-text";

const ComparingPage = () => {
  const router = useRouter();

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
        size={350}
        width={5}
        fill={100}
        rotation={180}
        tintColor={colors.mainGreen}
        onAnimationComplete={() =>
          router.replace({
            pathname: "/(main)/result",
            params: { similarity: 10 },
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
    width: 300,
    gap: 12,
  },
  graph: { alignSelf: "center" },
  contentText: { textAlign: "center" },
  circularProgress: {
    position: "absolute",
  },
});
