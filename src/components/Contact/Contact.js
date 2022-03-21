import React, { useRef, useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';


const Contact = () => {
    const [result, setResult] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_c6izr4v', 'template_btgaagn', form.current, 'H9Pf8EA4rCku6kwMg')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
        setResult(true)
        setTimeout(() => {
            setResult(false)
        }, 3000);
    }

    return (
        <div className='cont'>
            <div className='flex justify-center'>
                <h1 className=' cont-josh'>Contact Joshua</h1>
            </div>
            <form ref={form} onSubmit={sendEmail} className=" center pa3" >
                <div className='boxes w-100'>
                    <div className='pl3 mt0 w-40'>
                        <div className="mt0">
                            <label className="f3  fw7 w-100" htmlFor="name">NAME/ORGANIZATION</label>
                            <input 
                                className="w-100 br3 fw7 f5 pa2 bw0" 
                                type="text" 
                                name="name"  
                                id="name"
                                required
                                onChange={(e)=>{
                                    
                                }}
                            />
                        </div>
                        <div className="">
                            <label className="f3 fw7  w-100" htmlFor="email">EMAIL</label>
                            <input 
                                className="w-100 br3 pa2 f5 fw7 bw0" 
                                type="email" 
                                name="email" 
                                id="email"
                                required
                                onChange={(e)=>{
                                    
                                }}
                            />
                        </div>
                    </div>    
                    
                    <div className='w-60'>
                        <label className='f3 fw7  w-100'>MESSAGE</label>
                        <textarea
                            className='bw0 br3 pt2 pb2 pr2 pl2 fw7'
                            rows='10'
                            required
                            name='message'
                            onChange={(event)=>{
                                
                            }}
                        >
                        </textarea>
                    </div>
                </div>
                
                <div className='flex justify-center'>
                    <button className=" br3 mt3 pointer dim pr3 pl3 pt2 pb2 bw0 fw7">SEND</button>
                </div>
            </form>
            <div>{result ? <h3 className='tc f3'>Your message was sent successfully.<br/> I will contact you soon!</h3> : null}</div>
            
        </div>
    );
}
 
export default Contact;