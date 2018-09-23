import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { getNewestBooks } from '../api';

class Home extends React.Component {
    state = {
        newestBooks: []
    };

    componentDidMount = () => {
        getNewestBooks({ token: this.props.token })
        .then(response => {
            if(response.status === 'SUCCESS') {
                this.setState({ newestBooks: response.data });
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
                                {book.name}
                                <br/>
                                {book.created_at}
                            </Segment>
                        </Grid.Column>
                    ))
                }
                {
                    this.state.newestBooks.length === 0 &&
                    <h2>Brak książek</h2>
                }
            </Grid>
        </div>
    );
}

export default Home;