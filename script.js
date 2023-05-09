const percentages = [5, 15, 15, 35, 100];
//[deont, virtue, structural, care, util, information]
var theoriesList = [0, 0, 0, 0, 0, 0]
const totalQuestions = 9;
let currentPage = -1;
let selectedTheory = -1;

// Define quiz questions and answers

const quizQuestions = [
  {
    question: "There is a massive natural disaster, and people lose access to their regular forms of transportation. A company provides taxi services, and they are unsure what to do in this high-demand scenario. Should the company increase their prices, decrease their prices, or keep them the same?",
    choices: ["Reduce prices, so that more people could have access to the service in times of great need", "Reduce prices, as the company has a relationship with their customers, and in order to maintain the well-being of their relationship with customers they should reduce prices in times of need", "Keep prices, as neither party should take advantage of the situation"],
    explanations: ["This reasoning aims to ensure that the amount of total benefit is maximized, as the company sacrificing profits would help many people during a difficult situation.", "This reasoning focuses on the caring relationship between the company and customer and the duty of the company to maintain the longevity of the relationship.", "Deontology"],
    theories: [4,3,0],
  },
  {
    question: "There is a massive natural disaster, and people lose access to their regular forms of transportation. A company provides taxi services, and they are unsure what to do in this high-demand scenario. How should a government distribute resources to those who are affected from the flood?",
    choices: ["Distribute to traditionally marginalized areas and groups first in order to account for socioeconomic inequities.", "Distribute resources to everyone equally.", "Distribute resources to those who are most in need first."],
    explanations: ["This explanation highlights the structural inequities present in society.", "virtue", "consequbefwfs"],
    theories: [2,4,3],
  },
  {
    question: "There is a massive natural disaster, and people lose access to their regular forms of transportation. A company provides taxi services, and they are unsure what to do in this high-demand scenario. The government wants to create a database that keeps track of the specific damages (both costs and areas where there was damage) from previous natural disasters to better address future natural disasters. When doing this, the government collects satellite images of these disasters. Is the government justified in doing this?",
    choices: ["Yes. To better understand how to deal with future natural disasters, we must understand the strengths and weaknesses of the government’s response to previous disasters.","Yes. The government has a responsibility to ensure the well-being of its citizens, and by identifying vulnerable areas during a disaster, it can make sure each of its citizens have a great chance at recovering from the natural disaster.","No. This amount of data may not respect the privacy of people in different affected regions and may bring them unwarranted government attention."],
    explanations: ["This response highlights virtue ethics because it emphasizes the need to learn ethics from prior experiences. Additionally, it emphasizes “fundamental human goods” by valuing the life and safety of citizens.","This highlights the caring relationship between the government and its citizens and the importance of caring for the vulnerable.","This response highlights how the government should treat people as an end in and of themselves and thus respect their privacy."],
    theories: [1,3,0],
  }, 
  {
    question: "A new predictive policing algorithm is developed to determine the likelihood of someone for reincarceration. Should this algorithm be used in conviction?",
    choices: ["Not at all. Sentencing requires an understanding of fundamental human virtues which an AI cannot grasp.", "Not at all. Due to its biased input data, the algorithm would promote systemic and structural inequities if it had any role in conviction.", "Yes. If the algorithm is overall more accurate than a judge might be in assessing risk, it can and should be used."],
    explanations: ["deont", "virtue", "consequbefwfs"],
    theories: [1,2,4],
  },
  {
    question: "A new predictive policing algorithm is developed to determine the likelihood of someone for reincarceration. How should the algorithm account for racial biases?",
    choices: ["It should reactively reduce the likelihood for certain racial groups more vulnerable to police encounters (ex. African and Hispanic Americans).", "Nothing. Changing the algorithm would inherently be unfair.", "There is no way to fix this issue without solving the root issue of systemic racism."],
    explanations: ["deont", "virtue", "consequbefwfs"],
    theories: [4,0,2],
  },
  {
    question: " A new predictive policing algorithm is developed to determine the likelihood of someone for reincarceration. If a judge uses the algorithm to make a conviction, and it is later known that the risk assessment was inaccurate, who is to blame for the mistake?",
    choices: ["The judge. He is the only rational agent in the situation, but he instead deferred responsibility to an algorithm. By doing so, he did not respect the right of the accused to be judged by a rational individual. The algorithm is not a rational agent, and cannot be at fault.", "The judge. The judge was the only one who could understand the intricacies of the situation and use his understanding of the law and fundamental human values to deliver a verdict. The algorithm, since it is not human, cannot understand human values and character, so it should not have been used for conviction.", "The algorithm. The algorithm provided wrong and harmful information, so it is to blame, even though it is not sentient. The judge provided no information of his own, so he cannot be to blame."],
    explanations: ["Deontology", "Virtue theory", "Information ethics"],
    theories: [0, 1, 5],
  },
  {
    question: "Issues with the development of generative AI, harm to the information environment. A new generative AI chatbot helps college applicants get their questions answered during the stressful college application process. The AI has no way to verify the truth of its statements, as it primarily just pulls from the internet. Suppose the AI says the acceptance rate of a certain college is 26 percent instead of 24 percent (since the updated acceptance rate is outside the time period of data from which the AI pulls from). Has the AI committed an ethical mistake?",
    choices: ["No. There are little to no repercussions to the AI’s mistake.","No. The AI is not conscious of the decisions it makes, so it cannot be wrong.","Yes. By putting incorrect information into circulation, the AI has committed an ethical wrong, even though it may not be sentient."],
    explanations: ["Utilitarianism","Deontology","Information Ethics"],
    theories: [4,0,5],
  },
  {
    question: "Issues with the development of generative AI, harm to the information environment. A new generative AI chatbot helps college applicants get their questions answered during the stressful college application process. With the increasing popularity of this generative AI, students start to rely less and less on teachers, college counselors, family, and other students when navigating the college admissions process, instead just getting most of their information from the AI. Is this a problem? If it is, why could it be a problem?",
    choices: ["Yes. The AI has no way of verifying or contextualizing its information, so solely relying on it for information would be incomplete as it could be putting false information into the environment.","Yes. AI cannot replicate the caring relationships that teachers, counselors, family, and other students have with the applicant, which help the student find out what's best for them.","No. Students from higher socioeconomic backgrounds traditionally have better support during the college application process, so the popularity of an open-source AI would help alleviate this structural problem."],
    explanations: ["his argument focuses on how there is harm to the infosphere (or information environment), and that itself is a problem, regardless of whether the agent is sentient or not.","This argument emphasizes how AI cannot replace caring relationships that are innate to humans.","This argument focuses on the inequalities present within current social structures and how AI could alleviate this issue"],
    theories: [5,3,2],
  },
  {
    question: "Issues with the development of generative AI, harm to the information environment. A new generative AI chatbot helps college applicants get their questions answered during the stressful college application process. The company which created the chatbot now wants to impose ethical restrictions. What is the best way for the company to impose such restrictions?",
    choices: ["The AI should learn from its prior experiences. Depending on how users and/or the creators react to what it outputs, it should alter its response to be more ethical.","The company should code in ethical rules which the AI should follow which prevent the AI from outputting fake or potentially harmful information out into the environment."],
    explanations: ["This answer reflects virtue ethics because it emphasizes that ethical virtues are learned through experience rather than rigid moral codes.","This focuses on restricting the spread of potentially false and harmful information into the infosphere."],
    theories: [1,5],
  },
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
  var summary = "";
  
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
      resultTheory = "Deontology";
      summary = "Deontological ethics is a type of normative moral philosophy that judges the morality of an action based on the action’s adherence to a rule or duty. It does not consider the consequences or outcomes of the action, only whether it is right or wrong in itself. Deontology asserts that certain moral principles or duties are absolute and universal, and that these should guide individual behavior and decision-making. Moreover, Deontologists consider the intentions and motives behind actions, rather than simply the outcomes, and argue that an action can be considered morally right or wrong based on the intentions of the actor and whether the action conforms to moral principles and duties.";
      break;
    case 1:
      resultTheory = "Virtue Ethics";
      summary = "Virtue theory is a philosophical approach to ethics that emphasizes the importance of virtues in determining ethical behavior.   According to Aristotle, virtues are “character traits that enable individuals to live a good life, to flourish and to be happy, and to contribute to the common good” (Aristotle, Nicomachean Ethics, Book 1). Virtues are not rigid rules, but are context-dependent and require practical wisdom to determine their appropriate application in specific situations. Reasoning, therefore, is central to virtue ethics. Additionally, contemporary virtue ethicists, such as Rosalind Hursthouse, have emphasized the importance of empathy and compassion in the development of virtues."
      break;
    case 2:
      resultTheory = "Structural Justice";
      summary = "Structural justice theory is a framework that seeks to identify and address the systemic inequalities and injustices that exist within social structures and institutions. It recognizes that individuals are not solely responsible for their own circumstances, but that broader societal and structural factors play a significant role in determining outcomes. Structural justice theory seeks to understand the root causes of systemic inequality, and to address these through changes to social policies and institutions. This approach recognizes that certain groups are systematically disadvantaged due to factors such as race, gender, and socioeconomic status, and seeks to promote greater equity and fairness in society through targeted interventions and reforms. Structural justice theory emphasizes the importance of addressing structural inequalities in order to achieve greater social justice and improve the lives of all members of society.";
      break;
    case 3:
      resultTheory = "Ethics of Care";
      summary = "Care ethics is an ethical theory that emphasizes the importance of caring relationships and virtues such as empathy, compassion, and sensitivity. Indeed, care ethics encourages the fostering of genuine care and compassion towards others. As per the ethic of care framework proposed by Joan Tronto in An Ethic of Care, there is emphasis on a responsibility towards others and a need to prioritize collective well-being over individual interests.Caring means recognizing the inherent value and dignity of individuals. It follows that Care ethics recognizes the importance of empowering relationships that promote autonomy, agency, and informed decision-making.";
      break;
    case 4:
      resultTheory = "Utilitarianism";
      summary = "Utilitarianism is a consequentialist ethical theory that focuses on the outcomes of actions in determining their moral value. It emphasizes the importance of maximizing overall happiness or well-being in decision-making, as this leads to the greatest benefit for the greatest number of people. This approach is supported by empirical evidence and objective reasoning, and seeks to weigh the positive and negative consequences of an action in order to determine its ethical value. In other words, utilitarianism is often associated with the principle of the greatest happiness, which asserts that the moral worth of an action is determined by its ability to generate the greatest amount of happiness or pleasure, while minimizing any suffering or pain that it may cause.";
      break;
    default: 
      resultTheory = "Information Ethics"
      summary = "Information Ethics explores ethical issues related to the creation, distribution, access, and use of information. In particular, it considers the rights and responsibilities of individuals and organizations in relation to the use of information and technology, and seeks to promote ethical behavior and decision-making in these domains. Moreover, It is concerned with questions of privacy, security, intellectual property, censorship, and the impact of technology on society. This is all outlined in James Moor’s What is Computer Ethics?, as he states that “computer ethics is the analysis of the nature and social impact of computer technology and the corresponding formulation and justification of policies for the ethical use of such technology”. According to Information Ethics, we should be continuously evaluating the machines/algorithms that we create and the information that it broadcasts.";
      break;
  }

  // Show end screen with message and option to restart quiz
  const endHTML = `
    <div class="end-screen">
      <h2>Congratulations!</h2>
      <p>You have completed the quiz. Your responses are most consistent with <b>${resultTheory}</b>.</p>
      <p style="text-align:justify; max-width: 80%;">${summary}</p>
      <p>Here's the breakdown:</p>
    </div>
    <div class="slider-container">
    <div class="slider-wrapper">
    <div class="slider" id="slider1"><div class="slider-description">${theoriesList[0]}%</div></div>
    <div class="slider-label">Deontology</div>
    </div> 
    <div class="slider-wrapper">
    <div class="slider" id="slider2"><div class="slider-description">${theoriesList[1]}%</div></div>
    <div class="slider-label">Virtue</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider3"><div class="slider-description">${theoriesList[2]}%</div></div>
    <div class="slider-label">Structural</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider4"><div class="slider-description">${theoriesList[3]}%</div></div>
    <div class="slider-label">Care</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider5"><div class="slider-description">${theoriesList[4]}%</div></div>
    <div class="slider-label">Utilitarianism</div>
    </div>
    <div class="slider-wrapper">
    <div class="slider" id="slider5"><div class="slider-description">${theoriesList[5]}%</div></div>
    <div class="slider-label">Information</div>
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
