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
          <Route exact path='/departments/:department' render={(props) => <Department {...props} login={false} error={false} />} />
          <Route exact path='/departments/:department/courses/:course/:file_type?' render={(props) => <Department {...props} login={false} error={false} />} />
          <Route path='*' render={(props) => <Department {...props} error />} />
      </Switch>
    )
  }
}

export default App;
