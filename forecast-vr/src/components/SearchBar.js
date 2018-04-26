import React, { Component } from 'react'
import { Input } from 'antd'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addLocation, fetchLocation } from  '../actions/actions';

const Search = Input.Search

class SearchBar extends Component {

  state = {
    text: ''
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  submitIt = () => {

    this.props.fetchLocation(this.state.text)
    this.setState({text: ''})
  }

  render(){
    return(
      <Search placeholder="what's it like in..." value={this.state.text} onChange={this.handleChange} onSearch={this.submitIt} enterButton/>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addLocation: addLocation,
    fetchLocation: fetchLocation
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
