import React from 'react';
import './myInput.scss';

const MyInput = ({label, ...props}) => {
    return (
        <label className='custom-label'>
            {label}
            <input className="custom-input" {...props}/>
        </label>
    );
};

export default MyInput;