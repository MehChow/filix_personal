import { getStatusBarHeight, getWindowWidth } from "~/utils/helper";
import { View, StyleSheet } from "react-native";
import HeaderLogo from "~/components/auth-login/Header-logo";
import FooterHelper from "~/components/auth-login/Footer-helper";
import LoginForm from "~/components/auth-login/Login-form";

const windowWidth = getWindowWidth();

const LoginPage = () => {
  const barHeight = getStatusBarHeight();

  return (
    <View
      style={{
        marginTop: barHeight + 80,
        flex: 1,
      }}
    >
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
    marginHorizontal: windowWidth > 480 ? 100 : 20,
    gap: 60,
    position: "relative",
  },
});
