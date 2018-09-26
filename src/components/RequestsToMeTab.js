import React from 'react';
import { Button, Tab, Table } from 'semantic-ui-react';
import { getOtherLoans, deleteLoan, changeLoanStatus } from '../api';
import { Link } from 'react-router-dom';

class RequestsToMeTab extends React.Component {
    state = {
        loans: []
    }

    componentDidMount = () => {
        getOtherLoans({ token: this.props.token })
        .then(response => {
            if(response.status === 'SUCCESS') {
                this.setState({ loans: response.data.concat() })
            }
        })
    }

    changeLoanStatus = (id, status) => {
        changeLoanStatus({
            token: this.props.token,
            id,
            newStatusData: {
                loan: {
                    status
                }
            }
        })
        .then(response => {
            if(response.status === 'SUCCESS') {
                console.log(response);
                //this.setState({ loans: response.data.concat() })
            } else if(response.status === 'ERROR') {
                console.log(response);
            }
        })
    }

    reject = (id) => {
        deleteLoan({ token: this.props.token, id })
        .then(response => {
            if(response.status === 'SUCCESS') {

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
                        <Table.HeaderCell>wypożyczający</Table.HeaderCell>
                        <Table.HeaderCell>status</Table.HeaderCell>
                        <Table.HeaderCell/>
                        <Table.HeaderCell/>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        this.state.loans.map(loan => (
                            <Table.Row key={loan.id}>
                                <Table.Cell><Link to={'/books/' + loan.book_id}>{loan.book_title}</Link></Table.Cell>
                                <Table.Cell>{loan.borrower_username}</Table.Cell>
                                <Table.Cell>{statuses[loan.status]}</Table.Cell>
                                <Table.Cell collapsing>
                                    {
                                        loan.status === 'pending' &&
                                        <Button content='Wypożycz' icon='check' labelPosition='right' onClick={() => this.changeLoanStatus(loan.id, "accepted")}/>
                                    }
                                </Table.Cell>
                                <Table.Cell collapsing>
                                    {
                                        loan.status === 'pending' &&
                                        <Button content='Odrzuć' icon='close' labelPosition='right' color='red' onClick={() => this.reject(loan.id)}/>
                                    }
                                    {
                                        loan.status === 'accepted' &&
                                        <Button content='Oddano' icon='check' labelPosition='right' onClick={() => this.changeLoanStatus(loan.id, "returned")}/>
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
            </Tab.Pane>
        );
    }
}

export default RequestsToMeTab;