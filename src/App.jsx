import React from 'react';
import './App.css';

import { AuthProvider } from './contexts/auth';

import Router from './components/Router';
import Clyptr from './components/CrLyptr';

import Signin from './pages/Signin';

const App = () => {
  return (
    <AuthProvider>
      <Router
        renderClyptr={() => <Clyptr />}
        renderLogin={() => <Signin />}
      />
    </AuthProvider>
  )
}

export default App;
