import React from 'react';
import { Segment, Button, Input, Form, Header } from 'semantic-ui-react';
import { apiLogin } from '../api';
import FieldError from './FieldError';

class LogInForm extends React.Component {
    state = {
        username: '',
        password: '',
        usernameErrors: [],
        passwordErrors: []
    }

    logIn = () => {
        apiLogin({
            user: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((response) => {
            if(response.status === 'SUCCESS') {
                this.props.setToken({ token: response.data.token, isAuthenticated: true });
            } else if (response.status === 'ERROR') {
                this.setState({
                    usernameErrors: response.data.username ? response.data.username.concat() : [],
                    passwordErrors: response.data.password ? response.data.password.concat() : []
                 });
            }
        })
    }

    render() {
        return (
            <div>
                <Header as='h3'>Logowanie</Header>
                <Segment id="login__form">
                    <Form>
                    <Form.Field>
                            <label>Nazwa użytkownika</label>
                            <Input
                                onChange={(e) => {
                                    const username = e.target.value;
                                    this.setState({ username });
                                }}
                                value={ this.state.username }
                                onKeyPress={(e) => {
                                    this.setState({ error: false });
                                    if(e.key === 'Enter') {
                                        this.logIn();
                                    }
                                }}
                            />
                            <FieldError errors={this.state.usernameErrors}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Hasło</label>
                            <Input
                                type='password'
                                onChange={(e) => {
                                    const password = e.target.value;
                                    this.setState({ password });
                                }}
                                value={ this.state.password }
                                onKeyPress={(e) => {
                                    this.setState({ error: false });
                                    if(e.key === 'Enter') {
                                        this.logIn();
                                    }
                                }}
                            />
                            <FieldError errors={this.state.passwordErrors}/>
                        </Form.Field>
                        <Button type='submit' onClick={this.logIn} >Zaloguj</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}

export default LogInForm;