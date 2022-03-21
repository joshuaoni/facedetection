import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = ({setUserData}) => {
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(null);

    const navigate = useNavigate();

    
    const onInputChange = (e) => {
        setSignUpName(e.target.value)
        let alphabets = /^[A-Za-z]+$/;
        if ((e.target.value.match(alphabets) && e.target.value.length >= 2) || e.target.value.length === 0) {
            document.getElementById('name-format').style.display = 'none';
        } else {
            document.getElementById('name-format').style.display = 'block';
        }
    }

    const onEmailChange = (e) => {
        setSignUpEmail(e.target.value)
        setPasswordMismatch(null)
        let emailChar = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (e.target.value.match(emailChar) || e.target.value.length === 0) {
            document.getElementById('email-format').style.display = 'none';
        } else {
            document.getElementById('email-format').style.display = 'block';
        }
    }

    const onPasswordChange = (e) => {
        setSignUpPassword(e.target.value)
        setPasswordMismatch(null)
        let {value} = e.target;
        let passwordChar = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/;
        if (value.match(passwordChar) || value.length === 0) {
            document.getElementById('password-format').style.display = 'none';
        } else {
            document.getElementById('password-format').style.display = 'block';
        }
    }

    const password = document.getElementById('password')
    const confirmPass = document.getElementById('confirm-password')

    const togglePassword1 = () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type)
    }
    const togglePassword2 = () => {
        const type = confirmPass.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPass.setAttribute('type', type)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userDetails = {name:signUpName, email:signUpEmail, password:signUpPassword, confirmPassword }
        
        fetch('https://lit-dusk-59355.herokuapp.com/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userDetails)
        })
        .then(resp => resp.json())
        .then(data => {
            if (typeof data === 'object' && data !== null) {
                setPasswordMismatch(null);
                setUserData(data)
                navigate('/')
            } else if (data === 'Mismatch') {
                setPasswordMismatch(`Passwords don't match`)
            } else if (data === 'Email already registered') {
                setPasswordMismatch(`Email already registered, please pick another`)
                setSignUpEmail('')
            }
        })
    }

    return (
        <div>
            <h1 className='pl3 pre-logo'>FACE-DETECTOR</h1>
            <div className='fullPage'>
                <article className="br3 bw1 mv4 w-100 w-50-m w-25-l w-rr center">
                    <form 
                        onSubmit={handleSubmit} 
                        className=" center pa3"
                    >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 tc fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="first-name">First Name</label>
                                <input 
                                    className="pa2 auto-fill input-reset ba bg-transparent fw6 f4 hover-bg-light-green white hover-black w-100" 
                                    type="text" 
                                    name="first-name" 
                                    id="first-name"
                                    required
                                    pattern='[A-Za-z]{2,}'
                                    value={signUpName}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div style={{display: 'none'}} className='f5 light-yellow db fw7' id='name-format'>Name must contain 2 or more alphabetical characters only</div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 auto-fill input-reset ba bg-transparent fw6 f4 hover-bg-light-green white hover-black w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address"
                                    required
                                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                                    value={signUpEmail}
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div style={{display: 'none'}} className='f5 light-yellow db fw7' id='email-format'>Enter a valid email address</div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent fw f4 hover-bg-light-green white hover-black w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    required
                                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}'
                                    value={signUpPassword}
                                    onChange={onPasswordChange}
                                />
                                <div title='Reveal/hide password' className="icon-div">
                                    <FontAwesomeIcon onClick={togglePassword1} className='pointer mr3 icon' icon={faEyeSlash} size="1x" />
                                </div>
                            </div>
                            
                            <div style={{display: 'none'}} className='f5 light-yellow db fw7' id='password-format'>Password must contain an upper-case letter, a lower-case letter, a number and must be betwen 6-14 characters long</div>
                            <div className="mt3">
                                <label className="db pt3 fw6 lh-copy f5" htmlFor="confirm-password">Confirm Password</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent fw5 f4 hover-bg-light-green white hover-black w-100" 
                                    type="password" 
                                    name="confirm-password" 
                                    id="confirm-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e)=>{
                                        setConfirmPassword(e.target.value)
                                        setPasswordMismatch(null)
                                    }}
                                />
                                <div title='Reveal/hide password' className="icon-div">
                                    <FontAwesomeIcon onClick={togglePassword2} className='pointer mr3 icon' icon={faEyeSlash} size="1x" />
                                </div>
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className='f5 light-yellow pt2 db fw7'>
                            {passwordMismatch}
                        </div>
                        <div>
                            <button className="b ph3 pv2 input-reset ba mt3 light-green b--light-green bg-transparent grow pointer f6 dib">Register</button>
                        </div>
                    </form>
                    <div className="center pb3 pl3 pr3 lh-copy mt3">
                        <p className='f5 pt2'>Already registered?</p>
                        <Link to='/'><p className="f4 tc light-green dim db sign-up-button">Sign in</p></Link>
                        {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                    </div>
                </article>
            </div>
        </div>
    );
}
 
export default SignUp;