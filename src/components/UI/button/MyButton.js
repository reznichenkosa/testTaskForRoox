import React from 'react';
import './myButton.scss';


const MyButton = ({children, classes, ...props}) => {
    
    return (
        <button {...props} className={classes ? `myBtn ${classes}` : 'myBtn'}>
            {children}
        </button>
    );
};

export default MyButton;