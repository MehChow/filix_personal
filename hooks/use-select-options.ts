import { useMemo } from "react";
import { useLanguage } from "~/context/language-context";
import translate from "~/services/localization/i18n";

export const useSelectOptions = () => {
  const { locale } = useLanguage();

  const categoryOptions = useMemo(
    () => [
      { label: translate.t("selectOptions.agarwood"), value: "agarwood" },
      { label: translate.t("selectOptions.caterpillar_fungus"), value: "caterpillar_fungus" },
      { label: translate.t("selectOptions.bezoar"), value: "bezoar" },
    ],
    [locale]
  );

  const productOptions = useMemo(
    () => ({
      agarwood: [
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
      caterpillar_fungus: [
        {
          label: translate.t("selectOptions.btrt_fungus"),
          value: "btrt_fungus",
        },
        {
          label: translate.t("selectOptions.mpl_fungus"),
          value: "mpl_fungus",
        },
        {
          label: translate.t("selectOptions.eys_fungus"),
          value: "eys_fungus",
        },
      ],
      bezoar: [
        {
          label: translate.t("selectOptions.eys_bezoar_capsule"),
          value: "eys_bezoar_capsule",
        },
        {
          label: translate.t("selectOptions.eys_bezoar_cs4"),
          value: "eys_bezoar_cs4",
        },
      ],
    }),
    [locale]
  );

  return { categoryOptions, productOptions };
};
