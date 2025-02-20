import { StyleSheet, View } from "react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import colors from "~/constants/color";
import { DMSans500, DMSans700 } from "~/utils/dmsans-text";

const StepTwo = () => {
  return (
    <View style={styles.step}>
      <DMSans700 style={styles.stepTitle}>➁ PRODUCT</DMSans700>

      <Select>
        <DMSans500 style={styles.selectLabel}>Category</DMSans500>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder="Please select"
            style={styles.placeholderText}
          />
        </SelectTrigger>
        <SelectContent insets={{ left: 20, right: 20 }} className="w-full">
          <SelectGroup>
            <SelectItem label="Agarwood" value="agarwood" />
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <DMSans500 style={styles.selectLabel}>Product Name</DMSans500>
        <SelectTrigger className="w-full ">
          <SelectValue
            placeholder="Please select"
            style={styles.placeholderText}
          />
        </SelectTrigger>
        <SelectContent insets={{ left: 20, right: 20 }} className="w-full">
          <SelectGroup>
            <SelectItem
              label="A grade NYCX powder"
              value="a_grade_nycx_powder"
            />
            <SelectItem
              label="B grade NYCX powder"
              value="b_grade_nycx_powder"
            />
            <SelectItem
              label="C grade NYCX powder"
              value="c_grade_nycx_powder"
            />
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  step: {
    gap: 12,
  },
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
});
