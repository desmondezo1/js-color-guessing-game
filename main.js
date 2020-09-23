let shape = document.getElementsByClassName("box");
let correct = "";
let selected = false;
let score = 0;
let maxStage = 5;
let currentStage = 0;



//randomly generates and RGB color
function randColorGenerator() {
    let red, green, blue;

    red = Math.floor(Math.random() * 225);
    green = Math.floor(Math.random() * 225);
    blue = Math.floor(Math.random() * 225);
    let color = "rgb(" + red + "," + green + "," + blue + ")";
    return color;
}

//Generates the boxes with different colors and sets a correct color
function genBoxColors() {

    //let shape = document.getElementsByClassName("box");
    for (let i = 0; i < shape.length; i++) {

        shape[i].style.background = randColorGenerator();
        //set box id
        shape[i].id = i;

    }

    let randNum = Math.floor(Math.random() * shape.length);
    correct = shape[randNum].style.background;
    let answerDislay = document.querySelector(".colorcode");
    answerDislay.textContent = correct;
    setCorrectAns(correct);
}

//Fuction runs when box is clicked
function click(selected) {



    //if box hasn't been selected run


    //ERROR IS HERE.... look at the loop.. there is an issue with it, 

    for (let i = 0; i < shape.length; i++) {
        console.log(i);
        shape[i].addEventListener("click", function () {

            if (selected) {
                selected = false;
                currentStage += 1;
                updateScore(currentStage);
                nextStage();
                checkGame();

            } else {
                console.log(i);
                let clicked = shape[i].style.background;
                selected = true;
                checkAnswer(clicked);
                currentStage += 1;
                updateScore(currentStage);
                checkGame();

            }
        });


    }

}


//sets and returns correct answer
function setCorrectAns(correct) {
    console.log(correct);
    return correct;
}

//checks for the correct answer and then runs diplayCorrect or diplayWrong
function checkAnswer(answer) {


    if (correct == answer) {
        //check if its the correct answer the  run correct function
        displayCorrect();
        score += 1;
        checkGame();
    } else {
        //else run the wrong answer function
        displayWrong();
        checkGame();
    }
}

function displayCorrect() {
    //if answer is correct diplay result
    resultDiv = document.getElementById("result");
    resultDiv.textContent = "Correct!";
    changeBoxColorCorrect();
    let container = document.getElementsByClassName("container");
    resultDiv.style.display = "block";
    resultDiv.style.background = "#2e8b57";

}

function displayWrong() {
    resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.textContent = "Wrong!";
    resultDiv.style.background = "rgb(255 86 86)";
    changeBoxColorGrey();
    correct = "";
}

//color changes grey if wrong box selected
function changeBoxColorGrey() {

    for (let i = 0; i < shape.length; i++) {

        if (shape[i].style.background !== correct) {
            shape[i].style.background = "#232323";
        }
        if (shape[i].style.background == correct) {
            shape[i].style.box_shadow = "0px 0px 20px -4px #01570f";
        }


    }
}

function changeBoxColorCorrect() {

    for (let i = 0; i < shape.length; i++) {

        shape[i].style.background = correct;

    }
}


function nextStage() {

    resultDiv = document.getElementById("result");
    resultDiv.style.background = "#232323";
    resultDiv.textContent = "Guess Again";
    correct = "";
    currentStage = currentStage - 1;
    genBoxColors();

};

function resetGame() {

    resultDiv = document.getElementById("result");
    resultDiv.style.background = "#232323";
    resultDiv.style.display = "none";
    resultDiv.textContent = "Guess";
    correct = "";
    score = 0;
    currentStage = 0;
    updateScore(currentStage);

    for (let i = 0; i < shape.length; i++) {
        shape[i].style.display = "block";

    }

    genBoxColors();

};

function updateScore(currentStage) {
    cScore = document.getElementById("cScore");
    maxScore = document.getElementById("maxScore");
    stage = document.getElementById("cStage");
    cScore.textContent = score;
    maxScore.textContent = maxStage;
    stage.textContent = currentStage;

}

function checkGame() {
    if (currentStage == maxStage) {
        //remove boxes display

        for (let i = 0; i < shape.length; i++) {
            shape[i].style.display = "none";

        }
        // diplay Game Over
        let container = document.getElementsByClassName("container");
        container.innerHTML = "<h2>GAME OVER!</h2>"
        // Display score
        // Display Button to restart game

    }
}


updateScore(currentStage);
randColorGenerator();
genBoxColors();
click(selected);

