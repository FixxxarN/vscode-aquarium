// @ts-nocheck
const perchUri = document.currentScript.getAttribute('perchUri');
const perchFlippedUri = document.currentScript.getAttribute('perchFlippedUri');

const backgroundCanvas = document.getElementById('backgroundCanvas');
const backgroundContext = backgroundCanvas.getContext('2d');

renderBackground();

function renderBackground() {
  backgroundContext.fillStyle = 'lightblue';
  backgroundContext.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
}

const fishCanvas = document.getElementById('fishCanvas');
const fishContext = fishCanvas.getContext('2d');

fishContext.canvas.style.imageRendering = 'auto';
window.devicePixelRatio = 2;

var scale = window.devicePixelRatio;

fishCanvas.width = Math.floor(window.innerWidth * scale);
fishCanvas.height = Math.floor(window.innerHeight * scale);

fishContext.scale(scale, scale);

renderPerch();

let x = fishCanvas.width / 4;
let touchedLeftSide = false;
let touchedRightSide = true;

function renderPerch() {
  let perchImage = new Image();
  perchImage.src = perchUri;

  let perchFlippedImage = new Image();
  perchFlippedImage.src = perchFlippedUri;

  window.onload = animate;

  function animate() {
    fishContext.clearRect(0, 0, fishCanvas.width, fishCanvas.height);
    fishContext.imageSmoothingEnabled = false;
    if (x <= 0) {
      touchedLeftSide = true;
      touchedRightSide = false;
    }
    if (x >= fishCanvas.width / 2 - 32) {
      touchedRightSide = true;
      touchedLeftSide = false;
    }
    if (touchedLeftSide) {
      fishContext.drawImage(perchFlippedImage, x, fishCanvas.height / 4);
      x += 1;
    }
    if (touchedRightSide) {
      fishContext.drawImage(perchImage, x, fishCanvas.height / 4);
      x -= 1;
    }
    requestAnimationFrame(animate)
  }
}