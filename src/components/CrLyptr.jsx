import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Mypage from '../pages/Mypage';
import Tour from '../pages/Tour';
import Timeline from '../pages/Timeline';
import Search from '../pages/Search';

import { AuthContext } from '../contexts/auth'

const Clyptr = props => {
  const { signout } = useContext(AuthContext)
  return (
    <BrowserRouter className="App">
      <header className="App-header">
        <p>
          <Link to='/mypage'>Mypage</Link>
        </p>
        <h1>clyptr</h1>
        <p onClick={() => signout()}>
          Signout
        </p>
      </header>
      <main className="App-main">
        <Switch>
          <Route exact path='/' component={Timeline} />
          <Route exact path='/tour' component={Tour} />
          <Route exact path='/mypage' component={Mypage} />
          <Route exact path='/search' component={Search} />
        </Switch>
      </main>
      <footer className="App-footer">
        <Link to='/tour'>Tour</Link>
        <Link to='/'>Timeline</Link>
        <Link to='/search'>Search</Link>
      </footer>
    </BrowserRouter>
  )
}

export default Clyptr;