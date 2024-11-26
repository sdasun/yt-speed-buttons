(function () {
  const speeds = [1, 1.25, 1.5, 1.75, 2, 2.5, 3];
  let buttonsContainer;

  function createSpeedButtons() {
    if (buttonsContainer) return; // Prevent duplicate buttons

    // Select the YouTube video player
    const player = document.querySelector('#below');
    if (!player) return;

    // Create a container for the buttons
    buttonsContainer = document.createElement('div');
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '-4px';
    buttonsContainer.style.right = '0px';
    buttonsContainer.style.zIndex = '9999';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexDirection = 'row';
    
    // Create buttons for each speed
    speeds.forEach(speed => {
      const button = document.createElement('button');
      button.textContent = `${speed}x`;
      button.style.margin = '2px';
      button.style.padding = '5px';
      button.style.fontSize = '14px';
      button.style.border = '1px solid #ccc';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
      button.style.width = '48px';
      button.style.margin = '2px';
      button.style.backgroundColor = '#ffffffcc'; // Set initial background color

      // Add a CSS class to indicate the button is clicked
      button.classList.add('speed-button');

      // Set the video playback speed when clicked
      button.addEventListener('click', () => {
        const video = document.querySelector('video');
        if (video) {
          video.playbackRate = speed;
          // Remove the active class from all buttons and reset background color
          document.querySelectorAll('.speed-button').forEach(otherButton => {
            otherButton.classList.remove('active');
            otherButton.style.backgroundColor = '#ffffffcc'; // Reset background color
          });
          // Add a CSS class to indicate the button is active
          button.classList.add('active');
          // Add inline CSS to change the background color
          button.style.backgroundColor = '#7daaff'; /* blue color */
        }
      });
      buttonsContainer.appendChild(button);
    });

    // Append the container to the player
    player.appendChild(buttonsContainer);
  }

  function checkForPlayer() {
    const player = document.querySelector('.html5-video-player');
    if (player && !buttonsContainer) {
      createSpeedButtons();
    }
  }

  // Observe changes in the DOM to handle navigation within YouTube
  const observer = new MutationObserver(() => {
    checkForPlayer();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial check when the script loads
  checkForPlayer();
})();
