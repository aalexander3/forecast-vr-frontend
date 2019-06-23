import React, { Component } from 'react'
import CityButtons from './CityButtons'

const CitySceneHOC = (WrappedComponent) => {
  return class extends Component {

    makeLocationButtons = () => {
      let xButton = -9;
      let i = 0
      let colors = ['#BFDDE1', '#99C6D8', '#AAB89B', '#D7D1AC', '#E9DCD1', '#E5E4E3']

      return this.props.locations.map(city => {
        xButton++; i++;
        return <CityButtons key={`city-button-${i}`} city={city} color={colors[i%6]} position={`${xButton} 1 -8`} goToCity={this.goToCity}/>
      })
    }

    goToCity = (city) => {
      this.props.history.replace(`/${city.citySlug}`)
    }

    goBack = () => {
      this.props.history.replace('/')
    }

    render (){
      return (
        <WrappedComponent
          makeLocationButtons={this.makeLocationButtons}
          goBack={this.goBack}
          {...this.props} />
      )
    }
  }
}

export default CitySceneHOC
