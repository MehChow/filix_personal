import { getStatusBarHeight, getWindowWidth } from "~/utils/helper";
import { View, StyleSheet } from "react-native";
import HeaderLogo from "~/components/auth-login/Header-logo";
import FooterHelper from "~/components/auth-login/Footer-helper";
import LoginForm from "~/components/auth-login/Login-form";
import LanguageToggle from "~/components/language-toggle";
import { useLanguage } from "~/context/language-context";

const windowWidth = getWindowWidth();

const LoginPage = () => {
  const barHeight = getStatusBarHeight();

  useLanguage();

  return (
    <View style={{ flex: 1 }}>
      {/* Content container */}
      <View style={[styles.contentContainer, { paddingTop: barHeight + 80 }]}>
        {/* Logo */}
        <HeaderLogo />

        {/* Language toggle */}
        <LanguageToggle />

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
    position: "relative",
    gap: 60,
  },
});
