import React from 'react';
import { Segment } from 'semantic-ui-react';

const BookDetails = ({ match }) => (
    <Segment>
        Book details
        {JSON.stringify(match.params)}
    </Segment>
);

export default BookDetails;