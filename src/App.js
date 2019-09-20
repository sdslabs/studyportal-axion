import React, { Component } from 'react'
import './App.css'
import Home from './pages/home'
import Test from './pages/test'
import Department from './pages/department'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/test' render={(props) => <Test {...props} login={false} />} />
          <Route exact path='/:department/id=:id_department' render={(props) => <Department {...props} login={false} />} />
          <Route exact path='/:department/id=:id_department/:course/id=:id_course' render={(props) => <Department {...props} login={false} />} />
      </Switch>
    )
  }
}

export default App;
