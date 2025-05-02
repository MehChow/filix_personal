import { useMemo } from "react";
import { useLanguage } from "~/context/language-context";
import translate from "~/services/localization/i18n";

export const useSelectOptions = () => {
  const { locale } = useLanguage();

  const categoryOptions = useMemo(
    () => [{ label: translate.t("selectOptions.agarwood"), value: "agarwood" }],
    [locale]
  );

  const productOptions = useMemo(
    () => [
      {
        label: translate.t("selectOptions.nycx_agarwood_a"),
        value: "nycx_agarwood_a",
      },
      {
        label: translate.t("selectOptions.nycx_agarwood_b"),
        value: "nycx_agarwood_b",
      },
      {
        label: translate.t("selectOptions.nycx_agarwood_c"),
        value: "nycx_agarwood_c",
      },
    ],
    [locale]
  );

  return { categoryOptions, productOptions };
};
