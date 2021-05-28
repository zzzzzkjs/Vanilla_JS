const body = document.querySelector("body");
const locationContainer = document.querySelector(".js-location span");

const IMG_NUMBER = 12;

const UNSPLASH_API_KEY =
  "s8nLRI8N4Bwlt19aadn0T2p_GV4OExmKjPdlDjgLssg";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

function loadBackground() {
  const savedImage = localStorage.getItem("bg");
  if (savedImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImage.expiresOn) {
      getBackground();
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${
        parsedImage.url
      })`;
      locationContainer.innerHTML = `${parsedImage.name}, ${
        parsedImage.city
      }, ${parsedImage.country}`;
    }
  }
  return;
}

function saveBackground(imageUrl, city, country, name) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage !== null) {
    localStorage.removeItem("bg");
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const imageObject = {
    url: imageUrl,
    expiresOn: expirationDate,
    city,
    country,
    name
  };
  localStorage.setItem("bg", JSON.stringify(imageObject));
  loadBackground();
  return;
}

function getBackground() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const image = json;
      if (image.urls && image.urls.full && image.location) {
        const fullUrl = image.urls.full;
        const location = image.location;
        const city = location.city;
        const country = location.country;
        const name = location.name;
        saveBackground(fullUrl, city, country, name);
      } else {
        getBackground();
      }
    });
  return;
}

function init() {
  loadBackground();
  return;
}

init();

// function paintImage(imgNumber) {
//   const image = new Image();
//   image.src = `/images/${imgNumber + 1}.jpg`;
//   image.classList.add("bgImage");
//   body.appendChild(image);
//   //   image.addEventListener("loadend", handleImgLoad);
// }

// function genRandom() {
//   const number = Math.floor(Math.random() * IMG_NUMBER);
//   return number;
// }

// function init() {
//   const randomNumber = genRandom();
//   paintImage(randomNumber);
// }

// init();