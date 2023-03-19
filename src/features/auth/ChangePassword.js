import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";

export default function ChangePassword() {
  const [theme, setTheme] = React.useState(false);
  const [language, setLanguage] = React.useState(false);
  const [dataTheme, setDataTheme] = React.useState("Light");
  const [dataLanguage, setDataLanguage] = React.useState("ENG");
  const themeChange = () => {
    setTheme(!theme);
    if (theme == true) setDataTheme("Dark");
    else setDataTheme("Light");
  };
  const languageChange = () => {
    setLanguage(!language);
    if (language == true) setDataLanguage("VIE");
    else setDataLanguage("ENG");
  };
  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <FormControlLabel control={<Switch checked={theme} onChange={themeChange} name="theme" />} label={dataTheme} />
        <FormControlLabel
          control={<Switch checked={language} onChange={languageChange} name="language" />}
          label={dataLanguage}
        />
      </FormGroup>
    </FormControl>
  );
}
