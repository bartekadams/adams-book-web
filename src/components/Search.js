import React from 'react';
import { searchBooks } from '../api';
import { Segment, Button, Input, Form, Header, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FieldError from './FieldError';

class Search extends React.Component {
    state = {
        searchPhrase: '',
        books: [],
        showError: false
    };

    callSearch = () => {
        if(this.state.searchPhrase.length >= 3) {
            searchBooks({ token: this.props.token, search: this.state.searchPhrase })
            .then(response => {
                console.log(response);
                if(response.status === "SUCCESS") {
                    this.setState({ books: response.data });
                }
            });
        } else {
            this.setState({ showError: true });
        }
    }

    render = () => (
        <div>
            <Header as='h3'>Wyszukiwanie</Header>
            <Segment>
                <Grid>
                    <Grid.Column>
                        <Form>
                            <Form.Field>
                                <Input
                                    onChange={(e, { value }) => this.setState({ searchPhrase: value, showError: false })}
                                    placeholder="Podaj tytuł książki"
                                    value={ this.state.searchPhrase }
                                />
                                { this.state.showError && <FieldError errors={['Wpisz co najmniej 3 znaki']}/> }
                            </Form.Field>
                            <Button type='submit' onClick={this.callSearch}>Szukaj</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
                <Grid columns='six'>
                    {
                        this.state.books.map(book => (
                            <Grid.Column key={book.id}>
                                <Segment as={ Link } to={'/books/' + book.id} className='book__link'>
                                    <div className='image__holder--small'>
                                        <Image
                                            centered
                                            src={book.book_cover.thumb.url}
                                        />
                                    </div>
                                    <Header as='h4' textAlign='center'>{book.name}</Header>
                                </Segment>
                            </Grid.Column>
                        ))
                    }
                </Grid>
            </Segment>
        </div>
    );
}

export default Search;