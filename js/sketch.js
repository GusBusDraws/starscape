let N_STARS = 100;
let MIN_CLUSTER_R = 10;
let MAX_CLUSTER_R = 250;
let N_NEBULA_STARS_MIN = 1000;
let N_NEBULA_STARS_MAX = 10000;
let NEBULA_THICKNESS_MIN;
let NEBULA_THICKNESS_MAX;
let DEBUG_MODE = true;
let N_WAVES;
// let COLORS = ['#ff0000', '#00ff00', '#0000ff']
let COLORS = ["#006ba6","#0496ff","#ffbc42","#d81159","#8f2d56"]
// let BG_COLOR = "#03071e"
let BG_COLOR = 0
let a;
let b;
let c;
let d;
let waves;

function setup() {
  createCanvas(500, 500);
  frameRate(1);
  resetSketch();
  NEBULA_THICKNESS_MIN = height / 25;
  NEBULA_THICKNESS_MAX = height / 5;
  console.log('Press SPACE to stop looping or r to reset.');
}

function draw() {
  // noLoop();
  a = [];
  b = [];
  c = [];
  d = [];
  waves = [];
  let colorsToUse = [...COLORS]
  N_WAVES = floor(random(2, COLORS.length))
  background(BG_COLOR);
  for (let i = 0; i < N_WAVES; i ++) {
    a.push(random(height));
    b.push(random(height));
    c.push(random(0.005, 0.01));
    d.push(random(2 * PI))
  }
  for (let wave_i = 0; wave_i < N_WAVES; wave_i ++) {
    waves[wave_i] = [];
    let pickedColor = random(colorsToUse)
    stroke(pickedColor)
    for (let x = 0; x < width; x ++) {
      let y = a[wave_i] + b[wave_i] * sin(c[wave_i] * x + d[wave_i]);
      waves[wave_i].push(y)
      // point(x, y);
    }
  }
  // if (DEBUG_MODE === true) {
  //   strokeWeight(1);
  //   for (let wave_i = 0; wave_i < wave.length; wave_i ++) {
  //     stroke(COLORS[wave_i])
  //     point(wave_i / 10, wave[wave_i]);
  //   }
  // }
  for (let wave_i = 0; wave_i < N_WAVES; wave_i ++) {
    let pickedColor = color(random(colorsToUse))
    let index = colorsToUse.indexOf(pickedColor)
    colorsToUse.splice(index, 1)
    let nebulaThickness = random(NEBULA_THICKNESS_MIN, NEBULA_THICKNESS_MAX)
    let nNebulaStars = random(N_NEBULA_STARS_MIN, N_NEBULA_STARS_MAX)
    for (let nebula_i = 0; nebula_i < nNebulaStars; nebula_i ++) {
      let opacityRand = random(25, 255);
      pickedColor.setAlpha(opacityRand)
      stroke(pickedColor)
      let randomX = floor(random(width))
      let y = waves[wave_i][randomX]
      let randomY = randomGaussian(y, nebulaThickness)
      strokeWeight(random(2))
      point(randomX, randomY);
    }
  }
  let nebulaColor = random(COLORS)
  stroke(nebulaColor)
  strokeWeight(1)
  let starColor = color(255)
  for (let star_i = 0; star_i < N_STARS; star_i ++) {
    // Cluster or singular star
    let clusterRand = random(1);
    if (clusterRand < 0.2) {
      let posX = random(width)
      let posY = random(height)
      let clusterSize = random(MIN_CLUSTER_R, MAX_CLUSTER_R)
      for (let cluster_i = 0; cluster_i < 100; cluster_i ++) {
        // Star size
        let sizeRand = random(1);
        if (sizeRand < 0.6) {
          strokeWeight(1);
        } else if (sizeRand < 0.95) {
          strokeWeight(2);
        } else {
          strokeWeight(3);
        }
        // Star brightness (opacity)
        let opacityRand = random(255);
        starColor.setAlpha(opacityRand)
        stroke(starColor)
        // Cluster size
        let offsetX = randomGaussian(posX, clusterSize)
        let offsetY = randomGaussian(posY, clusterSize)
        point(offsetX, offsetY);
      }
    } else {
      point(random(width), random(height));
    }
  }
}

function resetSketch() {
  N_WAVES = 3;
  redraw();
}
