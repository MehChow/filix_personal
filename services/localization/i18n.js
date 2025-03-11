import { I18n } from "i18n-js";
import cn from "~/services/localization/cn";
import en from "~/services/localization/en";

const i18n = new I18n({ en, cn });
i18n.defaultLocale = "en";
i18n.enableFallback = true;
i18n.locale = "en";

export default i18n;
