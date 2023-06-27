import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from "tsparticles"
import Navigation from "./component/navigation/Navigation";
import Logo from "./component/logo/Logo.js";
import Rank from "./component/rank/Rank.js";
import ImageLinkForm from "./component/imageLinkForm/ImageLinkForm.js";
import './App.css';
import 'tachyons';


const App = () => {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
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
          opacity: 0.5,
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
          speed: 6,
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
    
  

  return (
    <div className="App">
      <Particles
      className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
  
}

export default App;
