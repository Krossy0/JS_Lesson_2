let animals = [
    "🦊", "🐼", "🦁", "🐸", "🐵",
    "🐧", "🐨", "🐯", "🐰", "🦋"
];

let gameCards = [];
let moveCount = 0;
let foundPairs = 0;
let isLocked = false;
let firstSelected = null;
let secondSelected = null;


function randomNumber(max) {
    return Math.floor(Math.random() * max);
}


function startGame() {

    const gameTable = document.getElementById("game-cards");

    gameCards = [...animals, ...animals];

    for (let i = 0; i < gameCards.length; i++) {

        let randomCard = randomNumber(gameCards.length);

        let temp = gameCards[i];

        gameCards[i] = gameCards[randomCard];

        gameCards[randomCard] = temp;
    }

    let cardContent = "";

    for (let i = 0; i < gameCards.length; i++) {

        cardContent += `
            <div class="card hidden-card"
            id="${i}" onclick="openCard(${i})">
            </div>
        `;
    }

    gameTable.innerHTML = cardContent;

    firstSelected = null;
    secondSelected = null;

    moveCount = 0;
    foundPairs = 0;

    isLocked = false;

    document.getElementById("moves").innerHTML = moveCount;

    document.getElementById("pairs").innerHTML = foundPairs;

}


function openCard(id) {

    if (isLocked) {
        return;
    }

    let element = document.getElementById(id);

    if (element.classList.contains("open") ||
        element.classList.contains("matched")) {

        return;
    }

    element.innerHTML = gameCards[id];

    element.classList.remove("hidden-card");

    element.classList.add("open");


    if (firstSelected == null) {

        firstSelected = id;

    }

    else {

        secondSelected = id;

        moveCount++;

        document.getElementById("moves").innerHTML = moveCount;


        if (gameCards[firstSelected] == gameCards[secondSelected]) {

            let first = document.getElementById(firstSelected);

            let second = document.getElementById(secondSelected);

            first.classList.add("matched");

            second.classList.add("matched");

            foundPairs++;

            document.getElementById("pairs").innerHTML = foundPairs;

            firstSelected = null;
            secondSelected = null;

        }

        else {

            isLocked = true;

            setTimeout(() => {

                let first = document.getElementById(firstSelected);

                let second = document.getElementById(secondSelected);

                first.innerHTML = "";
                second.innerHTML = "";

                first.classList.remove("open");
                second.classList.remove("open");

                first.classList.add("hidden-card");
                second.classList.add("hidden-card");

                firstSelected = null;
                secondSelected = null;

                isLocked = false;

            }, 800);

        }
    }
}


startGame();
