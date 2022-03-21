import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgUrl, box, modelDown}) => {
    
    const {faceBoxes, width, height} = box;
    
    return (
    <div className='flex'>
        {!modelDown && <div className='ma3 relative center'>
            <img 
                id='img'
                width='500px'
                height='auto' 
                alt=''
                src={imgUrl}
            />
            {faceBoxes && faceBoxes.map((face, i) => {
                return (
                    <div key={i} className='bounding_box' style={{top: face.top_row*height, right: width-face.right_col*width, bottom: height-face.bottom_row*height, left: face.left_col*width}}></div>
                );
            })}
            
        </div>}
        {modelDown && <h2 style={{fontWeight: '200'}} className='tc'>Looks like you encountered an error. Please paste in a different image link or come back in a few minutes : )</h2>}
    </div>
    );
}
 
export default FaceRecognition;



