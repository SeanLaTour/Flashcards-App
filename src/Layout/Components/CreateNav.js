import React from 'react';
import { Link } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';

function CreateNav() {
    return(
        <nav style={{backgroundColor: '#EBEBEB', borderRadius: '5px'}}>
            <ul className="d-flex flex-direction-row">
                <li className="m-2" style={{listStyle: 'none'}}>
                    <Link className="d-flex flex-direction-row" to="/Flashcards-App/"><House className="m-1" />Home</Link>
                </li>
                <li className="m-2" style={{listStyle: 'none'}}><p>/</p></li>
                <li className="m-2" style={{listStyle: 'none'}}>
                    <p>Create Deck</p>
                </li>
            </ul>
        </nav>
    )
}

export default CreateNav;