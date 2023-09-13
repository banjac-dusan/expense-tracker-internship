import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Buttons = (props) => {
    const navigate = useNavigate()
    return (
            <Button onClick={props.handleClick}>{props.label}</Button>
    );
}

export default Buttons;