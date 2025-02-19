import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import colors from "~/constants/color";
import LoginInputField from "./form/Login-input-field";
import ConfirmButton from "./form/Confirm-button";
import KeepSignIn from "./form/Keep-sign-in";
import apiService from "~/api/apiService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "~/schema/login-schema";
import { useUserStore } from "~/store/user-store";

const LoginForm = () => {
  const { setUserInfo } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const endpoint = "/api/user.user/login";
      const response = await apiService.post(endpoint, data);

      if (response.ret === 0) {
        // Login successful, set userInfo and isLogin to true
        setUserInfo(response.data);
      } else if (response.ret === 1) {
        // Invalid credentials, user not exist

        // TODO: Add toast
        console.log("User not exist");
      } else {
        console.log("Unknown error when login?????");
      }
    } catch (error) {
      console.error("Auth Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input field container */}
      <LoginInputField control={control} errors={errors} />

      {/* Forget password? */}
      <Link href={"/(auth)/forget-password"} style={styles.forgetPassword}>
        Forget Password?
      </Link>

      {/* Keep me signed in checkbox */}
      <KeepSignIn />

      {/* Confirm Button */}
      <ConfirmButton onPress={handleSubmit(handleLogin)} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  forgetPassword: {
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    color: colors.primary1,
    fontFamily: "DMSans_700Bold",
  },
});
