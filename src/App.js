import React, { useCallback, useState} from 'react';
//import Clarifai from 'clarifai';
import Particles from 'react-particles';
import { loadFull } from "tsparticles"
import Navigation from "./component/navigation/Navigation";
import Register from "./component/register/Register";
import Signin from "./component/signIn/Signin";
import Logo from "./component/logo/Logo.js";
import Rank from "./component/rank/Rank.js";
import ImageLinkForm from "./component/imageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./component/faceRecognition/FaceRecognition.js";
import './App.css';
import 'tachyons';


const App = () => {
  
  const [ inputState, setInputState ] = new useState("");
  const [ imageUrl, setImageUrl ] = new useState("");
  const [ box, setBox ] = new useState({});
  const [ route, setRoute ] = new useState("signin")


  const calculateFaceLocation = (responseData) => {
    const { bottom_row, left_col, right_col, top_row } = responseData;
    console.log('br: ', bottom_row)
    console.log('lc: ', left_col)
    console.log('rc: ', right_col)
    console.log('tr: ', top_row)
    
    const image = document.getElementById('image-input');
    const width = Number(image.width)
    const height = Number(image.height);
    
    return {
      leftCol: left_col * width,
      topRow: top_row * height,
      rightCol: width - (right_col * width),
      bottomRow: height - (bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    console.log('box: ', box)
    setBox(box)
  }

  const onInputChange = (event) => {
    setInputState(event.target.value);
  }

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": inputState
                }
            }
        }
    ]
  });
  
  const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key b5c0fb1bb46d4971b2e91f099ac7a3a0'
  },
  body: raw
  };
  

  const onSubmitButton = () => {
    setImageUrl(inputState);
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    .then(response => response.json())
    //.then(result => console.log(result.outputs[0].data.regions))
    .then(result => displayFaceBox(calculateFaceLocation(result.outputs[0].data.regions[0].region_info.bounding_box)))
    .catch(error => console.log('--ERROR--', error));

  }

  const particlesInit = useCallback(async engine => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);
  
  const particlesOptions = {
    particles: {
      color: {
          value: "#ffffff",
      },
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.7,
          width: 1,
      },
      collisions: {
          enable: true,
      },
      move: {
          direction: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
      },
      number: {
        value: 80,
        density: {
            enable: true,
            value_area: 800,
        },
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "circle",
      },
      size: {
          value: { min: 1, max: 5 },
      },
    }
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }
    
  

  return (
    <div className="App">
      <Particles
        className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navigation 
      onRouteChange={onRouteChange}
      route={route}
       />
      <Logo />
      { route === "home" 
      ? <div>
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmitButton={onSubmitButton}
          />      
          <FaceRecognition 
            box={box}
            imageUrl={imageUrl}/> 
        </div>
      : (
        route === 'signin'
        ? <Signin onRouteChange={onRouteChange} />
        : <Register onRouteChange={onRouteChange} />
        )
      }   
    </div>
  );
  
}

export default App;