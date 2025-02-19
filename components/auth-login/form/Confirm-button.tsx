import { StyleSheet, TouchableOpacity } from "react-native";
import { DMSans700 } from "~/utils/dmsans-text";
import colors from "~/constants/color";

interface ConfirmButtonProps {
  onPress: () => void;
}

const ConfirmButton = ({ onPress }: ConfirmButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.button}
      onPress={onPress}
    >
      <DMSans700 style={{ color: "white" }}>Confirm</DMSans700>
    </TouchableOpacity>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.mainGreen,
    height: 53,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});
