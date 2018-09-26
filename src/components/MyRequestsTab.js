import React from 'react';
import { Tab, Button, Table } from 'semantic-ui-react';
import { getMyLoans, deleteLoan, changeLoanStatus } from '../api';
import { Link } from 'react-router-dom';

class MyRequestsTab extends React.Component {
    state = {
        loans: []
    }

    componentDidMount = () => {
        getMyLoans({ token: this.props.token })
        .then(response => {
            console.log(response)
            if(response.status === 'SUCCESS') {
                this.setState({ loans: response.data.concat() })
            }
        })
    }

    render = () => {
        const statuses = {
            pending: "oczekująca",
            accepted: "wypożyczona",
            returned: "zwrócona"
        }

        return (
            <Tab.Pane>
                <Table basic='very'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>tytuł książki</Table.HeaderCell>
                        <Table.HeaderCell>status</Table.HeaderCell>
                        <Table.HeaderCell>utworzono</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        this.state.loans.map(loan => (
                            <Table.Row key={loan.id}>
                                <Table.Cell collapsing><Link to={'/books/' + loan.book_id}>{loan.book_title}</Link></Table.Cell>
                                <Table.Cell>{statuses[loan.status]}</Table.Cell>
                                <Table.Cell>{ (new Date(loan.created_at)).toLocaleString('pl-PL')     }</Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
            </Tab.Pane>
        );
    }
}

export default MyRequestsTab;