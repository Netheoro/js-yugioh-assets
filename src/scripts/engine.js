const state = {
    player: {
        score: 0,
        hand: document.getElementById("player_card"),
        field: document.getElementById("player-field-card"),
    },
    computer: {
        score: 0,
        hand: document.getElementById("computer_card"),
        field: document.getElementById("computer-field-card"),
    },
    ui: {
        scoreBox: document.getElementById("score_points"),
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
        button: document.getElementById("next"),
    }
};

const cardData = [
    { id: 0, name: "Blue-Eyes White Dragon", type: "Paper", img: "./src/assets/icons/dragon.png", WinOf: [1], LoserOf: [2] },
    { id: 1, name: "Dark Magician", type: "Rock", img: "./src/assets/icons/magician.png", WinOf: [2], LoserOf: [0] },
    { id: 2, name: "Exodia the Forbidden One", type: "Scissors", img: "./src/assets/icons/exodia.png", WinOf: [0], LoserOf: [1] }
];

// Sorteia um ID de carta
function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

// Cria uma carta na mão
function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-card-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === state.player.hand.id) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(idCard);
        });
        cardImage.addEventListener("click", () => {
            setCardsField(idCard);
        });
    }
    return cardImage;
}

// Quando jogador escolhe carta
function setCardsField(cardId) {
    removeAllCardImages();

    let computerCardId = getRandomCardId();

    state.player.field.style.display = "block";
    state.computer.field.style.display = "block";

    state.player.field.src = cardData[cardId].img;
    state.computer.field.src = cardData[computerCardId].img;

    let duelResults = checkDuelResults(cardId, computerCardId);

    updateScore();
    drawButton(duelResults);
}

// Verifica resultado do duelo
function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Vitória";
        playerAudio("win");
        state.player.score++;
    } else if (playerCard.LoserOf.includes(computerCardId)) {
        duelResults = "Derrota";
        playerAudio("lose");
        state.computer.score++;
    }
    return duelResults;
}

// Atualiza score
function updateScore() {
    state.ui.scoreBox.innerText = `Win: ${state.player.score} | Lose: ${state.computer.score}`;
}

// Mostra botão "Next"
function drawButton(duelResults) {
    state.ui.button.innerText = duelResults;
    state.ui.button.style.display = "block";

    state.ui.button.addEventListener("click", () => {
        initGame();
    }, { once: true });
}

// Remove cartas das mãos
function removeAllCardImages() {
    state.computer.hand.innerHTML = "";
    state.player.hand.innerHTML = "";
}

// Mostra info da carta ao passar o mouse
function drawSelectCard(index) {
    state.ui.avatar.src = cardData[index].img;
    state.ui.name.innerText = cardData[index].name;
    state.ui.type.innerText = "Attribute: " + cardData[index].type;
}

// Desenha as cartas
function drawCards(cardNumber, fieldSide) {
    for (let i = 0; i < cardNumber; i++) {
        const randomIdCard = getRandomCardId();
        const cardImage = createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

// Áudio
function playerAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
    
    
}

        const bgm = document.getElementById("bgm")

        bgm.play()


// Reseta interface
function resetGameUI() {
    state.ui.avatar.src = "";
    state.ui.name.innerText = "Select a Card";
    state.ui.type.innerText = "";
    state.player.field.style.display = "none";
    state.computer.field.style.display = "none";
    state.ui.button.style.display = "none";
}

// Inicia jogo
function initGame() {
    resetGameUI();
    drawCards(5, state.player.hand.id);
    drawCards(5, state.computer.hand.id);
}


initGame();
