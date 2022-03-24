import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = ({setUserData}) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [wrongDetails, setWrongDetails] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    const password = document.getElementById('password')

    const togglePassword = () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsPending(true);

        const userDetails = {email: signInEmail, password: signInPassword}

        fetch('https://lit-dusk-59355.herokuapp.com/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
        })
        .then(resp => resp.json())
        .then((data)=>{
            if (typeof data === 'object' && data !== null) {
                setWrongDetails(null)
                setIsPending(false)
                navigate('/home')
                setUserData(data)
            } else if (data === 'Forgot username and/or password') {
                setIsPending(false)
                setWrongDetails('Username or password is incorrect');
                setSignInPassword('')
            } else if (data === 'An error occured') {
                setIsPending(false)
                setWrongDetails('An error occured');
            }
        })
    }

    return (
        <div>
            <div className='fullPage'>
                    <form 
                        className="mv4 w-100 w-50-m w-25-l w-rr center pa3"
                        onSubmit={handleSubmit}
                    >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <h1 className='tc pre-logo'>FACE-DETECTOR</h1>
                            <div className="mt3">
                                <input 
                                    className="pa2 br-pill input-reset ba bg-transparent fw6 f4 white auto-fill w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    required
                                    placeholder='Email'
                                    value={signInEmail}
                                    onChange={(e)=>{
                                        setSignInEmail(e.target.value)
                                        setWrongDetails(null)
                                    }}
                                />
                            </div>
                            <div className="pt3">
                                <input 
                                    className="pa2 br-pill input-reset ba bg-transparent fw5 f4 white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    required
                                    placeholder='Password'
                                    value={signInPassword}
                                    onChange={(e)=>{
                                        setSignInPassword(e.target.value)
                                        setWrongDetails(null)
                                    }}
                                />
                                <div title='Reveal/hide password' className="icon-div">
                                    <FontAwesomeIcon onClick={togglePassword} className='pointer mr3 icon' icon={faEyeSlash} size="1x" />
                                </div>
                            </div>
                        </fieldset>
                        <div className='f5 pt2 light-yellow db fw7'>
                            {wrongDetails}
                        </div>
                        {isPending ? <div className='tc'>
                            <span className='f4 white b'>Loading...</span>
                        </div> :
                        <div>
                            <button 
                                className="b br-pill w-100 sign-in-btn mt3 input-reset ba light-green b--light-green bg-transparent dim pointer f6 dib"
                            >Sign in</button>
                        </div>}
                        <div className="lh-copy mt3">
                            <p className='f5 pt3'>Don't have an account?</p>
                            <Link to='/signup'><p className="f6 tc light-green dim db pa2 sign-up-button">Sign up</p></Link>
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </form>
            </div>
        </div>
        
    );
}

 
export default SignIn;