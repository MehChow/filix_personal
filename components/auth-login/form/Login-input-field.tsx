import { StyleSheet, TextInput, View } from "react-native";
import { DMSans400, DMSans500 } from "~/utils/dmsans-text";
import { useState } from "react";
import colors from "~/constants/color";
import Feather from "@expo/vector-icons/Feather";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { LoginSchema } from "~/schema/login-schema";

interface LoginInputFieldProps {
  control: Control<LoginSchema>;
  errors: FieldErrors<LoginSchema>;
}

const LoginInputField = ({ control, errors }: LoginInputFieldProps) => {
  // password secure text state
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Email input */}
      <View style={styles.inputContainer}>
        <DMSans500 style={styles.inputLable}>Email Address</DMSans500>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Email Address"
              placeholderTextColor={colors.textTertiary}
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && (
          <DMSans400 style={styles.errorText}>
            {errors.username && errors.username.message}
          </DMSans400>
        )}
      </View>

      {/* Password input */}
      <View style={{ gap: 4 }}>
        <DMSans500 style={styles.inputLable}>Password</DMSans500>
        <View style={styles.passwordField}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor={colors.textTertiary}
                style={styles.textInput}
                secureTextEntry={!isVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Feather
            style={styles.eyeIcon}
            name={isVisible ? "eye-off" : "eye"}
            size={20}
            color={colors.textTertiary}
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>

        {errors.password && (
          <DMSans400 style={styles.errorText}>
            {errors.password && errors.password.message}
          </DMSans400>
        )}
      </View>
    </View>
  );
};

export default LoginInputField;

const styles = StyleSheet.create({
  container: { gap: 8 },
  inputContainer: { gap: 4 },
  inputLable: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  textInput: {
    width: "100%",
    height: 48,
    paddingLeft: 12,
    borderRadius: 12,
    backgroundColor: "white",
  },
  // Wrapper, padding right to prevent triggering keyboard input when toggling the eye icon
  passwordField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingRight: 45,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
