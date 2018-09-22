import React, { Component } from 'react';
import './App.css';
import LogInForm from './components/LogInForm';
import { Container } from 'semantic-ui-react';

class App extends Component {

  render() {
    return (
        <Container>
          <LogInForm/>
        </Container>
    );
  }
}

export default App;
