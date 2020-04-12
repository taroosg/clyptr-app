import React, { useState, useEffect, createContext } from 'react';
import firebase from '../firebase';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUser(user))
  }, [])

  const signout = () => {
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(user => setCurrentUser(user))
  }

  return (
    <AuthContext.Provider value={{ currentUser, signout }}>
      {children}
    </AuthContext.Provider>
  )

}

export { AuthContext, AuthProvider }
