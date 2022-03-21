import React from 'react';
import './Rank.css';

const Rank = ({user}) => {
    return (
        <>
            <h2 className='mt0 rank'>{user.name}, you have made #{user.entries} {user.entries === 1 ? <span>entry</span> : <span>entries</span>}</h2>
        </>
    );
}
 
export default Rank;
