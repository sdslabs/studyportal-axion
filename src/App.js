import React, {Component} from 'react'
import './App.css'
import Home from './pages/home'
import {Switch, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home} />
      </Switch>
    )
  }
}

export default App;
