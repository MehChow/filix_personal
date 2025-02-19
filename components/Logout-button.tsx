import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useUserStore } from "~/store/user-store";

const LogoutButton = () => {
  const { clearUserInfo } = useUserStore();

  return (
    <TouchableOpacity style={styles.button} onPress={clearUserInfo}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    borderRadius: 99,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
});
