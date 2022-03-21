import React from 'react';
import 'tachyons';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';


const Navigation = ({reset, user}) => {
    const navigate = useNavigate();
    const clickLogo = (e) => {
        navigate(0)
    }

    return (
        <nav className='flex ma0 bb b--black pa2'>
            <div onClick={clickLogo} className='instructions pointer pl2 justify-start'>
                <h1 className='logo-name'>FACE-DETECTOR</h1>
            </div>
            {user.name !== '' && <div className='instructions' style={{marginLeft: 'auto', maxHeight: '51.2px'}}><Link to='/'><h3 
                className='ma0 dim at-sign pr2 pointer black justify-end' 
                onClick={reset}
            >Sign Out</h3></Link></div>}
            
        </nav>
    );
}
 
export default Navigation;