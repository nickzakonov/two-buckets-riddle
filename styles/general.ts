import { createStyles, StyleRules, Theme } from "@material-ui/core";

const appStyles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      marginTop: "10%",
    },
    title: {
      fontSize: "4rem",
      fontWeight: 700,
    },
    description: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(5),
      "& > code": {
        padding: "0.3rem",
        backgroundColor: "#F0F0F0",
        borderRadius: "4px",
      },
    },
    submitButton: {
      textAlign: "center",
      marginTop: theme.spacing(3),
    },
    grid: {
      marginTop: theme.spacing(5),
      fontFamily: theme.typography.fontFamily,
    },
    gridHeader: {
      "& > div": {
        fontWeight: 700,
      },
    },
  });

export default appStyles;
