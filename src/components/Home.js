import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import { getNewestBooks } from '../api';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    state = {
        newestBooks: [],
        page: 1
    };

    loadBooks = () => {
        getNewestBooks({ token: this.props.token, page: this.state.page })
        .then(response => {
            if(response.status === 'SUCCESS') {
                this.setState( prevState => ({ newestBooks: prevState.newestBooks.concat(response.data), page: prevState.page + 1 }));
            }
        });
    }

    render = () => (
        <div>
            <Header as='h2'>Najnowsze książki</Header>
            <Grid columns='three'>
                {
                    this.state.newestBooks.map((book) => (
                        <Grid.Column key={book.id}>
                            <Segment as={ Link } to={'/books/' + book.id} className='book_link'>
                                <div className='image__holder'>
                                    <Image
                                        centered
                                        src={book.book_cover.small.url}
                                    />
                                </div>
                                <Header as='h3' textAlign='center'>{book.name}</Header>
                            </Segment>
                        </Grid.Column>
                    ))
                }
                {
                    this.state.newestBooks.length === 0 &&
                    <h2>Brak książek</h2>
                }
            </Grid>
            <Waypoint
                onEnter={this.loadBooks}
            />
        </div>
    );
}

export default Home;