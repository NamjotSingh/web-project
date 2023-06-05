
// Selectors and Variables
const form = document.querySelector('form')
const search = document.querySelector('#search')

const dayBox = document.querySelector('.day')
const dateBox = document.querySelector('.date')
const temp = document.querySelector('.temp')
const place = document.querySelector('.location')

const container = document.querySelector('.weather-info')
let weatherIcon = document.querySelector('.weather-icon')

let now = new Date()
let weather;


// Functions

let getcurrentDay = () => {
    let day = now.getDay();

    let weekday = new Array(7);
    weekday[0] = 'Sun';
    weekday[1] = 'Mon';
    weekday[2] = 'Tue';
    weekday[3] = 'Wed';
    weekday[4] = 'Thu';
    weekday[5] = 'Fri';
    weekday[6] = 'Sat';

    day = weekday[day];
    return day;
}

let getcurrentTime = () => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = now.getDate();
    let month = months[now.getMonth()];

    let hours = now.getHours();
    let mins = now.getMinutes();
    let periods = 'AM';
    console.log(hours)

    // Display Moon at Night
    // if (hours < 6 || hours > 19) weather = 'Night'
    
    if (hours > 11) {
        periods = 'PM';
        if (hours > 12) hours = hours - 12;
    }
    if (mins < 10) mins = '0' + mins;

    console.log(hours + ':' + mins + ' ' + periods)
    return ` ${date} ${month} `;
}

let getData = async (city) => {
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c74624f7ba828adde2f1ff30a47befa&units=metric`;
    const response = await fetch(APIurl);
    const data = await response.json();
    console.log(data)

    showData(data)
}

let showData = (data) => {

    if (data.cod == '404') {
        container.innerHTML = `City not Found! Recheck the spelling.`;
    }
    else {
        dayBox.innerHTML = getcurrentDay();
        dateBox.innerHTML = getcurrentTime();

        place.innerHTML = `${data.name},${data.sys.country}`;
        temp.innerHTML = `${data.main.temp}°C`;

        weather = data.weather[0].main
        // getcurrentTime()     Display moon
        
        // Dynamic Weather Icon
        
        if (weather == 'Night') {
            weatherIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`
        }
        else if (weather == 'Rain') {
            weatherIcon.innerHTML = `<i class="fa-solid fa-cloud-rain" style='color: #33ccff;'></i>`
        }
        else if (weather == 'Clouds') {
            weatherIcon.innerHTML = `<i class="fa-solid fa-cloud" style="color: #d4d4d4;"></i>`
        }
        else if (weather == 'Thunder') {
            weatherIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt" style='color: #525252;'></i>`
        }
        else {
            weatherIcon.innerHTML = `<i class="fa-solid fa-sun" style='color: #fede10;'></i>`
        }
        search.value = '';
    }
}

// Events
form.addEventListener('submit', (event) => {
    getData(search.value);
    event.preventDefault();
})