import React from 'react';
import './Instructions.css';
import got1 from './got.png';
import teyonah1 from './PZGS9117.JPEG';
import teyonahFace from './teyonah-face.png';
import gotFace1 from './got-face1.png';

const Instructions = ({user}) => {

  return (
    <div>
      <div className='instruct-comp'>
        <h1 className='tc instruct-logo i-50-m'>THE FACE-DETECTOR</h1>
        <hr />
        <h1 className='hello-80-l pb4 fw7 mt0 f2'>Hello {user.name}, here are your instructions:</h1>
        <div className='grids mt3'>
          <div className='instructions ins-50'  ><h1>Copy the address/url of any image you find online. It could be a google image, a facebook or twitter photo, or any other online image that has a link address</h1></div>
          <img alt='img' title='Copy link address example'   height='auto' className='i-img' src={teyonah1} />
          <img alt='img' title='Copy link address example'   height='auto' className='i-img' src={got1} />
          <div className='instructions ins-50'  ><h1>Paste the url you just copied in the space provided below, then click the Detect button (or press Enter on your keyboard) so that our API can get to work!</h1></div>
          <div className='instructions ins-50'  ><h1>Ensure that there are visible faces in the photo that you choose. The number of faces in your photo doesn't matter, our face-detector API will detect them all</h1></div>
          <img alt='img'   height='auto' className='i-img' src={teyonahFace} />
          <img alt='img'   height='auto' className='i-img' src={gotFace1} />
          <div className='instructions ins-50'  ><h1>Note that you can use this app to detect faces on <span className='red'>3 images</span> of your choice <span className='red'>per day</span>. Go on and give it a try</h1></div>
        </div>
      </div>
    </div>
  );
}
 
export default Instructions;