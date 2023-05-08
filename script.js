const percentages = [5, 15, 15, 35, 100];
//[deont, virtue, information, consequentialism, util]
var theoriesList = [0, 0, 0, 0, 0]
const totalQuestions = 15;
let currentPage = -1;
let selectedTheory = -1;

// Define quiz questions and answers

const quizQuestions = [
  {
    question: "Because of “big tech’s” perceived power, lagging regulation, and an absence of common industry practices, many consumers, investors, employees, and governments are demanding greater overall accountability from the industry.",
    choices: ["Yes whohadof sdofnad fioasd hfaiosdhfoaisdh f", "Madrid", "Rome", "Berlin"],
    explanations: ["deont", "virtue", "consequbefwfs", "sfsdfsdf"],
    theories: [0, 1, 2, 3],
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Jupiter", "Saturn", "Mars", "Venus"],
    explanations: ["deont", "virtue", "consequbefwfs", "sfsdfsdf"],
    theories: [0, 1, 2, 3],
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Mount Everest", "K2", "Makalu", "Kangchenjunga"],
    explanations: ["deont", "virtue", "consequbefwfs", "sfsdfsdf"],
    theories: [0, 1, 2, 3],
  }
];

// Get DOM elements
const container = document.querySelector(".container");
const startButton = document.querySelector("button");

// Add event listener to start button
startButton.addEventListener("click", startQuiz);

// Start quiz function
function startQuiz() {
  // Hide start button and show first question
  startButton.style.display = "none";
  showQuestion(0);
}

// Show question function
function showQuestion(currentIndex) {
  // Get current question
  const currentQuestion = quizQuestions[currentIndex];

  currentPage+=1;
  if (selectedTheory > -1) theoriesList[selectedTheory]++;
  
  // Create HTML for question and choices
  const questionHTML = `
  <div class="question">
    <div id="page-count">Question ${currentPage} of ${totalQuestions}</div>
    <h2>${currentQuestion.question}</h2>
    <ul class="choices">
      ${currentQuestion.choices.map((choice, index) => `
        <li><button onclick="checkAnswer(${currentIndex}, ${index})">${choice}</button></li>
      `).join("")}
    </ul>
  </div>
  <div class = "answer-explanation"></div>
`;
  
  // Add question HTML to container
  container.innerHTML = questionHTML;
}

// Check answer function
function checkAnswer(currentIndex, index) {
  const currentQuestion = quizQuestions[currentIndex];

  selectedTheory = currentQuestion.theories[index];

  var answerExplanationHTML;
   const explanation = document.querySelector(".answer-explanation")
   if (currentIndex < quizQuestions.length - 1) {
    answerExplanationHTML =
    `
     <div class="answer-explanation">
       <p>${currentQuestion.explanations[index]}</p>
     </div>
     <button class="next-button" onclick="showQuestion(${currentIndex + 1})">Next</button>
   `;
   }
   else{
    answerExplanationHTML =
    `
     <div class="answer-explanation">
       <p>${currentQuestion.explanations[index]}</p>
     </div>
     <button class="next-button" onclick="endQuiz()">Next</button>
   `;}
  // Show next question or end quiz
   explanation.innerHTML = answerExplanationHTML;
}

// End quiz function
function endQuiz() {

  theoriesList[selectedTheory]++;
  var resultTheory;
  
  let maxIndex = 0;
  let maxValue = theoriesList[0];
  theoriesList.forEach((theory, index) => {
    if (theory > maxValue){
      maxValue = theory;
      maxIndex = index;
    }
  });

  switch(maxIndex){
    case 0:
      resultTheory = "deontology";
      break;
    case 1:
      resultTheory = "virtue";
      break;
    case 2:
      resultTheory = "info";
      break;
    case 3:
      resultTheory = "cons";
      break;
    default:
      resultTheory = "util";
      break;
  }

  // Show end screen with message and option to restart quiz
  const endHTML = `
    <div class="end-screen">
      <h2>Congratulations!</h2>
      <p>You have completed the quiz. Your responses are most consistent with <b>${resultTheory}</b>.</p>
      <p style="text-align:justify; max-width: 80%;"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
      <p>Here's the breakdown:</p>
    </div>
    <div class="slider-container">
    <div class="slider-wrapper">
    <div class="slider" id="slider1"><div class="slider-description">${theoriesList[0]}%</div></div>
    <div class="slider-label">Deontology</div>
    </div> 
    <div class="slider-wrapper">
    <div class="slider" id="slider2"><div class="slider-description">${theoriesList[1]}%</div></div>
    <div class="slider-label">Virtue Ethics</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider3"><div class="slider-description">${theoriesList[2]}%</div></div>
    <div class="slider-label">Information Ethics</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider4"><div class="slider-description">${theoriesList[3]}%</div></div>
    <div class="slider-label">Consequentialism</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider5"><div class="slider-description">${theoriesList[4]}%</div></div>
    <div class="slider-label">Utilitarianism</div>
    </div>
    </div>
    <button onclick="location.reload()">Restart Quiz</button>

  `;
  
  // Add end screen HTML to container
  container.innerHTML = endHTML;


function updateSliders() {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider, index) => {
    if (theoriesList[index] > 15) theoriesList[index] -= 15;
    slider.style.width = theoriesList[index] + "%";
  });
}

updateSliders();

}
