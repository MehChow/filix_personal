import { StatusBar } from "react-native";

export const getStatusBarHeight = (): number => {
  return StatusBar.currentHeight || 0;
};
