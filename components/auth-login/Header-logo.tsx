import { Image, StyleSheet } from "react-native";

const HeaderLogo = () => {
  return (
    <Image
      source={require("@/assets/images/filix_logo.png")}
      resizeMode="contain"
      style={styles.logo}
    />
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  logo: {
    width: 205,
    height: 40,
    alignSelf: "flex-start",
  },
});
