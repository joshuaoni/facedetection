import React from 'react';
import 'tachyons';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='not-found'>
            <h1 className='f2'>Oooooooops...</h1>
            <h1>error 404 :(</h1>
            <h3 className='f3'>Looks like the link you clicked did not match any of our documents</h3>
            <Link className='f3 fw7' to='/'>Go back to login</Link>
        </div>
    );
}
 
export default NotFound;