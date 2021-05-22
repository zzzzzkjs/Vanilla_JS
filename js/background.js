const body = document.querySelector("body");
const IMG_NUMBER = 12;

// function handleImgLoad() {
//   console.log("finished loading");
// }

function paingImage(imgNumber) {
  const image = new Image();
  image.src = `/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
//   image.addEventListener("loadend", handleImgLoad);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paingImage(randomNumber);
}

init();
