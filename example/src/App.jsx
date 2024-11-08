import React from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ExamplePage from "./ExamplePage";

const theme = createTheme({
    typography: {
        useNextVariants: true,
        fontSize: 22
    }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ExamplePage />
    </ThemeProvider>
  );
}

export default App
