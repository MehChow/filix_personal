import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "~/store/user-store";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLogin } = useUserStore();

  useEffect(() => {
    if (isLogin === false) {
      router.replace("/(auth)/login");
    }
  }, [isLogin, router]);

  if (isLogin === false) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
