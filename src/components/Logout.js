import React from 'react';
import { Button } from 'reactstrap';


const Logout = (props) => {
    return (
        <div>
            <h3>Hello, {props.user.username}</h3>
            <Button color="danger" onClick={props.clearAuthData}>Logout</Button>
        </div>
    )
}

export default Logout