import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing.jsx'
import Home from './Home.jsx'

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/home' component={Home}/>
          <Route path='/all-books' component={Home}/>
        </Switch>
      </main>
    )
  }
}
