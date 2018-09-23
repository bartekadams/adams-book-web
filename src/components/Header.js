import React from 'react';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render = () => (        
        <Segment inverted id="header">
            <Menu inverted secondary size='large'>
                <Menu.Item>
                    <Icon name='book' size='big' />
                </Menu.Item>
                <Menu.Item
                    as={ Link }
                    to="/home"
                    name='home'
                    active={this.state.activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    Strona główna
                </Menu.Item>
                { this.props.isAuthenticated && 
                    <Menu.Item
                        as={ Link }
                        to="/mybooks"
                        name='mybooks'
                        active={this.state.activeItem === 'mybooks'}
                        onClick={this.handleItemClick}
                    >
                        Moje książki
                    </Menu.Item>
                }
                { this.props.isAuthenticated && 
                    <Menu.Item
                        as={ Link }
                        to="/loans"
                        name='loans'
                        active={this.state.activeItem === 'loans'}
                        onClick={this.handleItemClick}
                    >
                        Wypożyczenia
                    </Menu.Item>
                }
                { this.props.isAuthenticated && 
                    <Menu.Item
                        as={ Link }
                        to="/search"
                        name='search'
                        active={this.state.activeItem === 'search'}
                        onClick={this.handleItemClick}
                    >
                        Szukaj
                    </Menu.Item>
                }
                { this.props.isAuthenticated &&
                    <Menu.Item
                        as={ Link }
                        to="/account"
                        name='account'
                        active={this.state.activeItem === 'account'}
                        position='right'
                        onClick={this.handleItemClick}
                    >
                        <Icon name='user' />
                        Moje konto
                    </Menu.Item>
                }
                { this.props.isAuthenticated && 
                    <Menu.Item
                        name='logout'
                        onClick={() => this.props.setToken({ isAuthenticated: false })}
                    >
                        Wyloguj
                    </Menu.Item>
                }
            </Menu>
        </Segment>
    );
}

export default Header;