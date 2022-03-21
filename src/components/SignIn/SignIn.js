import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = ({setUserData}) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [wrongDetails, setWrongDetails] = useState(null);

    const navigate = useNavigate();

    const password = document.getElementById('password')

    const togglePassword = () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

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
                navigate('/home')
                setUserData(data)
            } else if (data === 'Forgot username and/or password') {
                setWrongDetails('Username or password is incorrect');
                setSignInPassword('')
            } else if (data === 'An error occured') {
                setWrongDetails('An error occured');
            }
        })
    }

    return (
        <div>
            <h1 className='pl3 pre-logo'>FACE-DETECTOR</h1>
            <div className='fullPage'>
                <article className="br3 bw1 mv4 w-100 w-50-m w-25-l w-rr center">
                    <form 
                        className=" center pa3"
                        onSubmit={handleSubmit}
                    >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 tc fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent fw6 f4 hover-bg-light-green white auto-fill hover-black w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    required
                                    value={signInEmail}
                                    onChange={(e)=>{
                                        setSignInEmail(e.target.value)
                                        setWrongDetails(null)
                                    }}
                                />
                            </div>
                            <div className="pt3">
                                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent fw5 f4 hover-bg-light-green white hover-black w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    required
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
                        <div>
                            <button 
                                className="b ph3 pv2 mt3 input-reset ba light-green b--light-green bg-transparent grow pointer f6 dib"
                            >Sign in</button>
                        </div>
                        <div className="lh-copy mt3">
                            <p className='f5 pt3'>Don't have an account?</p>
                            <Link to='/signup'><p className="f4 tc light-green dim db sign-up-button">Sign up</p></Link>
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </form>
                </article>
            </div>
        </div>
        
    );
}
 
export default SignIn;