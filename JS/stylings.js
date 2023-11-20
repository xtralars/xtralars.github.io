function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark_mode");
  }
  document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);
  
  
  // Get the modal
  var signInModal = document.getElementById('signInModal');
  var registerModal = document.getElementById('registerModal');
  var infoModal = document.getElementById('infoModal');
  
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
  }

  // Audio player config//
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function(){
  progress.max = song.duration;
  progress.value = song.currentTime;
}
function playPause(){
  if(ctrlIcon.classList.contains("fa-pause")){
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
  else{
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

if(song.play()){
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
progress.onchange = function(){
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
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

export {triggerConfetti}
