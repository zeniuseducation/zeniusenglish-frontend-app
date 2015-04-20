var moduleContent = doc.getElementById('module-content');
var cheatSheetContent = doc.getElementById('cheatSheetText');
var result = [];
var i = 0;

// Create functionality for next button in module-quiz content
function nextButtonFunction() {
  if (i < moduleQuiz.questions.length) {
    moduleContent.innerHTML = '<span id="question-number"></span>';
    generateQuestion(i);
  } else {
    generateScoreModal();
    doc.getElementById('cheatSheet').style.display = 'none';
  }
}

// Create functionality after option in clicked
function checkAnswer() {
  if (this.innerHTML === moduleQuiz.questions[i - 1].answer) {
    this.style.background = 'green';
    result.push(true);
  } else {
    this.style.background = 'red';
    result.push(false);
  }

  // Create next question button
  var nextButton = doc.createElement('span');
  var node = doc.createTextNode('next');
  var id = doc.createAttribute('id');
  var style = doc.createAttribute('style');
  id.value = 'nextQuestion';
  nextButton.setAttributeNode(id);
  nextButton.onclick = nextButtonFunction;
  nextButton.appendChild(node);

  moduleContent.appendChild(nextButton);
  disableOptions();
}

// Disable all options button to have no onclick properties
function disableOptions () {
  var options = doc.getElementById('options').children;
  for (var i = 0; i < options.length; i++) {
    options[i].onclick = function() {};
  }
}

// Create modal showing quiz score and CTA after taking quiz
function generateScoreModal() {
  moduleContent.innerHTML = '';
  var count = 0;
  for (var i = 0; i < result.length; i++) {
    count += result[i] === true? 1: 0;
  }
  if (count < moduleQuiz.threshold) {
    moduleContent.innerHTML = 'Test gagal. Score kamu hanya ' + count / result.length;
  } else {
    moduleContent.innerHTML = 'Kamu berhasil! Score kamu ' + count / result.length;
  }
}

// Show certain number of question
function generateQuestion(counter) {
  var question = moduleQuiz.questions[counter];
  cheatSheetContent.innerHTML = moduleQuiz.questions[counter].cheat;
  i += 1;
  var options = doc.createElement('section');
  var id = doc.createAttribute('id');
  id.value = 'options';
  options.setAttributeNode(id);
  var choice;
  var node;
  doc.getElementById('question-number').innerHTML = '#' + question.ordering;
  moduleContent.innerHTML += question.text;
  for (var x = 0; x < question.choice.length; x++) {
    choice = doc.createElement('div');
    node = doc.createTextNode(question.choice[x]);
    choice.appendChild(node);
    // Checking answer onclick
    choice.onclick = checkAnswer;
    options.appendChild(choice);
  }
  moduleContent.appendChild(options);
}

title.innerHTML = moduleQuiz.title;
generateQuestion(i);
