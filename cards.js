var errors = 0;

var cardList = [
    "Seal 1",
    "Seal 2",
    "Seal 3",
    "Seal 4",
    "Seal 5",
    "Seal 6",
    "Seal 7",
    "Seal 8",
    "Seal 9",
    "Seal 10"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

window.onload = function (){
    shuffleCards();
    startGame();
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
            card.src = cardImg +".png";
            card.classList.add ("card");
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
}
