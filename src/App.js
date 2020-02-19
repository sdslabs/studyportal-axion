import React, { Component } from 'react'
import './App.css'
import Home from './pages/home'
import Test from './pages/test'
import Department from './pages/department'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    }

    // function checkLogin() {
    //   //TODO check login and update accordingly
    // }
  }

  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/test' render={(props) => <Test {...props} login={this.state.login} />} />
          <Route exact path='/mycourse' render={(props) => <Department {...props} login={this.state.login} error={false}/>} />
          <Route exact path='/mycourse/departments/:department/courses/:course/:file_type?' render={(props) => <Department {...props} login={this.state.login} error={false}/>} />
          <Route exact path='/activity/:type?' render={(props) => <Department {...props} login={this.state.login} error={false}/>} />
          <Route exact path='/departments/:department' render={(props) => <Department {...props} login={this.state.login} error={false} />} />
          <Route exact path='/departments/:department/courses/:course/:file_type?' render={(props) => <Department {...props} login={this.state.login} error={false} />} />
          <Route path='*' render={(props) => <Department {...props} login={this.state.login} error />} />
      </Switch>
    )
  }
}

export default App;
