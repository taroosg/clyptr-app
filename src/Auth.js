import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './firebase';
import LoadingOverlay from 'react-loading-overlay';

const Auth = props => {

  const [signinCheck, setSigninCheck] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null)
  const handleSignedIn = currentUser => {
    setSigninCheck(true);
    setSignedIn(true);
    setUser(currentUser)
  }
  const handleSignedOut = () => {
    setSigninCheck(true);
    setSignedIn(false);
    setUser(null)
  }

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged(currentUser => {
      console.log(currentUser)
      // handleSignedIn(user)
      currentUser
        ? setUser(currentUser)
        : setUser(null);
    });
    return () => {
      unlisten();
    }
  }, [])

  return (
    <div>
      {JSON.stringify(user)}
      {
        !user
          ? <Redirect to="/signin" />
          : props.children
        // !signinCheck
        //   ? <LoadingOverlay
        //     active={true}
        //     spinner
        //     text='Loading...'
        //   >
        //     <div style={{ height: '100vh', width: '100vw' }}></div>
        //   </LoadingOverlay>
        //   : !signedIn
        //     ? <Redirect to="/signin" />
        //     : props.children
      }
    </div>
  );
}
export default Auth;
