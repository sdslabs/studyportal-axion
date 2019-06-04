import React, {Component} from 'react'
import './App.css'
import Home from './pages/home'
import Test from './pages/test'
import {Switch, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/test' component={Test} />
      </Switch>
    )
  }
}

export default App;
