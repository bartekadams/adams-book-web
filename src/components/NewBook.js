import React from 'react';
import { createNewBook } from '../api';
import { Segment, Button, Input, Form, Header, Dropdown, Icon, TextArea } from 'semantic-ui-react'; 
import FieldError from './FieldError';
import PictureForm from './PictureForm';

const defaultErrors = {
    author: [],
    description: [],
    genre: [],
    name: [],
    publication_date: [],
    publisher: [],
};

class NewBook extends React.Component {
    state = {
        author: '',
        description: '',
        genre: '',
        id: null,
        name: '',
        publication_date: null,
        publisher: '',
        errors: { ...defaultErrors }
    };

    addNewBook = () => {
        createNewBook({
            token: this.props.token,
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
            console.log('addd', response);
            if(response.status === 'SUCCESS') {
                this.setState({ id: response.data.id });
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
            { this.state.id &&
                <Segment>
                    <PictureForm
                        token={this.props.token}
                        id={this.state.id}
                        messageVisible={true}
                        redirectToBookDetails={true}
                    />
                </Segment>
            }
            { !this.state.id &&
                <div>
                    <Header as='h3'>Dodawanie książki</Header>
                    <Segment>
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
                            <Button type='submit' onClick={this.addNewBook} >Dodaj</Button>
                        </Form>
                    </Segment>
                </div>
            }
            </div>
        );
    }
}

export default NewBook;