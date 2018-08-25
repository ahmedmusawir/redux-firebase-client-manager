import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <section className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
