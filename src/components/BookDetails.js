import React from 'react';
import { Segment, Image, Grid } from 'semantic-ui-react';
import { getBookDetails } from '../api';

class BookDetails extends React.Component {
    state = {
        book: null,
        createdAtText: '',
        owner: ''
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
                    owner: response.data.owner,
                    createdAtText: response.data.createdAtText
                })
            }
        })
    }

    render = () => (
        <div>
            { this.state.book &&
            <Segment>
                {
                    //JSON.stringify(this.state.book)
                }
                <Grid>
                    <Grid.Column width={3}>
                        <Image centered src={this.state.book.book_cover.small.url} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <h2>{this.state.book.name}</h2>
                        <h3>Autor</h3>
                        gatunek:
                        <br/>
                        rok wydania:
                        <br/>
                        wydawnictwo:
                    </Grid.Column>
                    <Grid.Column width={16}>
                        Opis:
                        <br/>
                        Dodano: {this.state.createdAtText}
                        <br/>
                        Właściciel książki: {this.state.owner}
                    </Grid.Column>
                </Grid>
            </Segment>
            }
        </div>
    );
}

export default BookDetails;