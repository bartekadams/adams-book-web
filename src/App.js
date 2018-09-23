import React, { Component } from 'react';
import './App.css';
import LogInForm from './components/LogInForm';
import { getTokenFromLocalStorage, setTokenInLocalStorage, clearTokenInLocalStorage } from './token';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MyBooks from './components/MyBooks';
import Loans from './components/Loans';
import Search from './components/Search';
import Account from './components/Account';

class App extends Component {
  constructor(props) {
    super(props);

    const tokenFromLocalStorage = getTokenFromLocalStorage();

    this.state = {
      isAuthenticated: tokenFromLocalStorage ? true : false,
      token: tokenFromLocalStorage || ''
    };
  }

  setToken = ({ token, isAuthenticated }) => {
    if(isAuthenticated) { // login
      this.setState({ token, isAuthenticated });
      setTokenInLocalStorage(token);
    } else { // logout
      this.setState({ token: '', isAuthenticated });
      clearTokenInLocalStorage();
    }
  };

  render() {
    return (
        <Container>
          <Router>
            <div>
              <Header isAuthenticated={this.state.isAuthenticated} setToken={this.setToken}/>
              { this.state.isAuthenticated ? (
                <div>
                  <Route exact path="/" render={() => <Home />} />
                  <Route path="/mybooks" render={() => <MyBooks />} />
                  <Route path="/loans" render={() => <Loans />} />
                  <Route path="/search" render={() => <Search />} />
                  <Route path="/account" render={() => <Account />} />
                </div>
              ) : (
                <LogInForm setToken={this.setToken} />
              )}
            </div>
          </Router>
        </Container>
    );
  }
}

export default App;
