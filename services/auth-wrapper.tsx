import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "~/store/user-store";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
