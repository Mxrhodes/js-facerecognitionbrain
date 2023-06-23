import React, { Component } from 'react';
import Navigation from "./component/navigation/Navigation";
import Logo from "./component/logo/Logo.js";
import Rank from "./component/rank/Rank.js";
import ImageLinkForm from "./component/imageLinkForm/ImageLinkForm.js";
import './App.css';
import 'tachyons';


class App extends Component {
  render() {

    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        <Rank />
      </div>
    );
  }
}

export default App;
