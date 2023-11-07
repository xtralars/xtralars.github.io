
const daysData = [
  {
    audioURL: 'Resources/lofi1.mp3',
    text: 'Day 1 Text',
  },
  {
    audioURL: 'audio/day2.mp3',
    text: 'Day 2 Text',
  },
  {
      audioURL: 'audio/day2.mp3',
      text: 'Day 3 Text',
  },
  {
      audioURL: 'audio/day2.mp3',
      text: 'Day 4 Text',
  },
  
  {
        audioURL: 'audio/day5.mp3',
        text: 'Day 5 Text',
  },
  {
        audioURL: 'audio/day2.mp3',
        text: 'Day 6 Text',
  },
  {
          audioURL: 'audio/day2.mp3',
          text: 'Day 7 Text',
  },
  {
          audioURL: 'audio/day2.mp3',
          text: 'Day 8 Text',
   },
   {
      audioURL: 'Resources/lofi1.mp3',
      text: 'Day 9 Text',
    },
    {
      luke: 'Luke 10',
      audioURL: 'https://firebasestorage.googleapis.com/v0/b/musikkjulekalender2.appspot.com/o/lofi.mp3?alt=media&token=7f1bbc4f-4bfa-4ad0-9ef6-7134dcb160ac&_gl=1*2agtxq*_ga*MjIwNTQ4NTY4LjE2OTY0NDI5MDY.*_ga_CW55HF8NVT*MTY5NjkyODQxMS4xNS4xLjE2OTY5Mjg0MjMuNDguMC4w',
      text: 'Day 10 Text',
    },
    {
      luke: 'Luke 11',  
        audioURL: 'https://firebasestorage.googleapis.com/v0/b/musikkjulekalender2.appspot.com/o/lofi.mp3?alt=media&token=7f1bbc4f-4bfa-4ad0-9ef6-7134dcb160ac&_gl=1*2agtxq*_ga*MjIwNTQ4NTY4LjE2OTY0NDI5MDY.*_ga_CW55HF8NVT*MTY5NjkyODQxMS4xNS4xLjE2OTY5Mjg0MjMuNDguMC4w',
        text: 'Day 11 Text',
    },
    {
      luke: 'Luke 12',
        audioURL: 'audio/day2.mp3',
        text: 'Day 12 Text',
    },
    
    {
      luke: 'Luke 13',
          audioURL: 'audio/day1.mp3',
          text: 'Day 13 Text',
    },
    {
          audioURL: 'audio/day2.mp3',
          text: 'Day 14 Text',
    },
    {
            audioURL: 'audio/day2.mp3',
            text: 'Day 15 Text',
    },
    {
            audioURL: 'audio/day2.mp3',
            text: 'Day 16 Text',
     },
     {
      audioURL: 'audio/day2.mp3',
      text: 'Day 17 Text',
},
{
audioURL: 'audio/day2.mp3',
text: 'Day 18 Text',
},
{
audioURL: 'audio/day2.mp3',
text: 'Day 19 Text',
},
{
audioURL: 'audio/day2.mp3',
text: 'Day 20 Text',
},
{
audioURL: 'audio/day2.mp3',
text: 'Day 21 Text',
},
{
audioURL: 'audio/day2.mp3',
text: 'Day 22 Text',
},
{
  luke: 'Luke 23',
  audioURL: '/Resources/lofi.mp3',
  text: 'Day 23 Text',
  fasit: 'Lars',
  },
  {
    luke: 'Luke 24',
  audioURL: 'Resources/lofi.mp3',
  text: 'Dette er luke 24 sin oppgave tekst. Her kommer det muligens masse tekst',
  fasit: 'Lars',
  hint1: 'Lars er kul',
  hint2: 'Lars er mega kul',
    },
    {
      luke: 'Luke 25',
    audioURL: 'Resources/lofi.mp3',
    text: 'Dette er luke 25 sin oppgave tekst. Her kommer det muligens masse tekst',
    fasit: 'Lars',
    hint1: 'Lars er kul',
    hint2: 'Lars er mega kul',
      },


    
  // Add data for the remaining 22 days similarly
];

const currentDate = new Date();
const currentDay = currentDate.getDate();

// Assuming your div has an id of "gameboard"
const gameboard = document.getElementById('gameboard');

// Check if the current day is within the range of 1 to 24
if (currentDay >= 1 && currentDay <= 25) {
const dayData = daysData[currentDay - 1]; // Adjust the index since arrays are 0-based

// Update the audio source
const audioSource = document.getElementById('song');
audioSource.src = dayData.audioURL;


// Update the text content
const opgText = document.getElementById('opgText');
opgText.textContent = dayData.text;
const opgHead = document.getElementById('opgHead');
opgHead.textContent = dayData.luke;



const hint1 = document.getElementById('hintText1');
hintText1.textContent = dayData.hint1;
const hint2 = document.getElementById('hintText2');
hintText2.textContent = dayData.hint2;

// Store the correct answer in a variable
const correctAnswer = dayData.fasit;

const submitGuess = document.getElementById('submitGuess');
submitGuess.addEventListener('click', checkGuess);

function checkGuess() {
  event.preventDefault();
  const inputGuess = document.querySelector('#guessInput').value; // Correct the querySelector and value access
  const message = document.querySelector('#message'); // Correct the querySelector

  if (inputGuess === correctAnswer) { // Compare user's input with the correct answer
    message.textContent = 'Gratulerer! ' + correctAnswer + ' er riktig.';
  } else {
    message.textContent = inputGuess + ' er feil. Prøv igjen.';
  }
}
} else {
// Handle the case where the current day is not in the range 1-24
gameboard.textContent = 'Invalid day';
}



let visHint1 = document.querySelector(".hidden1");
let visHint2 = document.querySelector(".hidden2");

function giveHint1(){
  visHint1.classList.toggle("hidden1");
  
}
function giveHint2(){
  visHint2.classList.toggle("hidden2");
  
}

const hintBtn1 = document.getElementById("hintBtn1");
const hintBtn2 = document.getElementById("hintBtn2");

hintBtn1.addEventListener('click', giveHint1);

hintBtn2.addEventListener('click', giveHint2)