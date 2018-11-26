import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ExamplePage from "./ExamplePage";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontSize: 22
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <ExamplePage />
    </MuiThemeProvider>,
    document.getElementById("app")
);
