function keyPressed() {
    // Set spacebar to toggle play/pause of drawing loop
    if (key === ' ') {
      if (isLooping()) {
        noLoop();
        console.log('STOPPED. Press SPACE to resume.')
      } else {
        loop();
        console.log('RESUMED. Press SPACE to stop.')
      }
    } else if (key === 'r') {
      console.log('Reseting sketch...')
      resetSketch();
    } else if (key === 'd') {
      if (DEBUG_MODE === true) {
        console.log('DEBUG_MODE turned off.')
        DEBUG_MODE = false;
        resetSketch();
      } else {
        console.log('DEBUG_MODE turned on.')
        DEBUG_MODE = true;
        resetSketch();
      }
    } else if (key === 's') {
      saveGif('animation', 5);
    }
  }

