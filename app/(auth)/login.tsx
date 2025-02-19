import { getStatusBarHeight } from "~/utils/helper";
import { View, StyleSheet } from "react-native";
import HeaderLogo from "~/components/auth-login/Header-logo";
import FooterHelper from "~/components/auth-login/Footer-helper";
import LoginForm from "~/components/auth-login/Login-form";

const LoginPage = () => {
  const barHeight = getStatusBarHeight();

  return (
    <View style={{ marginTop: barHeight + 80, flex: 1 }}>
      {/* Content container */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <HeaderLogo />

        {/* Login Form container */}
        <LoginForm />

        {/* Not regsiter? */}
        <FooterHelper />
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 60,
    position: "relative",
  },
});
