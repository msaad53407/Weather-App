
const submitButton = document.getElementsByTagName('button')[0];
const temp = document.getElementById('temperature');
const weatherInformation = document.getElementById('weatherInformation');
const getLocation = async () => {
    const location1 = document.getElementsByTagName('input')[0].value
    const response = await fetch(`https://geocode.maps.co/search?q=${location1}`)
    return await response.json();
}

const weatherReport = async () => {

    const locationData = await getLocation();
    console.log(locationData)
    const latitude = locationData[0].lat;
    const longitude = locationData[0].lon;
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=84eb4507e456a490fd8776734843485c`)
    console.log(response)
    const weatherInfo = await response.json();
    console.log(weatherInfo)
    const weatherCondition = weatherInfo.current.weather[0].main
    weatherInformation.style.visibility = 'visible';
    weatherInformation.innerHTML = `Weather Condition: ${weatherCondition}`
    temp.hidden = false;
    temp.innerHTML = `Current Temperature: ${Math.floor(weatherInfo.current.temp)}°C`
    const img = document.querySelector('.image')
    switch (weatherCondition) {
        case 'Clouds':
            img.src = '/images/cloudy.png'
            break;
        case 'Rain':
            img.src = '/images/storm.png'
            break;
        case 'Clear':
            img.src = '/images/sun.png'
            break;
        case 'Haze':
            img.src = '/images/haze.png'
            break;
        case 'Snow':
            img.src = '/images/snow.png'
            break;
        case 'Mist':
            img.src = '/images/mist.png'
            break;
        default:
            img.src = ''
            img.alt = 'Image could not be loaded'
            break;
    }
}
submitButton.addEventListener('click', weatherReport)



