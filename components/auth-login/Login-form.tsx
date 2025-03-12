import { StyleSheet, ToastAndroid, View } from "react-native";
import { Link, useRouter } from "expo-router";
import colors from "~/constants/color";
import LoginInputField from "./form/Login-input-field";
import Button from "../Button";
import KeepSignIn from "./form/Keep-sign-in";
import apiService from "~/api/apiService";
import useCheckBox from "~/hooks/use-check-box";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "~/schema/login-schema";
import { useUserStore } from "~/store/user-store";
import { ApiResponse } from "~/types/api-response";
import { UserInfo } from "~/types/user-info";
import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import translate from "~/services/localization/i18n";
import { useEffect } from "react";

const LoginForm = () => {
  const { setUserInfo, setIsPersistedLogin } = useUserStore();
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

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const endpoint = "/api/user.user/login";
      const response = (await apiService.post(endpoint, data)) as AxiosResponse<
        ApiResponse<UserInfo>
      >;
      return response.data;
    },
    onSuccess: (data) => {
      // Successful login
      if (data.ret === 0) {
        if (keepSignIn) {
          setIsPersistedLogin(true);
        }

        // Set user info in global store for accessing token before redirecting to comparing page
        setUserInfo(data.data);
        router.replace("/(main)/comparing");
      }
    },
  });

  const handleLogin = (data: LoginSchema) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    ToastAndroid.show(translate.t("alerts.require_login"), ToastAndroid.LONG);
  }, []);

  return (
    <View style={styles.container}>
      {/* Input field container */}
      <LoginInputField control={control} errors={errors} />

      {/* Forget password? */}
      <Link href={"/(auth)/forget-password"} style={styles.forgetPassword}>
        {translate.t("login.forget_password")}
      </Link>

      {/* Keep me signed in checkbox */}
      <KeepSignIn checked={keepSignIn} onCheckedChange={onCheckedChange} />

      {/* Confirm Button */}
      <Button
        buttonText={
          mutation.isPending
            ? translate.t("login.logging_in")
            : translate.t("login.confirm")
        }
        width="100%"
        onPress={handleSubmit(handleLogin)}
        disabled={mutation.isPending}
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
