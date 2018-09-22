import React from 'react';
import { Segment, Button, Input, Form, Menu, Icon } from 'semantic-ui-react';
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
                response
            });
        })
    }

    render() {
        return (
            <div>
                <Segment inverted>
                    <Menu inverted secondary size='large'>
                        <Menu.Item>
                            <Icon name='book' size='big' />
                        </Menu.Item>
                        <Menu.Item
                            name='home'
                            content='Strona główna'
                            active={true}
                            onClick={() => {}}
                        />
                        <Menu.Item
                            name='my_books'
                            content='Moje książki'
                            active={false}
                            onClick={() => {}}
                        />
                        <Menu.Item
                            name='loans'
                            content='Wypożyczenia'
                            active={false}
                            onClick={() => {}}
                        />
                        <Menu.Item
                            name='search'
                            content='Szukaj'
                            active={false}
                            onClick={() => {}}
                        />
                        <Menu.Item
                            name='account'
                            content='Konto'
                            position='right'
                            onClick={() => {}}
                        >
                            #nazwa użykownika
                            <Icon name='user' size='large' />
                        </Menu.Item>
                    </Menu>
                </Segment>
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