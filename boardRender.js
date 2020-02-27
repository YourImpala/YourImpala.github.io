const board = document.getElementById("board");

let cardNames = [
    'colosus',
    'marine',
    'mutalisk',
    'battlecruiser',
    'tempest',
    'ultralisk',
    'artanis',
    'ghost',
    'kerrigan',
    'phoenix',
    'stalker'
];

function cardShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];        
    }
    return array;
}

function randomCardNumber() {
  return Math.floor(Math.random() * 12);
}


function boardRender(array) {
    // i = mumber of cardNames
    for (let i = 0; i < 9; i++) {
        const card = `
            <div class="memory-card" data-name="${array[i]}" style="order: ${randomCardNumber()}">
                <img class="front-face" src="img/cards/${array[i]}.png" alt="${array[i]}" />
                <img class="back-face" src="img/cards/back.png" alt="back" />
            </div>
            <div class="memory-card" data-name="${array[i]}" style="order: ${randomCardNumber()}">
                <img class="front-face" src="img/cards/${array[i]}.png" alt="${array[i]}" />
                <img class="back-face" src="img/cards/back.png" alt="back" />
            </div>   
        `;
        board.insertAdjacentHTML("beforeend", card);
    }
}


