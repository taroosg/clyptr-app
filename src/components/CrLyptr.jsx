import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Mypage from '../pages/Mypage';
import Tour from '../pages/Tour';
import Timeline from '../pages/Timeline';
import Search from '../pages/Search';
import Header from './Header';
import Footer from './Footer';

import { AuthContext } from '../contexts/auth'
import zIndex from '@material-ui/core/styles/zIndex';

const Clyptr = props => {
  const { signout } = useContext(AuthContext)
  return (
    <BrowserRouter className="App">
      <Header />
      {/* <header className="App-header">
        <p>
          <Link to='/mypage'>Mypage</Link>
        </p>
        <p>clyptr</p>
        <p onClick={() => window.confirm('Sign Out??') ? signout() : false}>
          Signout
        </p>
      </header> */}
      <main className="App-main">
        <Switch>
          <Route exact path='/' component={Timeline} />
          <Route exact path='/tour' component={Tour} />
          <Route exact path='/mypage' component={Mypage} />
          <Route exact path='/search' component={Search} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default Clyptr;