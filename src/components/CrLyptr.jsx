import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mypage from '../pages/Mypage';
import Tour from '../pages/Tour';
import Timeline from '../pages/Timeline';
import Search from '../pages/Search';
import Header from './Header';
import Footer from './Footer';

const Clyptr = props => {
  return (
    <BrowserRouter className="App">
      <Header />
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