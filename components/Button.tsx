import { DimensionValue, StyleSheet, TouchableOpacity } from "react-native";
import { DMSans700 } from "~/utils/dmsans-text";
import colors from "~/constants/color";

interface ConfirmButtonProps {
  buttonText: string;
  width: DimensionValue;
  disabled?: boolean;
  onPress: () => void;
}

const Button = ({
  onPress,
  buttonText,
  width,
  disabled,
}: ConfirmButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.button, { width: width }]}
      onPress={onPress}
      disabled={disabled}
    >
      <DMSans700 style={{ color: "white" }}>{buttonText}</DMSans700>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.mainGreen,
    height: 53,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
