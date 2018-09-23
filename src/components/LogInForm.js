import React from 'react';
import { Segment, Button, Input, Form } from 'semantic-ui-react';
import { apiLogin } from '../api';

class LogInForm extends React.Component {
    state = {
        username: '',
        password: '',
        response: {}
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
                response
            });
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
                                    if(e.key === 'Enter') {
                                        this.logIn();
                                    }
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Hasło</label>
                            <Input
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
                        </Form.Field>
                        <Button type='submit' onClick={this.logIn} >Zaloguj</Button>
                    </Form>
                    <div>
                        {JSON.stringify(this.state.response)}
                    </div>
                </Segment>
            </div>
        );
    }
}

export default LogInForm;