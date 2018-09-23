import React from 'react';
import { Label } from 'semantic-ui-react';

const FieldError = (props) => {
    if(props.errors.length === 0) {
        return null;
    }
    
    const errors = props.errors.join(', ');
    return (
        <Label basic color='red' pointing>
            {errors}
        </Label>
    );
};

export default FieldError;