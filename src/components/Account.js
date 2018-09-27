import React from 'react';
import { changePassword } from '../api';
import { Segment, Button, Input, Form, Modal } from 'semantic-ui-react';
import FieldError from './FieldError';
import { Redirect } from 'react-router-dom';

const defaultErrors = {
    password: [],
    password_confirmation: [],
    old_password: []
};

class Account extends React.Component {
    state = {
        password: '',
        password_confirmation: '',
        old_password: '',
        errors: { ...defaultErrors },
        modalOpen: false,
        redirectAfterPasswordChange: false
    };

    changePassword = () => {
        changePassword({
            token: this.props.token,
            data: {
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
                old_password: this.state.old_password
            }
        })
        .then(response => {
            console.log(response);
            if(response.status === "SUCCESS") {
                this.setState({ modalOpen: true });
            } else if(response.status === 'ERROR') {
                this.setState({
                    errors: { ...response.data },
                });
            }
        });
    }

    render = () => {
        return (
            <Segment>
                { this.state.redirectAfterPasswordChange &&
                    <Redirect to='/' />
                }
                <Modal
                    open={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false, redirectAfterPasswordChange: true })}
                    size='tiny'
                >
                    <Modal.Header>Zmiana hasła</Modal.Header>
                    <Modal.Content>
                        <p>Hasło zostało zmienione</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={() => this.setState({ modalOpen: false, redirectAfterPasswordChange: true })}>OK</Button>
                    </Modal.Actions>
                </Modal>
                <Form>
                    <Form.Field>
                        <label>Nowe hasło</label>
                        <Input
                            type='password'
                            onChange={(e, { value }) => this.setState({ password: value})}
                            value={ this.state.password }
                        />
                        <FieldError errors={this.state.errors.password || []}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Powtórz nowe hasło</label>
                        <Input
                            type='password'
                            onChange={(e, { value }) => this.setState({ password_confirmation: value})}
                            value={ this.state.password_confirmation }
                        />
                        <FieldError errors={this.state.errors.password_confirmation || []}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Podaj stare hasło</label>
                        <Input
                            type='password'
                            onChange={(e, { value }) => this.setState({ old_password: value})}
                            value={ this.state.old_password }
                        />
                        <FieldError errors={this.state.errors.old_password || []}/>
                    </Form.Field>
                    <Button type='submit' onClick={this.changePassword}>Zmień hasło</Button>
                </Form>
            </Segment>
        );
    }
}

export default Account;