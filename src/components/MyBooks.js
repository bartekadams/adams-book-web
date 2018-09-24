import React from 'react';
import { getMyBooks } from '../api';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MyBooks extends React.Component {
    state = {
        books: []
    }

    componentDidMount = () => {
        getMyBooks({ token: this.props.token })
        .then(response => {
            if(response.status === 'SUCCESS') {
                this.setState({ books: response.data })
            }
        })
    }

    render = () => (
        <div>
            <Grid columns='six'>
                {
                    this.state.books.map((book) => (
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
        </div>
    );
}

export default MyBooks;