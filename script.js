const gameContainer = document.getElementById('game-container');
const audioPlayer = document.getElementById('audio-player');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-answer');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const resultImage = document.getElementById('result-image');
const resultMessage = document.getElementById('result-message');
const continueButton = document.getElementById('continue-button');
const landingPage = document.getElementById('landing-page');
const startButton = document.getElementById('start-button');
const playMusicButton = document.getElementById('play-music-button');
const backgroundMusic = document.getElementById('background-music');
const incorrectSound = document.getElementById('incorrect-sound');
console.log('Incorrect sound element:', incorrectSound);
backgroundMusic.loop = false;
incorrectSound.load();

playMusicButton.addEventListener('click', () => {
  if (backgroundMusic.paused) {
      backgroundMusic.play()
          .then(() => {
              playMusicButton.textContent = 'Pause Music';
          })
          .catch(error => {
              console.error('Error playing music:', error);
          });
  } else {
      backgroundMusic.pause();
      playMusicButton.textContent = 'Play Music';
  }
});

const quizData = [
    { 
        question: "How many big round holes in Lily's music stand?", 
        answer: "48", 
        correctImage: 'images/well-done-despicable-me.gif',
        incorrectImage: 'images/nope.webp',
        audio: 'sound/applause.wav'
    },
    { 
      question: "Okay, that was too easy. This time, how many puppies are in August?", 
      answer: "4", 
      correctImage: 'images/dogs.webp',
      incorrectImage: 'images/nope.webp',
      audio: 'sound/applause.wav'
  },

    { 
        question: "Okay, that was still too easy. This time, how many black keys are on the keyboard?", 
        answer: "36", 
        correctImage: 'images/groot.webp',
        incorrectImage: 'images/nope.webp',
        audio: 'sound/applause.wav'
    },
    { 
        question: "Which Pokemon starts with the letter L and is known as a light pokemon", 
        answer: "Lanturn", 
        correctImage: 'images/dumbledore.webp',
        incorrectImage: 'images/nope.webp',
        audio: 'sound/applause.wav'
    },
    { 
      question: "What colour is the A button on the video game controllers?", 
      answer: "green", 
      correctImage: 'images/deadpool.webp',
      incorrectImage: 'images/nope.webp',
      audio: 'sound/applause.wav'
  },

  { 
    question: "In Japan, Lily and Lincoln wanted a photo in front of a train covered in flashing lights.  What did it say in front of the train?", 
    answer: "Shimbashi", 
    correctImage: 'images/Dean-cheers.gif',
    incorrectImage: 'images/nope.webp',
    audio: 'sound/applause.wav'
},
{ 
    question: "What does the white writing say on the bottom of King Kong's foot?", 
    answer: "G1186", 
    correctImage: 'images/dean-glasses.gif',
    incorrectImage: 'images/nope.webp',
    audio: 'sound/applause.wav'
},
{ 
    question: "What does the green apple say on Lily's water bottle?", 
    answer: "Excellent", 
    correctImage: 'images/anna_wonderwoman.gif',
    incorrectImage: 'images/nope.webp',
    audio: 'sound/applause.wav'
},
{ 
    question: "What number is on the fabuland mouse's shirt?", 
    answer: "8", 
    correctImage: 'images/dean-dnd.gif',
    incorrectImage: 'images/nope.webp',
    audio: 'sound/applause.wav'
},


  { 
    question: "Inside the doorbell is a _____", 
    answer: "key", 
    correctImage: 'images/great-job-yes.gif',
    incorrectImage: 'images/nope.webp',
    audio: 'sound/applause.wav'
},
{ 
  question: "Keep the key, you will need it later. How many steps to get up the spiral staircase?", 
  answer: "16", 
  correctImage: 'images/trex.gif',
  incorrectImage: 'images/nope.webp',
  audio: 'sound/applause.wav'
},
{ 
  question: "I have keys but I can can't open locks.  I am a ____", 
  answer: "piano", 
  correctImage: 'images/cookie.webp',
  incorrectImage: 'images/nope.webp',
  audio: 'sound/applause.wav'
},
{ 
  question: "What is the Ice Kings real name?", 
  answer: "Simon", 
  correctImage: 'images/fin.webp',
  incorrectImage: 'images/nope.webp',
  audio: 'sound/applause.wav'
},
{ 
  question: "A farmer has 17 sheep, and all but 9 fly away. How many are left?", 
  answer: "9", 
  correctImage: 'images/darth-vader-fire.gif',
  incorrectImage: 'images/nope.webp',
  audio: 'sound/Lincoln.mp3'
},


    // Add more questions as needed
];

let currentQuestionIndex = 0;

function startQuiz() {
  landingPage.style.display = 'none';
  quizContainer.style.display = 'block';
  
  // Stop the background music
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;  // This resets the audio to the beginning
  
  loadQuestion();
}

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answerInput.value = '';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = quizData[currentQuestionIndex].answer.toLowerCase();
  resultContainer.classList.add('celebrate');
  if (userAnswer === correctAnswer) {
      showResult(true);
  } else {
      showResult(false);
  }
}

function showResult(isCorrect) {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  
  const currentQuestion = quizData[currentQuestionIndex];
  
  if (currentQuestion) {
      if (isCorrect) {
          resultImage.src = currentQuestion.correctImage;
      } else {
          resultImage.src = currentQuestion.incorrectImage;
          //incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e));
     
      }
      resultImage.style.display = 'block';
  } else {
      console.error("Question data is missing for index", currentQuestionIndex);
      resultImage.style.display = 'none';
  }
  
  resultImage.onerror = function() {
      console.error("Error loading image:", this.src);
      this.style.display = 'none';
  };
  
  if (isCorrect) {
      resultMessage.textContent = 'Correct!';
      if (currentQuestion.audio) {
          audioPlayer.src = currentQuestion.audio;
          audioPlayer.play().catch(e => console.error("Error playing audio:", e));
      }
      if (currentQuestionIndex < quizData.length - 1) {
          continueButton.style.display = 'block';
          continueButton.textContent = 'Next Question';
      } else {
          continueButton.style.display = 'none';
          resultMessage.textContent += '   Now, go to your father.  Give him the key you have found.  Say the magic words - Pater aperi porta';
      }
  } else {
      resultMessage.textContent = 'Incorrect. Try again!';
      continueButton.style.display = 'block';
      continueButton.textContent = 'Try Again';
      incorrectSound.play().catch(e => console.error("Error playing incorrect sound:", e));
  }
}

function nextQuestion() {
  if (resultMessage.textContent.includes('Correct!')) {
      currentQuestionIndex++;
  }
  if (currentQuestionIndex < quizData.length) {
      loadQuestion();
  } else {
      resultMessage.textContent = 'Quiz completed!';
      continueButton.style.display = 'none';
  }
}

// Event Listeners
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', checkAnswer);
continueButton.addEventListener('click', nextQuestion);
backgroundMusic.addEventListener('ended', () => {
  console.log("Background music has finished playing");
  // You can add any additional behavior here if needed
});

// Initialize the quiz
window.addEventListener('load', () => {
  landingPage.style.display = 'block';
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'none';
  
  // Play background music
  backgroundMusic.play().catch(e => {
      console.error("Error playing background music:", e);
      console.log("User interaction may be required to play audio.");
  });
});