import { Stack } from "expo-router";
import AuthWrapper from "~/services/auth-wrapper";
import { getStatusBarHeight } from "~/utils/helper";

const barHeight = getStatusBarHeight();

export default function ProtectedLayout() {
  return (
    <AuthWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="comparing" />
        <Stack.Screen name="result" />
      </Stack>
    </AuthWrapper>
  );
}
