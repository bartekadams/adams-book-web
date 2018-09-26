import React from 'react';
import { Tab } from 'semantic-ui-react';
import MyRequestsTab from './MyRequestsTab';
import RequestsToMeTab from './RequestsToMeTab';


class Loans extends React.Component {
    render = () => {
        const panes = [
            { menuItem: 'Prośby innych osób', render: () => <RequestsToMeTab token={this.props.token} />},
            { menuItem: 'Moje prośby', render: () => <MyRequestsTab token={this.props.token} />}
        ];

        return (
            <Tab panes={panes} />
        );
    }
}

export default Loans;