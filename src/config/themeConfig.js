export const LIGHT = "LIGHT";
export const DARK = "DARK";

export const getTheme = (theme) => {
  switch (theme) {
    case DARK:
      return {
        palette: {
          mode: "dark"
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "10px",
                padding: "10px 20px"
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
          }
        }
      };
  }
};
