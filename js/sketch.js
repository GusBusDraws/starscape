let N_STARS = 100;
let MIN_CLUSTER_R = 100;
let MAX_CLUSTER_R = 500;

function setup() {
  createCanvas(500, 500);
  resetSketch();
  console.log('Press SPACE to stop looping or r to reset.');
}

function draw() {
  noLoop();
  for (let star_i = 0; star_i < N_STARS; star_i ++) {
    // Cluster or singular star
    let clusterRand = random(1);
    if (clusterRand < 0.2) {
      let posX = random(width)
      let posY = random(height)
      let clusterSize = randomGaussian(MIN_CLUSTER_R, MAX_CLUSTER_R)
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
        // Cluster sizw
        let offsetX = randomGaussian(-clusterSize, clusterSize)
        let offsetY = randomGaussian(-clusterSize, clusterSize)
        point(posX + offsetX, posY + offsetY);
      }
    } else {
      point(random(width), random(height));
    }
  }
}

function resetSketch() {
  background(0);
}
