import React from 'react'
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";
import ExamplePage from "./ExamplePage";

const theme = createTheme(adaptV4Theme({
    typography: {
        useNextVariants: true,
        fontSize: 22
    }
}));

const App = () => {
  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
              <ExamplePage />
          </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App
