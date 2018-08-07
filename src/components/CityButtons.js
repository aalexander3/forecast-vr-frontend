// react imports
import React from 'react'
// aframe imports
import 'aframe';
import {Entity} from 'aframe-react';

class CityButtons extends React.Component {

  pushCity = () => {
    this.props.goToCity(this.props.city)
  }

  render(){

    return(
        <Entity events={{click: this.pushCity}}
          primitive='a-plane'
          color={this.props.color}
          width='1'
          height='1'
          position={this.props.position}
          text={{value: this.props.city.full_city_name, align: 'center', wrapCount: 12, side: 'double'}}
          opacity='.6'>
        </Entity>
    )
  }
}

export default CityButtons
