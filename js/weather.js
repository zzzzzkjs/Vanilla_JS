const API_KEY = "87be4b0182e627ff5da38fdde53233f0";
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      const temperature = resJson.main.temp;
      const place = resJson.name;
      weather.innerText = `${temperature} @ ${place}`;
      console.log(resJson);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // 객체 키값을 안주고 변수를 추가할경우 변수명이 자동으로 키값으로 생성됨
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(position) {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // getWeather
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
    console.log(parseCoords);
  }
}

function init() {
  loadCoords();
}

init();
