import { StyleSheet, View } from "react-native";
import { DMSans400, DMSans500, DMSans700 } from "~/utils/dmsans-text";
import { Control, Controller, FieldErrors, useFormContext, useWatch } from "react-hook-form";
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
import { useEffect } from "react";

// Select dropdown box insets
const windowWidth = getWindowWidth();
const selectInset = windowWidth > 480 ? 100 : 20;

interface StepTwoProps {
  control: Control<SelectSchema>;
  errors: FieldErrors<SelectSchema>;
}

const StepTwo = ({ control, errors }: StepTwoProps) => {
  const { categoryOptions, productOptions } = useSelectOptions();
  const { setValue } = useFormContext();

  // Watch the category field to get its current value
  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  // Dynamically determine product options based on selected category
  const filteredProductOptions = selectedCategory?.value
    ? productOptions[selectedCategory.value as keyof typeof productOptions] || []
    : [...productOptions.agarwood, ...productOptions.caterpillar_fungus, ...productOptions.bezoar];

  // Reset productName when selectedCategory changes
  useEffect(() => {
    setValue("productName", undefined);
  }, [selectedCategory, setValue]);

  return (
    <View style={styles.stepContainer}>
      <DMSans700 style={styles.stepTitle}>{translate.t("home.step_two.title")}</DMSans700>
      <View style={styles.selectContainer}>
        {/* Category field */}
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={(option) => onChange(option)} value={value}>
              <DMSans500 style={styles.selectLabel}>
                {translate.t("home.step_two.category_label")}
              </DMSans500>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={translate.t("home.step_two.please_select")}
                  style={styles.placeholderText}
                />
              </SelectTrigger>
              <SelectContent insets={{ left: selectInset, right: selectInset }} className="w-full">
                <SelectGroup>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} label={option.label} value={option.value} />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <DMSans400 style={styles.errorText}>{translate.t(errors.category.message!)}</DMSans400>
        )}
      </View>
      <View style={{ gap: 4 }}>
        {/* Product name field */}
        <Controller
          name="productName"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              key={selectedCategory?.value || "default"}
              onValueChange={(option) => onChange(option)} // Pass the entire option object
              value={value}
            >
              <DMSans500 style={styles.selectLabel}>
                {translate.t("home.step_two.product_label")}
              </DMSans500>
              <SelectTrigger className="w-full ">
                <SelectValue
                  placeholder={translate.t("home.step_two.please_select")}
                  style={styles.placeholderText}
                />
              </SelectTrigger>
              <SelectContent insets={{ left: selectInset, right: selectInset }} className="w-full">
                <SelectGroup>
                  {filteredProductOptions.map((option) => (
                    <SelectItem key={option.value} label={option.label} value={option.value} />
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.productName && (
          <DMSans400 style={styles.errorText}>{translate.t(errors.productName.message!)}</DMSans400>
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
