let N_STARS = 100;
let MIN_CLUSTER_R = 10;
let MAX_CLUSTER_R = 250;
let DEBUG_MODE = true;
let N_NEBULA_STARS = 10000;
let COLORS = ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c']
let a = [];
let b = [];
let c = [];
let d = [];
let y;
let wave = [];

function setup() {
  createCanvas(500, 500);
  resetSketch();
  console.log('Press SPACE to stop looping or r to reset.');
}

function draw() {
  noLoop();
  let bg_color = color(0)
  background(bg_color);
  for (let x = 0; x < width; x += 0.1) {
    a = 0.5 * height;
    b = 0.3 * height;
    c = 0.025;
    d = 0.75
    y = a + b * sin(c * x + d);
    wave.push(y)
  }
  if (DEBUG_MODE === true) {
    strokeWeight(1);
    for (let wave_i = 0; wave_i < wave.length; wave_i ++) {
      stroke(0, 255, 0);
      point(wave_i / 10, wave[wave_i]);
    }
  }
  let nebulaColor = random(COLORS)
  // index = COLORS.indexOf(nebulaColor)
  // COLORS.splice(index, 1)
  stroke(nebulaColor)
  strokeWeight(1)
  for (i_nebula = 0; i_nebula < N_NEBULA_STARS; i_nebula ++) {
    let xNebula = random(width);
    y = a + b * sin(c * xNebula + d);
    let yNebula = randomGaussian(y, 50)
    // let yNebula = randomGaussian(y, random(50))
    point(xNebula, yNebula)
  }
  // filter(BLUR, 1)
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
  redraw();
}
