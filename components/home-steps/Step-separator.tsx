import { StyleSheet, View } from "react-native";

const StepSeparator = () => {
  return <View style={styles.separator} />;
};

export default StepSeparator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginVertical: 20,
    backgroundColor: "#E0E0E0",
  },
});
