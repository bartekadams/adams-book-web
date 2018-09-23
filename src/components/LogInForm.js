import React from 'react';
import { Segment, Button, Input, Form, Message } from 'semantic-ui-react';
import { apiLogin } from '../api';

class LogInForm extends React.Component {
    state = {
        username: '',
        password: '',
        error: false
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
                this.setState({ error: true });
            }
        })
    }

    render() {
        return (
            <div>
                <Segment>
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
                        </Form.Field>
                        <Button type='submit' onClick={this.logIn} >Zaloguj</Button>
                    </Form>
                    <div>
                        {JSON.stringify(this.state.response)}
                    </div>
                    {this.state.error &&
                        <Message
                            error
                            header='Błąd logowania'
                            content='Błędny login lub hasło.'
                        />
                    }
                </Segment>
            </div>
        );
    }
}

export default LogInForm;