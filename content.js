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
    buttonsContainer.style.top = '-10px';
    buttonsContainer.style.right = '28px';
    buttonsContainer.style.zIndex = '9999';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexDirection = 'row';
    buttonsContainer.style.width = '370px';

    // Create buttons for each speed
    let i = 0;
    speeds.forEach(speed => {
      i++;
      const button = document.createElement('button');
      button.textContent = `${speed}x`;
      button.style.margin = '2px';
      button.style.padding = '5px';
      button.style.fontSize = '14px';
      button.style.backgroundColor = '#ffffffcc';
      button.style.border = '1px solid #ccc';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
      button.style.position = 'fixed'
      button.style.width = '48px';
      button.style.marginLeft = i * 50 + 'px';

      // Set the video playback speed when clicked
      button.addEventListener('click', () => {
        const video = document.querySelector('video');
        if (video) {
          video.playbackRate = speed;
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
