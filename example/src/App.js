import React from 'react'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ExamplePage from "./ExamplePage";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontSize: 22
    }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
        <ExamplePage />
    </MuiThemeProvider>
  )
}

export default App
