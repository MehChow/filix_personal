import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "~/store/user-store";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isPersistedLogin } = useUserStore();

  // Redirect user back to login if user is not logged in and has no persisted login
  useEffect(() => {
    if (isAuthenticated === false && isPersistedLogin === false) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isPersistedLogin, router]);

  return <>{children}</>;
};

export default AuthWrapper;
