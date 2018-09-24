import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { getNewestBooks } from '../api';
import Waypoint from 'react-waypoint';

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
                            <Segment>
                                nazwa: {book.name}
                                <br/>
                                id: {book.id}
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