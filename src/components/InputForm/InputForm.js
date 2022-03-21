import React  from 'react';
import './InputForm.css'


const InputForm = ({input, onInputChange, onSubmit}) => {


    return (
        <>
            <p className='txt'>Enter image link address below:</p>           
            <form className='center flex w-70' onSubmit={onSubmit}>
                <input 
                    title='Paste image link'
                    value={input}
                    type='text' 
                    className='w-80 pa1 white' 
                    onChange={onInputChange}
                />
                <button title='Detect faces' className='w-20 pa1 detect-btn pointer'>Detect</button>
            </form>            
        </>
    );
}
 
export default InputForm;