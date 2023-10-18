// @ts-nocheck
const perchUri = document.currentScript.getAttribute('perchUri');
const perchFlippedUri = document.currentScript.getAttribute('perchFlippedUri');

handleBackground();

function handleBackground() {
  const backgroundCanvas = document.getElementById('backgroundCanvas');
  const backgroundContext = backgroundCanvas.getContext('2d');

  renderBackground();

  function renderBackground() {
    backgroundContext.fillStyle = 'lightblue';
    backgroundContext.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  }
}


const fishCanvas = document.getElementById('fishCanvas');
const fishContext = fishCanvas.getContext('2d');

function resizeCanvas() {
  fishContext.canvas.width = window.innerWidth;
  fishContext.canvas.height = window.innerHeight;

  scaleCanvas();
}

function scaleCanvas() {
  var scale = window.devicePixelRatio;

  fishCanvas.width = Math.floor(window.innerWidth * scale);
  fishCanvas.height = Math.floor(window.innerHeight * scale);

  fishContext.scale(scale, scale);
}

scaleCanvas();

window.addEventListener('resize', resizeCanvas);

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
      fishContext.drawImage(perchFlippedImage, x, 50);
      x += 1;
    }
    if (touchedRightSide) {
      fishContext.drawImage(perchImage, x, 50);
      x -= 1;
    }
    requestAnimationFrame(animate)
  }
}