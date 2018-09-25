import React from 'react';
import { Segment } from 'semantic-ui-react';

class PictureForm extends React.Component {
    state = {
        book_cover: null,
        errors: {
            book_cover: []
        }
    }

    render = () => {
        return (
            <Segment>
                PictureForm
            </Segment>
        );
    }
}

export default PictureForm;