'use strict';
let currentPoints = 0
let currentPlayer = 0
let score = [ 0, 0];
queryText('#score--0', score[0]);
queryText('#score--1', score[1]);
document.querySelector('.dice').classList.add('hidden');

function btnPress(selector, func) {
  document.querySelector(selector).addEventListener('click', func);  
}

function queryText (selector, text) {
    document.querySelector(selector).textContent = text
}


const diceRoll  = function () {
    document.querySelector('.dice').classList.remove('hidden');
    const diceSide = Math.floor(Math.random()*6) + 1;
    document.querySelector('.dice').setAttribute('src', `./images/dice-${diceSide}.png`);
    if (diceSide !== 1) {
        if (currentPlayer === 0) {
        currentPoints += diceSide;
        queryText('#current--0', currentPoints);
        } else {
        currentPoints += diceSide;
        queryText('#current--1', currentPoints)
        }
        
    } else {
       document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
       queryText(`#current--${currentPlayer}`, 0);
       if (currentPlayer === 0) {
         currentPoints = 0;
         currentPlayer = 1;
       } else {
        currentPlayer = 0;
        currentPoints= 0; 
       };
       
       document.querySelector(`.player--${currentPlayer}`).classList.add('player--active');
    }
    
}

const holdScore = function () {
    if (currentPlayer === 0) {
        score[0] +=  currentPoints 
        queryText('#score--0', score[0]);
        currentPoints = 0 ;
        queryText('#current--0', 0);
    } else {
        score[1] +=  currentPoints 
        queryText('#score--1', score[1]);
        currentPoints = 0 ;
        queryText('#current--1', 0);
    
    }

    if (score[currentPlayer] >= 100) {
       queryText(`#name--${currentPlayer}`, `Player ${currentPlayer + 1 } Won 🥳`);
       
    } else {
       queryText(`#name--${currentPlayer}`, `Player ${currentPlayer + 1}`);
       document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
       queryText(`#current--${currentPlayer}`, 0);
        if (currentPlayer === 0) {
        currentPoints = 0;
        currentPlayer = 1;
       } else {
        currentPlayer = 0;
        currentPoints = 0; 
       };
       
       document.querySelector(`.player--${currentPlayer}`).classList.add('player--active');  
       
       }
    }

    const newGame = function () {
        currentPoints = 0;
        currentPlayer = 0;
        score = [ 0, 0];
        queryText('#score--0', score[0]);
        queryText('#current--0', 0);
        queryText('#score--1', score[1]);
        queryText('#current--1', 0);
        document.querySelector(`.player--${currentPlayer}`).classList.add('player--active');
        document.querySelector(`.player--${currentPlayer+1}`).classList.remove('player--active');
    
    }

btnPress('.btn--roll', diceRoll);
btnPress('.btn--hold', holdScore);
btnPress('.btn--new', newGame);

