import { StatusBar } from "react-native";
import * as Location from "expo-location";

export const getStatusBarHeight = (): number => {
  return StatusBar.currentHeight || 0;
};

export const askForLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission not granted");
    return;
  }
};
