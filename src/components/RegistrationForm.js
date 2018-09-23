import React from 'react';
import { Segment, Button, Input, Form, Header } from 'semantic-ui-react';
import { apiRegister } from '../api';
import FieldError from './FieldError';

class RegistrationForm extends React.Component {
    state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        usernameErrors: [],
        passwordErrors: [],
        passwordConfirmationErrors: []
    }

    register = () => {
        apiRegister({
            user: {
                username: this.state.username,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            }
        })
        .then((response) => {
            if(response.status === 'SUCCESS') {
                this.props.setToken({ token: response.data.token, isAuthenticated: true });
            } else if (response.status === 'ERROR') {
                this.setState({
                    usernameErrors: response.data.username ? response.data.username.concat() : [],
                    passwordErrors: response.data.password ? response.data.password.concat() : [],
                    passwordConfirmationErrors: response.data.password_confirmation ? response.data.password_confirmation.concat() : []
                });
            }
        })
    }

    render() {
        return (
            <div>
                <Header as='h3' id="header">Rejestracja</Header>
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
                                    if(e.key === 'Enter') {
                                        this.register();
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
                                    if(e.key === 'Enter') {
                                        this.register();
                                    }
                                }}
                            />
                            <FieldError errors={this.state.passwordErrors}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Potwierdzenie hasła</label>
                            <Input
                                type='password'
                                onChange={(e) => {
                                    const password = e.target.value;
                                    this.setState({ passwordConfirmation: password });
                                }}
                                value={ this.state.passwordConfirmation }
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter') {
                                        this.register();
                                    }
                                }}
                            />
                            <FieldError errors={this.state.passwordConfirmationErrors}/>
                        </Form.Field>
                        <Button type='submit' onClick={this.register} >Zarejestruj</Button>
                    </Form>
                    <div>
                        {JSON.stringify(this.state.response)}
                    </div>
                </Segment>
            </div>
        );
    }
}

export default RegistrationForm;