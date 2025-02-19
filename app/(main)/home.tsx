import LogoutButton from "~/components/Logout-button";
import { View, StyleSheet } from "react-native";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <LogoutButton />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
