function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark_mode");
  }
  document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);
  
  
  // Get the modal
  var signInModal = document.getElementById('signInModal');
  var registerModal = document.getElementById('registerModal');
  var infoModal = document.getElementById('infoModal');
  var leaderboardModal = document.getElementById('leaderboardModal');
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == signInModal) {
      signInModal.style.display = "none";
    }
  // When the user clicks anywhere outside of the modal, close it
    if (event.target == registerModal) {
      registerModal.style.display = "none";
    }
    if (event.target == infoModal) {
      infoModal.style.display = "none";
    }
    if (event.target == leaderboardModal) {
      leaderboardModal.style.display = "none";
    }
  }




function triggerConfetti() {
  const confettiContainer = document.querySelector('#confetti-container');

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDelay = Math.random() * 2 + 's';

    confettiContainer.appendChild(confetti);

    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
}

