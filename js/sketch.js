let N_STARS = 100;
let MIN_CLUSTER_R = 10;
let MAX_CLUSTER_R = 250;
let DEBUG_MODE = false;
let stars = [];
let N_STARS_CHART = 4;
let CHART_STAR_NS = [];

class Star{
  constructor(x, y, s, b) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.brightness = b;
  }
}

function setup() {
  createCanvas(500, 500);
  stars = [];
  generateStars();
  resetSketch();
  console.log('Press SPACE to stop looping or r to reset.');
}

function draw() {
  ////////////////
  // Draw stars //
  ////////////////
  noLoop();
  for (let star of stars) {
    strokeWeight(star.size);
    stroke(255, 255, 255, star.brightness);
    point(star.x, star.y);
  }
  ////////////////
  // Draw chart //
  ////////////////
  strokeWeight(1)
  stroke(0, 255, 100)
  let i = 0;
  for (let star_n_1 of CHART_STAR_NS) {
    let star_1 = stars[star_n_1]
    for (let star_n_2 of CHART_STAR_NS) {
      let star_2 = stars[star_n_2]
      line(star_1.x, star_1.y, star_2.x, star_2.y)
    }
  }
}

function generateStars() {
  let brightness = 255;
  stroke(255, 255, 255, brightness);
  let size = 1;
  strokeWeight(size);
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
          size = 1;
        } else if (sizeRand < 0.95) {
          size = 2;
        } else {
          size = 3;
        }
        strokeWeight(size);
        // Star brightness (opacity)
        brightness = random(255);
        stroke(255, 255, 255, brightness)
        // Cluster size
        let offsetX = randomGaussian(posX, clusterSize)
        let offsetY = randomGaussian(posY, clusterSize)
        stars.push(new Star(offsetX, offsetY, size, brightness))
      }
    } else {
      let x = random(width)
      let y = random(height);
      stars.push(new Star(x, y, size, brightness))
    }
  }
}

function generateStarChart(n) {
  while (n < N_STARS_CHART) {
    let star_n = floor(random(stars.length))
    if (stars[star_n].x > 0
        && stars[star_n].x < width
        && stars[star_n].y > 0
        && stars[star_n].y < height) {
      CHART_STAR_NS.push(star_n)
      n ++
    } else {
      n = generateStarChart(n)
    }
  }
  return n
}

function resetSketch() {
  background(0);
  CHART_STAR_NS = [];
  let n = 0;
  n = generateStarChart(n);
  redraw();
}
