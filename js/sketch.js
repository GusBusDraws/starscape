let N_STARS = 100;
let MIN_CLUSTER_R = 10;
let MAX_CLUSTER_R = 250;
let DEBUG_MODE = true;
let N_NEBULA_STARS = 10000;
let COLORS = ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c']
let y1;
let y2;
let a;
let b;
let c;
let d;

function setup() {
  createCanvas(500, 500);
  resetSketch();
  console.log('Press SPACE to stop looping or r to reset.');
}

function draw() {
  noLoop();
  let bg_color = color(0)
  // index = COLORS.indexOf(bg_color)
  // COLORS.splice(index, 1)
  background(bg_color);
  let wave1Y = [];
  let wave2Y = [];
  for (let x = 0; x < width; x += 0.1) {
    a = 0.6 * height;
    b = 0.5 * height;
    c = 0.005;
    d = 1.25
    y1 = a + b * sin(c * x + d);
    wave1Y.push(y1)
    y2 = a + b * cos(c * x + d);
    wave2Y.push(y2)
  }
  if (DEBUG_MODE === true) {
    strokeWeight(1);
    for (let wave_i = 0; wave_i < wave1Y.length; wave_i ++) {
      stroke(255, 0, 0);
      point(wave_i / 10, wave1Y[wave_i]);
      stroke(0, 255, 0);
      point(wave_i / 10, wave2Y[wave_i]);
    }
  }
  let nebulaColor = random(COLORS)
  // index = COLORS.indexOf(nebulaColor)
  // COLORS.splice(index, 1)
  stroke(nebulaColor)
  strokeWeight(1)
  for (i_nebula = 0; i_nebula < N_NEBULA_STARS; i_nebula ++) {
    let xNebula = random(width);
    y1 = a + b * sin(c * xNebula + d);
    y2 = a + b * cos(c * xNebula + d);
    let yNebula;
    if (y1 < y2) {
      yNebula = randomGaussian((y2 + y1) / 2, (y2 - y1) / 4);
    } else {
      yNebula = randomGaussian((y1 + y2) / 2, (y1 - y2) / 4);
    }
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
