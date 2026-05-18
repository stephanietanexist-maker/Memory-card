//timer stuff
var time = 0;
var timer = 0;
var timerstarted = false;
var matchedPairs = 0;

var errors = 0;

var cardList = [
    "seal1.jpg",
    "seal2.jpg",
    "seal3.png",
    "seal4.png",
    "seal5.jpg",
    "seal6.png",
    "seal7.png",
    "seal8.jpg",
    "seal9.jpg",
    "seal10.png"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected; 

//main commands
window.onload = function (){
    shuffleCards();
    startGame();
    startTimer();
}

function shuffleCards(){
    cardSet = cardList.concat(cardList); //Two of each card
    console.log(cardList);
    //shuffle
    for (let i = 0; i < cardSet.length; i++){
        let j = Math.floor(Math.random() * cardSet.length);
        //swap
        let temp = cardSet [i];
        cardSet[i] = cardSet[j]
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    //arranging the board which is a 4x5 board
    for (let r = 0; r< rows; r++){
        let row = [];
        for (let c = 0; c < columns; c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString()+ "-" +c.toString();
            card.src = "Images/"+ cardImg;
            card.classList.add ("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board); 
    setTimeout(hideCards, 2000);
}

function hideCards(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let card = document.getElementById(r.toString() + "-" +c.toString());
            card.src = "Images/background.jpg";
        }
    }
}

function selectCard() {

    if (this.src.includes("background")) {

        if (!card1Selected) {

            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "Images/" + board[r][c];
        }

        else if (!card2Selected && this != card1Selected) {

            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "Images/" + board[r][c];

            setTimeout(update, 1000);
        }
    }
}

function update(){
    //if the cards aren't the same
    if (card1Selected.src == card2Selected.src){
        matchedPairs +=1;
        checkWin();
    }
    
    else if (card1Selected.src != card2Selected.src){
        card1Selected.src = "Images/background.jpg";
        card2Selected.src = "Images/background.jpg";
        errors +=1
        document.getElementById ("errors").innerText = errors;

    }
    card1Selected = null;
    card2Selected = null;
}

function startTimer (){
    timer = setInterval(function(){
        time +=1
        document.getElementById("time").innerText = time;
    }, 1000 );
}

function checkWin(){
    if (matchedPairs == 10){
        clearInterval(timer);
    }
}
