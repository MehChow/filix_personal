import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import AuthWrapper from "~/services/auth-wrapper";

export default function MainLayout() {
  return (
    <AuthWrapper>
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
          <Stack.Screen name="result" />
        </Stack>
      </View>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});
