let N_STARS = 100;
let MIN_CLUSTER_R = 10;
let MAX_CLUSTER_R = 250;
let DEBUG_MODE = false;
let N_NEBULA_STARS = 1000;
let y1;
let y2;
let a;
let b;
let c = 0.02;
let d = 0.5;

function setup() {
  createCanvas(500, 500);
  resetSketch();
  console.log('Press SPACE to stop looping or r to reset.');
}

function draw() {
  noLoop();
  let wave1Y = [];
  let wave2Y = [];
  for (let x = 0; x < width; x += 0.1) {
    a = x;
    b = height / 10;
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
  stroke(255)
  strokeWeight(1)
  for (i_nebula = 0; i_nebula < N_NEBULA_STARS; i_nebula ++) {
    let xNebula = random(width);
    a = xNebula;
    b = height / 10;
    y1 = a + b * sin(c * xNebula + d);
    y2 = a + b * cos(c * xNebula + d);
    let yNebula;
    if (y1 < y2) {
      // yNebula = (y2 + y1) / 2
      // yNebula = random(y1, y2)
      yNebula = randomGaussian((y2 + y1) / 2, (y2 - y1) / 4);
    } else {
      // yNebula = (y1 + y2) / 2
      // yNebula = random(y2, y1)
      yNebula = randomGaussian((y1 + y2) / 2, (y1 - y2) / 4);
    }
    point(xNebula, yNebula)
  }
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
        let opacityRand = random(1);
        stroke(255, 255, 255, opacityRand * 255)
        // Cluster size
        let offsetX = randomGaussian(posX, clusterSize)
        let offsetY = randomGaussian(posY, clusterSize)
        // let offsetX = randomGaussian(-clusterSize, clusterSize)
        // let offsetY = randomGaussian(-clusterSize, clusterSize)
        point(offsetX, offsetY);
      }
    } else {
      point(random(width), random(height));
    }
  }
}

function resetSketch() {
  background(0);
  redraw();
}
