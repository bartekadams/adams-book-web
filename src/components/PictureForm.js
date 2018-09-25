import React from 'react';
import { Segment, Form, Message, Input } from 'semantic-ui-react';
import { addBookCover } from '../api';
import FieldError from './FieldError';
import { Redirect, Link } from 'react-router-dom';

class PictureForm extends React.Component {
    state = {
        bookCover: '',
        messageVisible: this.props.messageVisible,
        imageUploaded: false,
        errors: {
            book_cover: []
        }
    }

    sendBookCover = (e, { value }) => {
        let data = new FormData();
        data.append('book_cover', e.target.files[0]);

        addBookCover({
            data,
            token: this.props.token,
            id: this.props.id
        })
        .then(response => {
            console.log(response);
            if(response.status === 'SUCCESS') {
                this.setState({ imageUploaded: true });
            } else if (response.status === 'ERROR') {
                this.setState({ errors: { ...response.data } });
            }
        })

        this.setState({ bookCover: value });
    }

    render = () => {
        return (
            <Segment>
                {
                    this.state.imageUploaded && <Redirect to={ '/books/' + this.props.id } />
                }
                {
                    this.state.messageVisible &&
                    <Message positive onDismiss={() => this.setState({ messageVisible: false })}>
                        <Message.Header>Książka dodana pomyślnie</Message.Header>
                        <p>
                        Jeżeli chcesz, możesz do niej przejść <Link to={'/books/' + this.props.id}><b>tutaj</b></Link> lub dodać jej okładkę.
                        </p>
                    </Message>
                }
                <Form>
                    <Form.Field>
                        <label>Okładka książki</label>
                        <Input
                            type='file'
                            onChange={ this.sendBookCover }
                            value={ this.state.bookCover }
                        />
                        <FieldError errors={this.state.errors.book_cover || []}/>
                    </Form.Field>
                </Form>
            </Segment>
        );
    }
}

export default PictureForm;