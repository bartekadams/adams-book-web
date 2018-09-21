import React from 'react';
import { Segment, Header, Button, Input } from 'semantic-ui-react';
import { apiLogin } from '../api';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            response: {}
        }
    }

    logIn = () => {
        apiLogin({
            user: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((response) => {
            this.setState({
                response: { cos: response }
            });
        })
    }

    render() {
        return (
            <Segment>
                <Header as='h4'>
                    Nazwa użytkownika
                </Header>
                <Input
                    onChange={(e) => {
                        const username = e.target.value;
                        this.setState({ username });
                    }}
                    value={ this.state.username }
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            this.logIn();
                        }
                    }}
                />
                <Header as='h4'>
                    Hasło
                </Header>
                <Input
                    type="password"
                    onChange={(e) => {
                        const password = e.target.value;
                        this.setState({ password });
                    }}
                    value={ this.state.password }
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            this.logIn();
                        }
                    }}
                />
                <div>
                    <Button onClick={this.logIn}>Zaloguj</Button>
                    {JSON.stringify(this.state.response)}
                </div>
            </Segment>
        );
    }
}

export default LogInForm;