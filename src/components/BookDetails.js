import React from 'react';
import { Segment, Image, Grid, Button, Modal } from 'semantic-ui-react';
import { getBookDetails } from '../api';
import { Link } from 'react-router-dom';

class BookDetails extends React.Component {
    state = {
        book: null,
        createdAtText: '',
        owner: '',
        belongsToUser: false,
        modalOpen: false
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
                    createdAtText: response.data.createdAtText,
                    belongsToUser: response.data.ownerRequest
                })
            }
        })
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => this.setState({ modalOpen: false })

    render = () => (
        <div>
            <Modal
                open={this.state.modalOpen}
                onClose={this.closeModal}
                onClick={this.closeModal}
                basic
            >
                <Image centered src={this.state.book ? this.state.book.book_cover.url : ""}/>
                <br/>
            </Modal>
            { this.state.book &&
            <Segment>
                <Grid className='book__details'>
                    <Grid.Column width={3}>
                        <Image
                            className="clickable"
                            centered
                            src={this.state.book.book_cover.small.url}
                            onClick={this.openModal}
                        />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <h2>{this.state.book.name}</h2>
                        <h3>{this.state.book.author}</h3>
                        <span>gatunek:</span> {this.state.book.genre}
                        <br/>
                        <span>rok wydania:</span> {this.state.book.publication_date}
                        <br/>
                        <span>wydawnictwo:</span> {this.state.book.publisher}
                    </Grid.Column>
                    <Grid.Column width={16}>
                    <span>Opis:</span> {this.state.book.description}
                        <br/><br/>
                        <span>Dodano:</span> {this.state.createdAtText} przez {this.state.owner}
                        {
                            this.state.belongsToUser &&
                            <div>
                                <br/>
                                <Button as={ Link } to={'/books/' + this.state.book.id + '/edit'}>Edytuj</Button>
                            </div>
                        }
                    </Grid.Column>
                </Grid>
            </Segment>
            }
        </div>
    );
}

export default BookDetails;