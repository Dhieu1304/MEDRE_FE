import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { DARK, LIGHT } from "../../config/themeConfig";
import { useAppConfigStore } from "../../store/AppConfigStore";
import { useTranslation } from "react-i18next";
export default function SettingPage() {
  const { t, i18n } = useTranslation("settingPage");
  const { mode, setMode, locale, setLocale } = useAppConfigStore();
  const [checkedTheme, setCheckedTheme] = React.useState(mode);
  const handleChangeTheme = () => {
    setCheckedTheme(checkedTheme === LIGHT ? DARK : LIGHT);
    setMode(checkedTheme === LIGHT ? DARK : LIGHT);
  };

  const [checkedLanguage, setCheckedLanguage] = React.useState(locale);
  const handleChangeLanguage = () => {
    setCheckedLanguage(checkedLanguage === "Tiếng Việt" ? "English" : "Tiếng Việt");
    setLocale(checkedLanguage === "Tiếng Việt" ? "English" : "Tiếng Việt");
    i18n.changeLanguage(checkedLanguage === "Tiếng Việt" ? "en" : "vi");
  };

  return (
    <div>
      <div> {t("title")} </div>
      <div>
        <span> {t("theme_label")} </span>
        <FormControlLabel
          control={<Switch checked={checkedTheme === DARK ? true : false} onChange={handleChangeTheme} />}
          label={checkedTheme.slice(0, 1) + checkedTheme.slice(1, checkedTheme.length + 1).toLowerCase()}
        ></FormControlLabel>
      </div>
      <div>
        <span> {t("language_label")} </span>
        <FormControlLabel
          control={<Switch checked={checkedLanguage === "Tiếng Việt" ? true : false} onChange={handleChangeLanguage} />}
          label={checkedLanguage === "Tiếng Việt" ? "Tiếng Việt" : "English"}
        ></FormControlLabel>
      </div>
    </div>
  );
}
