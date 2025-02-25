import { StyleSheet, View } from "react-native";
import { Link, useRouter } from "expo-router";
import colors from "~/constants/color";
import LoginInputField from "./form/Login-input-field";
import Button from "../Button";
import KeepSignIn from "./form/Keep-sign-in";
import apiService from "~/api/apiService";
import useAlert from "~/hooks/use-alert";
import AlertPopup from "../Alert-popup";
import useCheckBox from "~/hooks/use-check-box";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "~/schema/login-schema";
import { useUserStore } from "~/store/user-store";
import { ApiResponse } from "~/types/api-response";
import { UserInfo } from "~/types/user-info";
import { AxiosResponse } from "axios";

const LoginForm = () => {
  const { setUserInfo } = useUserStore();
  const { alertOpen, setAlertOpen, alertMessage, createAlert } = useAlert();
  const { keepSignIn, onCheckedChange } = useCheckBox();

  const router = useRouter();

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
      const response = (await apiService.post(endpoint, data)) as AxiosResponse<
        ApiResponse<UserInfo>
      >;

      // Login successful
      if (response.data.ret === 0) {
        // If keep sign in is checked, set user info and isLogin in Zustand (persisted)
        if (keepSignIn) {
          setUserInfo(response.data.data);
        }

        // If not checked, just redirect to home screen
        router.replace("/(main)/home");
      } else {
        // Invalid credentials, user not exist
        createAlert({
          title: "Invalid credentials",
          content: "User not exist",
        });
      }
    } catch (error) {
      createAlert({
        title: "Network error",
        content: "Please try again later",
      });
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
      <KeepSignIn checked={keepSignIn} onCheckedChange={onCheckedChange} />

      {/* Confirm Button */}
      <Button
        buttonText="Login"
        width="100%"
        onPress={handleSubmit(handleLogin)}
      />

      {/* Alert popup, can be placed anywhere*/}
      <AlertPopup
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={alertMessage}
      />
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
