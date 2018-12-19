export const getVars = (json, location) => {
  let {time, temperature, summary: shortSummary, icon, windSpeed, cloudCover, humidity, dewPoint, precipProbability, uvIndex} = json.currently
  let {summary: dailySummary, data} = json.daily
  let {sunriseTime, sunsetTime, temperatureLow, temperatureHigh} = json.daily.data[0]

  let newSunset = fixOffset(sunsetTime, json.offset)
  let newSunrise = fixOffset(sunriseTime, json.offset)

  let sunrise = newSunrise.toTimeString().slice(0,5)
  let sunset = newSunset.toTimeString().slice(0,5)
  let useThisTime = fixOffset(time, json.offset)

  let stringTime = useThisTime.toTimeString().slice(0,5)
  let date = useThisTime.toDateString().slice(0, -5)

  let citySlug = location.full_city_name.toLowerCase().replace(/, | /gi, "-")
  let hourly = json.hourly.data


  return {
    full_city_name: location.full_city_name,
    latitude: location.latitude,
    longitude: location.longitude,
    date: date,
    time: stringTime,
    temp: temperature,
    high: temperatureHigh,
    low: temperatureLow,
    conditions: shortSummary,
    dailySummary: dailySummary,
    sunriseTime: sunrise,
    sunsetTime: sunset,
    citySlug: citySlug,
    hourly: hourly,
    icon: icon,
    offset: json.offset,
    daily: data,
    humidity: humidity,
    windSpeed: windSpeed,
    cloudCover: cloudCover,
    dewPoint: dewPoint,
    precipProbability: precipProbability,
    uvIndex: uvIndex
  }
}

export const fixOffset = (time, offset) => {
  let offsetBy = offset + 4
  let useThisTime = time * 1000 + (offsetBy * 3600000)
  return new Date(parseInt(useThisTime, 10))
}
