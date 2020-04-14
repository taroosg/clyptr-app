import React from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

import { AuthProvider } from './contexts/auth';

import Router from './components/Router';
import Clyptr from './components/CrLyptr';

import Signin from './pages/Signin';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // main: '#3e62ad',
      main: '#f39800',
    },
    secondary: {
      // main: '#a59aca',
      main: '#f8b862',
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider
      theme={darkTheme}
    >
      <AuthProvider>
        <Router
          renderClyptr={() => <Clyptr />}
          renderLogin={() => <Signin />}
        />
      </AuthProvider>
    </MuiThemeProvider>
  )
}

export default App;
