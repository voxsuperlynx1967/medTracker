import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const colors = {
    text: 'white',
    background: '#00B8FF',

  }

  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        label: {
          textTransform: "none",
        }
      }
    },
  });

  const useStyles = makeStyles({
    root: {
      color: colors.text,
      padding: "1%",
      fontFamily: "Arial",
      fontSize: "18px",
      backgroundColor: colors.background,
      "&:hover": {
        backgroundColor: colors.background
      },
    }
  })

  function MyButton(props) {
    const classes = useStyles();

    return (
      <ThemeProvider theme={theme}>
          <Button
          classes={classes}
          variant="contained"
          {...props}
          >
          </Button>
      </ThemeProvider>
    )

  }

  export default MyButton;
