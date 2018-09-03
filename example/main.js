import React from 'react';import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const ExamplePage  = require('./ExamplePage');
const theme = createMuiTheme({
    typography: {
        fontSize: 22,
      },
});

ReactDOM.render(<MuiThemeProvider theme={theme}>
                    <ExamplePage />
                </MuiThemeProvider>, document.getElementById("app"));
