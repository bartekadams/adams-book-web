import React from 'react';
import { Segment, Image, Grid, Button, Modal } from 'semantic-ui-react';
import { getBookDetails, deleteBook } from '../api';
import { Link, Redirect } from 'react-router-dom';

class BookDetails extends React.Component {
    state = {
        book: null,
        createdAtText: '',
        owner: '',
        belongsToUser: false,
        bookCoverModalOpen: false,
        deleteBookModalOpen: false,
        bookDeletedRedirect: false
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

    openBookCoverModal = () => this.setState({ bookCoverModalOpen: true })

    closeBookCoverModal = () => this.setState({ bookCoverModalOpen: false })

    openBookDeleteModal = () => this.setState({ deleteBookModalOpen: true })

    closeBookDeleteModal = () => this.setState({ deleteBookModalOpen: false })

    deleteBook = () => {
        deleteBook({
            id: this.props.match.params.id,
            token: this.props.token
        })
        .then(response => {
            if(response.status === 'SUCCESS') {
                this.setState({
                    bookDeletedRedirect: true,
                    deleteBookModalOpen: false
                });
            }
        })
    }

    render = () => (
        <div>
            { this.state.bookDeletedRedirect &&
                <Redirect to='/mybooks' />
            }
            <Modal
                open={this.state.bookCoverModalOpen}
                onClose={this.closeBookCoverModal}
                onClick={this.closeBookCoverModal}
                basic
            >
                <Image centered src={this.state.book ? this.state.book.book_cover.url : ""}/>
                <br/>
            </Modal>
            { this.state.book &&
            <Segment>
                <Modal
                    open={this.state.deleteBookModalOpen}
                    onClose={this.closeBookDeleteModal}
                    size='tiny'
                >
                    <Modal.Header>Usuwanie książki</Modal.Header>
                    <Modal.Content>
                        <p>Czy na pewno chcesz usunąć tę książkę?</p>
                        <h4>{this.state.book.name}</h4>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={this.closeBookDeleteModal}>Nie</Button>
                        <Button negative onClick={this.deleteBook}>Tak</Button>
                    </Modal.Actions>
                </Modal>
                <Grid className='book__details'>
                    <Grid.Column width={3}>
                        <Image
                            className="clickable"
                            centered
                            src={this.state.book.book_cover.small.url}
                            onClick={this.openBookCoverModal}
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
                                <Button floated='right' onClick={this.openBookDeleteModal}>Usuń</Button>
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