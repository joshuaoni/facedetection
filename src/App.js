import React, {useState, useEffect} from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import InputForm from './components/InputForm/InputForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Instructions from './components/Instructions/Instructions';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Bottom from './components/Bottom/Bottom';


function App() {

  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [box, setBox] = useState({});
  const [modelDown, setModelDown] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    entries: 0,
    id: 0,
    joined: '',
    max: false
  });

  

  useEffect(()=>{
    const data = localStorage.getItem('my-state');
    if (data) {
      let a = JSON.parse(data)
      setBox(a.box)
      setUser(a.user)
      setInput(a.input)
      setImgUrl(a.imgUrl)
      setModelDown(a.modelDown)
    }
  }, [])

  const obj = {input, imgUrl, box, user, modelDown}
  useEffect(()=>{
    localStorage.setItem('my-state', JSON.stringify(obj))
  })

  const reset = () => {
    setUser({
      name: '', 
      email: '',
      password: '',
      entries: 0,
      id: 0,
      joined: '',
      max: false
    })
    setBox({})
    setInput('')
    setImgUrl('')
  }

  function onInputChange (e) {
    setInput(e.target.value);
  }


  function onSubmit (e) {
    e.preventDefault();
    setBox({})
    setImgUrl(input);
    fetch('https://lit-dusk-59355.herokuapp.com/imageurl', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      if (typeof resp === 'object' && resp !== null) {
        setModelDown(false)
        updateEntryCount()
        setBoxValues(calcFaceLocation(resp))
      } else if (resp === 'Face detect model currently down') {
        setModelDown(true)
      }
    })
    .catch(err => console.log(err))
  
    setInput('')
  }

  const updateEntryCount = () => {
    fetch('https://lit-dusk-59355.herokuapp.com/image', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: user.id
      })
    })
    .then(resp => resp.json())
    .then(user => {
      setUser(prevState => ({
        ...prevState,
        entries: user.entries,
        max: user.max
      }))
    })
    .catch(err => console.log(err))
  }

  
  const setUserData = (data) => {
    setUser({
      name: data.name, 
      email: data.email,
      password: data.password,
      entries: data.entries,
      id: data.id,
      joined: data.joined,
      max: data.max
    })
  }
  

  function calcFaceLocation (resp) {
    let faceBoxes = []
    resp.outputs[0].data.regions.forEach(face => {
      faceBoxes.push(face.region_info.bounding_box)
    }) 
    const image = document.getElementById('img');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {faceBoxes, width, height}
  }

  function setBoxValues (params) {
    setBox(params)
  }

  // const beep = () => {
  //   console.log(user)
  // }
  // <h1 className='tc white pointer' onClick={beep}>Click</h1>

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <div className='preliminary-i'>
              <div>
                <SignIn 
                  setUserData={setUserData}
                />
              </div>
            </div>
          } />
          <Route path='/signup' element={
            <div className='preliminary-o'>
              <div>
                <SignUp 
                  setUserData={setUserData}
                />
              </div>
            </div>
          } />
          <Route 
            path='/home' 
            element={user.name !== '' ?
            <div>
              <Navigation 
                reset={reset}
                user={user}
              />

              <Instructions 
                user={user}
              />

              <div className='tc game'>
                {user.name !== '' && <Rank 
                  id='rank'
                  user={user}
                />}

                {!user.max && user.name !== '' && <InputForm 
                  input={input} 
                  onInputChange={onInputChange} 
                  onSubmit={onSubmit}
                />}

                {user.max && <h1 className='pt5 tc fw5 white'>You have reached your limit. Please come back tomorrow and detect more faces : )</h1>}

                {user.name === '' && <h1 className='lim tc fw5 white'>You have to log-in first!</h1>}
                {user.name === '' && <Link to='/'><button className='bg-light-green fw6 pt2 pb2 pl3 pr3 bw0 f3 tc pointer dim br4 black mt5'>Go to login</button></Link>}
                
                <FaceRecognition 
                  box={box}
                  imgUrl={imgUrl}
                  modelDown={modelDown}
                />

              </div>
              
              <Bottom />
            </div> :
            <Navigate to='/' />
          } />
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;