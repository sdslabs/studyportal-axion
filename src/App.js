import React, {Component} from 'react'
import './App.css'
import Home from './pages/home'
import Test from './pages/test'
import MaterialCard from './components/materialCard'
import {Switch, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/test' render={(props) => <Test {...props} login='true' />} />
          <Route exact path='/test2' component={MaterialCard} />
      </Switch>
    )
  }
}

export default App;
