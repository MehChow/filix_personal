import { StyleSheet, View } from "react-native";
import { DMSans400, DMSans500, DMSans700 } from "~/utils/dmsans-text";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { SelectSchema } from "~/schema/select-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import colors from "~/constants/color";
import { getWindowWidth } from "~/utils/helper";

import translate from "~/services/localization/i18n";
import { useSelectOptions } from "~/hooks/use-select-options";

// Select dropdown box insets
const windowWidth = getWindowWidth();
const selectInset = windowWidth > 480 ? 100 : 20;

interface StepTwoProps {
  control: Control<SelectSchema>;
  errors: FieldErrors<SelectSchema>;
}

const StepTwo = ({ control, errors }: StepTwoProps) => {
  const { categoryOptions, productOptions } = useSelectOptions();

  return (
    <View style={styles.stepContainer}>
      <DMSans700 style={styles.stepTitle}>
        {translate.t("home.step_two.title")}
      </DMSans700>
      <View style={styles.selectContainer}>
        {/* Category field */}
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <DMSans500 style={styles.selectLabel}>
                {translate.t("home.step_two.category_label")}
              </DMSans500>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={translate.t("home.step_two.please_select")}
                  style={styles.placeholderText}
                />
              </SelectTrigger>
              <SelectContent
                insets={{ left: selectInset, right: selectInset }}
                className="w-full"
              >
                <SelectGroup>
                  {categoryOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <DMSans400 style={styles.errorText}>
            {translate.t(errors.category.message!)}
          </DMSans400>
        )}
      </View>
      <View style={{ gap: 4 }}>
        {/* Product name field */}
        <Controller
          name="productName"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <DMSans500 style={styles.selectLabel}>
                {translate.t("home.step_two.product_label")}
              </DMSans500>
              <SelectTrigger className="w-full ">
                <SelectValue
                  placeholder={translate.t("home.step_two.please_select")}
                  style={styles.placeholderText}
                />
              </SelectTrigger>
              <SelectContent
                insets={{ left: selectInset, right: selectInset }}
                className="w-full"
              >
                <SelectGroup>
                  {productOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.productName && (
          <DMSans400 style={styles.errorText}>
            {translate.t(errors.productName.message!)}
          </DMSans400>
        )}
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  stepContainer: { gap: 12 },
  selectContainer: { gap: 4 },
  stepTitle: {
    fontSize: 16,
    color: colors.mainGreen,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  selectLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
