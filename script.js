const restart = document.getElementById('restart');
const timer = document.getElementById('timer');
const options = document.getElementById('options');
const winMessage = document.getElementById('winMessage');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, count, startTime, stopWatch;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    count++;
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function startGame() {
    while(board.firstChild) {
        board.removeChild(board.lastChild);
    }
    
    winMessage.innerHTML = '';
    
    
    clearInterval(stopWatch);
    cardShuffle(cardNames);
    boardRender(cardNames);
    
    timer.innerText = 0;
    count = 0;

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
    board.addEventListener('click', startTimer);
    restart.addEventListener('click', startGame);
}


function startTimer() {
    board.removeEventListener('click', startTimer);
    startTime = new Date();
    stopWatch = setInterval(()=> {
        timer.innerText = getTimerSeconds();
        if(count === 9) {
            clearInterval(stopWatch);
            winMessage.innerHTML = 'You win!';
        }
    });
    
}

function getTimerSeconds() {
    let seconds = Math.floor((new Date() - startTime) / 1000);  
    return seconds;
}

startGame();



