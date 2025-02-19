import React from "react";
import { Text, TextProps } from "react-native";

// Define font weights as a type for better type checking
type FontWeight = "Regular" | "Medium" | "Bold";

// Base interface for our custom text component
interface DMSansTextProps extends TextProps {
  weight?: FontWeight;
  children: React.ReactNode;
}

// Centralized font mapping
const fontFamilyMap = {
  Regular: "DMSans_400Regular",
  Medium: "DMSans_500Medium",
  Bold: "DMSans_700Bold",
};

// Generic DMSans Text Component
const DMSansText: React.FC<DMSansTextProps> = ({
  weight = "Regular",
  style,
  children,
  ...rest
}) => {
  const fontFamily = fontFamilyMap[weight];

  return (
    <Text style={[{ fontFamily }, style]} {...rest}>
      {children}
    </Text>
  );
};

// Convenience components for each weight
export const DMSans400 = (props: Omit<DMSansTextProps, "weight">) => (
  <DMSansText weight="Regular" {...props} />
);

export const DMSans500 = (props: Omit<DMSansTextProps, "weight">) => (
  <DMSansText weight="Medium" {...props} />
);

export const DMSans700 = (props: Omit<DMSansTextProps, "weight">) => (
  <DMSansText weight="Bold" {...props} />
);
