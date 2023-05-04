export const LIGHT = "LIGHT";
export const DARK = "DARK";

export const getTheme = (theme) => {
  switch (theme) {
    case DARK:
      return {
        palette: {
          mode: "dark",
          primary: {
            main: "#13c147"
          }
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: "#000000",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "none"
              },
              colorPrimary: {
                color: "#FFFFFF"
              }
            }
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: "#000000",
                color: "#FFFFFF"
              }
            }
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: "rgba(255,255,255)"
              }
            }
          }
        }
      };

    case LIGHT:
    default:
      return {
        palette: {
          mode: "light",
          primary: {
            main: "#4A3AFF"
          }
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid rgba(0,0,0,0.2)",
                boxShadow: "none"
              },
              colorPrimary: {
                color: "#000000"
              }
            }
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: "#FFFFFF",
                color: "#000000"
              }
            }
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: "rgba(0,0,0)"
              }
            }
          }
        }
      };
  }
};
