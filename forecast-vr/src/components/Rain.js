import React from 'react'
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-gradient-sky'
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';


class Rain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render(){
    return(
      <a-scene>
        <a-assets>
          <img id="groundTexture" src="https://images.unsplash.com/photo-1524116458090-9521cd04f38d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0b480dd02b565246eb9cf03391d4ca1c&auto=format&fit=crop&w=500&q=60"/>
          <img id="groundTexture2" src="https://images.unsplash.com/photo-1498612753354-772a30629934?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03ffd47de5eabfe0ae15c9e23b838acd&auto=format&fit=crop&w=500&q=60"/>
          <img id="skyTexture" src="https://images.unsplash.com/photo-1497295741369-9f9260c9a8d9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=85e319aae99c260ee4eaebc101d2f6c7&auto=format&fit=crop&w=500&q=60"/>
          <img id='sunTexture' src='https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=47d596252f08d70d845dfe0ef4fb0388&auto=format&fit=crop&w=500&q=60' />
        </a-assets>

        {/* <Entity primitive="a-plane" src='#groundTexture2' rotation="-90 0 0" height="100" width="100"/> */}
        <Entity primitive="a-light" type="ambient" color="#white"/>
        <Entity primitive="a-light" type="point" intensity="2" position="3 6 -10"/>
        <a-gradient-sky material="shader: gradient; topColor: 254 222 220; bottomColor: 149 189 199;"></a-gradient-sky>
        {/* <Entity primitive="a-sky" src='#skyTexture' height="2048" radius="30" theta-length="300" width="2048"/> */}
        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
        <a-sphere src='#sunTexture' position="2 4 -5" rotation="0 45 45" scale=".25 .25 .25" opacity='0.5'></a-sphere>


        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}}/>
        </Entity>
      </a-scene>
    )
  }
}

export default Rain
