import { StatusBar } from "react-native";

export const getStatusBarHeight = (): number => {
  return StatusBar.currentHeight || 0;
};

export const getIndicatorColor = (similarityValue: number) => {
  if (similarityValue >= 90) {
    return ["bg-[#55BB7F]", "text-[#55BB7F]"];
  } else if (similarityValue >= 20) {
    return ["bg-[#F2C94C]", "text-[#F2C94C]"];
  } else {
    return ["bg-[#FF4242]", "text-[#FF4242]"];
  }
};
