import React, { Component } from 'react';
import './App.css';
import { getTokenFromLocalStorage, setTokenInLocalStorage, clearTokenInLocalStorage } from './token';
import { Container, Divider } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LogInForm from './components/LogInForm';
import RegistrationForm from './components/RegistrationForm';
import Header from './components/Header';
import Home from './components/Home';
import MyBooks from './components/MyBooks';
import Loans from './components/Loans';
import Search from './components/Search';
import Account from './components/Account';
import BookDetails from './components/BookDetails';
import BookEdit from './components/BookEdit';
import NewBook from './components/NewBook';

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
                  <Route exact path="/" render={() => <Home token={this.state.token} />} />
                  <Route path="/mybooks" render={() => <MyBooks token={this.state.token} />} />
                  <Route path="/loans" render={() => <Loans />} />
                  <Route path="/search" render={() => <Search />} />
                  <Route path="/account" render={() => <Account />} />
                  <Route path="/newbook" render={() => <NewBook token ={this.state.token} />} />
                  <Route exact path="/books/:id" render={({ match }) => <BookDetails match={match} token={this.state.token} />} />
                  <Route path="/books/:id/edit" render={({ match }) => <BookEdit match={match} token={this.state.token} />} />
                </div>
              ) : (
                <div>
                  <LogInForm setToken={this.setToken} />
                  <RegistrationForm setToken={this.setToken} />
                </div>
              )}
              <Divider hidden />
            </div>
          </Router>
        </Container>
    );
  }
}

export default App;
