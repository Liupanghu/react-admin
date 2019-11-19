import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import soutes from './config/routes'
import './index.less'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {
            soutes.map((route, index) => {
              return <Route{...route} key={index} />
            })
          }
        </Switch>
      </Router>
    )
  }
}
