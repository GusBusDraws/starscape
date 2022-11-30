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
    } else if (key === 's') {
      save('frame.png')
    }
  }

