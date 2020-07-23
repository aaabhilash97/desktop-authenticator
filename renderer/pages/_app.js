import React from "react";
import App from "next/app";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "unstated";
const defaultTheme = require("../components/theme");
import { lightTheme, darkTheme } from "../components/theme";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function DynamicThemeProvider(props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...defaultTheme,
        ...(prefersDarkMode ? darkTheme : lightTheme),
      }),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Authenticator</title>
        </Head>
        <DynamicThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </DynamicThemeProvider>
      </React.Fragment>
    );
  }
}
