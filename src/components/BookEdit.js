import React from 'react';
import { getBookDetails, updateBook } from '../api';
import { Segment, Button, Input, Form, Header, Dropdown, Image, Icon, TextArea } from 'semantic-ui-react';
import FieldError from './FieldError';
import PictureForm from './PictureForm';
import { Redirect } from 'react-router-dom';

const defaultErrors = {
    author: [],
    description: [],
    genre: [],
    name: [],
    publication_date: [],
    publisher: [],
};

class BookEdit extends React.Component {
    state = {
        author: '',
        description: '',
        genre: '',
        name: '',
        publication_date: null,
        publisher: '',
        book: null,
        belongsToUser: false,
        errors: { ...defaultErrors },
        isLoading: true,
        bookCover: '',
        redirect: false
    }

    componentDidMount = () => {
        getBookDetails({
            id: this.props.match.params.id,
            token: this.props.token
       })
       .then(response => {
           if(response.status === 'SUCCESS') {
               this.setState({
                   book: response.data.book,
                   belongsToUser: response.data.ownerRequest,
                   author: response.data.book.author,
                   description: response.data.book.description,
                   genre: response.data.book.genre,
                   name: response.data.book.name,
                   publication_date: response.data.book.publication_date,
                   publisher: response.data.book.publisher,
                   isLoading: false,
                   bookCover: response.data.book.book_cover.small.url
               })
           } else if (response.status === 'ERROR') {
               this.setState({ isLoading: false });
           }
       })
    }

    refreshBookCover = (bookCover) => {
        this.setState({ bookCover: bookCover.small.url });
    }

    updateBook = () => {
        updateBook({
            token: this.props.token,
            id: this.state.book.id,
            bookData: {
                book: {
                    author: this.state.author,
                    description: this.state.description,
                    genre: this.state.genre,
                    name: this.state.name,
                    publication_date: this.state.publication_date,
                    publisher: this.state.publisher,
                }
            }
        })
        .then(response => {
            if(response.status === 'SUCCESS') {
                this.setState({ redirect: true });
            } else if (response.status === 'ERROR') {
                this.setState({
                    errors: { ...response.data },
                });
            }
        });
    };

    render = () => {
        let arr = [];
        for(let year = (new Date()).getFullYear(); year >= 1900; year--) {
            arr.push(year);
        }
        const yearOptions = arr.map(el => {
            return {
                key: el.toString(), value: el, text: el.toString()
            };
        });

        return (
            <div>
                { this.state.redirect &&
                    <Redirect to={ '/books/' + this.state.book.id } />
                }
                { !this.state.belongsToUser && !this.state.isLoading &&
                    <Segment>
                        <h3>To nie twoja książka!</h3>
                    </Segment>
                }
                { this.state.book && this.state.belongsToUser &&
                    <div>
                        <Header as='h3'>Edycja książki</Header>
                        <Segment>
                            <div className='image__holder'>
                                <Image
                                    centered
                                    src={this.state.bookCover}
                                />
                            </div>
                            <PictureForm
                                token={this.props.token}
                                id={this.state.book.id}
                                messageVisible={false}
                                redirectToBookDetails={false}
                                successCallback={this.refreshBookCover}
                            />
                            Zmiana okładki zapisuje się automatycznie.
                            <br/>
                            <br/>
                            <Form>
                                <Form.Field>
                                    <label>Tytuł</label>
                                    <Input
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                        value={ this.state.name }
                                    />
                                    <FieldError errors={this.state.errors.name || []}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Autor</label>
                                    <Input
                                        onChange={(e) => this.setState({ author: e.target.value })}
                                        value={ this.state.author }
                                    />
                                    <FieldError errors={this.state.errors.author || []}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Gatunek</label>
                                    <Input
                                        onChange={(e) => this.setState({ genre: e.target.value })}
                                        value={ this.state.genre }
                                    />
                                    <FieldError errors={this.state.errors.genre || []}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Opis</label>
                                    <TextArea
                                        onChange={(e) => this.setState({ description: e.target.value })}
                                        value={ this.state.description }
                                    />
                                    <FieldError errors={this.state.errors.description || []}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Wydawca</label>
                                    <Input
                                        onChange={(e) => this.setState({ publisher: e.target.value })}
                                        value={ this.state.publisher }
                                    />
                                    <FieldError errors={this.state.errors.publisher || []}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Data publikacji
                                        <Icon
                                            className={'times delete__icon clickable'}
                                            color={'red'}
                                            onClick={() => this.setState({ publication_date: null })}
                                        />
                                    </label>
                                    <Dropdown
                                        selection
                                        compact
                                        options={yearOptions}
                                        value={this.state.publication_date}
                                        onChange={(e, { value }) => this.setState({ publication_date: value })}
                                    />
                                    <FieldError errors={this.state.errors.publication_date || []}/>
                                </Form.Field>
                                <Button type='submit' onClick={this.updateBook} >Zapisz</Button>
                            </Form>
                        </Segment>
                    </div>
                }
            </div>
        );
    }
}

export default BookEdit;