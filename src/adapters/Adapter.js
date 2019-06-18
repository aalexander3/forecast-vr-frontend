const getUrl = (location) => `${process.env.REACT_APP_DARK_SKY_QUERY}${location.latitude},${location.longitude}?exclude=flags,minutely`

const Adapter = {
  get: (location) => fetch(getUrl(location)).then(res => res.json())
}

export default Adapter
