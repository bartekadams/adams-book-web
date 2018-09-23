import React, { Component } from 'react';
import './App.css';
import LogInForm from './components/LogInForm';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MyBooks from './components/MyBooks';
import Loans from './components/Loans';
import Search from './components/Search';
import Account from './components/Account';

class App extends Component {
  state = {
    isAuthenticated: true
  };

  render() {
    return (
        <Container>
          <Router>
            <div>
              <Header isAuthenticated={this.state.isAuthenticated}/>
              { this.state.isAuthenticated ? (
                <div>
                  <Route exact path="/" render={() => <Home />} />
                  <Route path="/mybooks" render={() => <MyBooks />} />
                  <Route path="/loans" render={() => <Loans />} />
                  <Route path="/search" render={() => <Search />} />
                  <Route path="/account" render={() => <Account />} />
                </div>
              ) : (
                <LogInForm/>
              )}
            </div>
          </Router>
        </Container>
    );
  }
}

export default App;
