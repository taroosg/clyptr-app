import React, { useState, useEffect } from 'react';
import './App.css';
import Signin from './pages/Signin';
// import Mypage from './pages/Mypage';
// import Tour from './pages/Tour';
// import Timeline from './pages/Timeline';
// import Search from './pages/Search';
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import firebase from './firebase';
// import LoadingOverlay from 'react-loading-overlay';

import { AuthProvider } from './contexts/auth';
import Router from './components/Router';
import Clyptr from './components/CrLyptr';
// import Auth from './Auth';

const App = () => {
  return (
    <AuthProvider>
      <Router
        renderClyptr={() => <Clyptr />}
        renderLogin={() => <Signin />}
      />
    </AuthProvider>
  )
  // const [signinCheck, setSigninCheck] = useState(false);
  // const [user, setUser] = useState(null)
  // useEffect(() => {
  //   const unlisten = firebase.auth().onAuthStateChanged(currentUser => {
  //     console.log(currentUser)
  //     // handleSignedIn(user)
  //     currentUser
  //       ? setUser(currentUser)
  //       : setUser(null);
  //   });
  //   return () => {
  //     unlisten();
  //   }
  // }, [])

  // const signout = () => {
  //   firebase.auth().signOut();
  // }

  // return (
  //   !user
  //     ? <Signin />
  //     :
  //     <BrowserRouter className="App">
  //       {/* <Switch> */}
  //       <Route exact path='/signin' component={Signin} />
  //       {/* <Auth> */}
  //       {/* <Switch> */}
  //       <header className="App-header">
  //         <p>
  //           <Link to='/mypage'>Mypage</Link>
  //         </p>
  //         <h1>clyptr</h1>
  //         <p onClick={() => signout()}>
  //           Signout
  //             </p>
  //       </header>
  //       <main className="App-main">
  //         <Route exact path='/' component={Timeline} />
  //         <Route exact path='/tour' component={Tour} />
  //         <Route exact path='/mypage' component={Mypage} />
  //         <Route exact path='/search' component={Search} />
  //       </main>
  //       <footer className="App-footer">
  //         <Link to='/tour'>Tour</Link>
  //         <Link to='/'>Timeline</Link>
  //         <Link to='/search'>Search</Link>
  //       </footer>
  //       {/* </Switch> */}
  //       {/* </Auth> */}
  //       {/* </Switch> */}
  //     </BrowserRouter>
  // );
}

export default App;
