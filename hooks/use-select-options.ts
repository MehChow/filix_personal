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
          label: translate.t("selectOptions.eys_cordyceps_mycelia_cs4_fungus"),
          value: "eys_cordyceps_mycelia_cs4_fungus",
        },
        {
          label: translate.t("selectOptions.eys_wild_cordyceps_fungus"),
          value: "eys_wild_cordyceps_fungus",
        },
      ],
      bezoar: [
        {
          label: translate.t("selectOptions.eys_bezoar"),
          value: "eys_bezoar",
        },
        {
          label: translate.t("selectOptions.btrt_bezoar"),
          value: "btrt_bezoar",
        },
        {
          label: translate.t("selectOptions.mpl_bezoar"),
          value: "mpl_bezoar",
        },
      ],
    }),
    [locale]
  );

  return { categoryOptions, productOptions };
};
