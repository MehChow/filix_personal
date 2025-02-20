import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
            marginTop: StatusBar.currentHeight,
          },
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="comparing" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});
