

const API_KEY = '354b9d1ba0ab02972cc53c28f32733bd';

const fetchData = position => {

    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(response => response.json()).then(data => setWeatherData(data))

}

const setWeatherData = data =>{
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        temperature2:data.main.temp,
        description2: data.weather[0].main,

        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,

        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        //document.getElementById(key).textContent = weatherData[key];

        if(key == "icon"){
            document.getElementById("img").src = weatherData[key];
        }
        else{
            document.getElementById(key).textContent = weatherData[key];
        }
    });

    cleanUp();
}

const cleanUp = () => {
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
}


const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}