import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { getWindowWidth } from "~/utils/helper";

const windowWidth = getWindowWidth();

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="home" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth > 480 ? 100 : 20,
  },
});
