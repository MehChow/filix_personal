import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import colors from "~/constants/color";
import { useLanguage } from "~/context/language-context";
import { DMSans700 } from "~/utils/dmsans-text";

const LanguageToggle = () => {
  const { locale, changeLanguage } = useLanguage();

  // For toggling the language 2
  const toggleText = locale === "en" ? "cn" : "en";
  const toggleTextDisplay = locale === "en" ? "中" : "ENG";

  const handleLanguageChange =
    (lang: string) => (event: GestureResponderEvent) => {
      changeLanguage(lang);
    };

  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.7}
      onPress={handleLanguageChange(toggleText)}
    >
      <DMSans700 style={style.text}>{toggleTextDisplay}</DMSans700>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 60,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default LanguageToggle;
