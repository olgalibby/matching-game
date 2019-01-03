/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) -DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) DONE
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) DONE
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) (NEED TO SET TIMER)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deckOfCards = document.querySelector('.deck');
const tiles = document.querySelectorAll('.card');
const timer = document.querySelector('.timer');
const rating = document.querySelector('.stars');
const moveCounter = document.querySelector('.moves');

const dialog = document.getElementById('congratsDialog');

let openCards = [];


let moves;
let matchedPairs;

let seconds;
let minutes;
let time;

const star3 = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
const star2 = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i></li>';
const star1 = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i></li> <li><i class="fa fa-star-o"></i></li>';

let starCount;

const cards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane', 'fa-paper-plane',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}


// Populate page with new deck of cards
function createCard(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

function createDeck() {
  for (const card of cards) {
    deckOfCards.innerHTML += createCard(card);
  }
}

deckOfCards.addEventListener('click', respondToTheClick);

function changeToOpen(target) {
  target.setAttribute('class', 'card open show');
}



function removeClass(cards) {
  for (card of cards) {
    card.setAttribute('class', 'card');
  }
  deckOfCards.addEventListener('click', respondToTheClick);
}

function clearOpenCards() {
  openCards = [];
}

function countMoves() {
  moves++;
  moveCounter.innerHTML = moves;

  if (moves > 12 && moves <= 18){
    starCount = star2;
    rating.innerHTML = starCount;
  }else if (moves > 18){
    starCount = star1
    rating.innerHTML = starCount;
  }
}

// Timer Function
function countTime() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
  }

  if (seconds < 10) {
    seconds = ('0' + seconds).slice(-2);
  }

  timer.innerHTML = `${minutes}:${seconds}`;
  timerDelay();
}

function timerDelay() {
  time = setTimeout(countTime, 1000);
}


//Define behavior for pairs of cards:
// * if cards match - call 'addMatchClass' function
// * if cards don't match - call 'removeClass' function
// * call 'clearOpenCards' to empty openCards array
// * call 'countMoves' to count moves

function matchCards(target) {
  openCards.push(target);

  if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      addMatchedClass([openCards[0], openCards[1]]);
      matchedPairs++;
      countMoves();

      if (matchedPairs === 8){
        congrats();
      }

    } else {
      deckOfCards.removeEventListener('click', respondToTheClick);
      setTimeout(removeClass, 1000, [openCards[0], openCards[1]]);
      countMoves();
    }
    clearOpenCards();

  }

}

function addMatchedClass(cards) {
  for (card of cards) {
    card.setAttribute('class', 'card match');
    card.style.pointerEvents = "none";
  }
}

// Define behaviour of each card in the deck:
function respondToTheClick(evt) {
  const target = evt.target;
  if (target.nodeName.toLowerCase() !== 'li') {
    return;
  }

  changeToOpen(target);
  matchCards(target);
}

// initiate new game
function startNewGame() {
  dialog.style.display = "none";
  shuffle(cards);
  deckOfCards.innerHTML = "";


  rating.innerHTML = star3;

  moves = 0;
  moveCounter.innerHTML = moves;

  clearTimeout(time);
  seconds = 0;
  minutes = 0;
  timer.innerHTML = `${minutes}:0${seconds}`;

  createDeck();
  countTime();

  matchedPairs = 0;
}
function congrats(){
  dialog.style.display = "block";
  clearTimeout(time);

  document.querySelector('.finalMoves').innerHTML = moves;

  document.querySelector('.finalMinutes').innerHTML = minutes;
  document.querySelector('.finalSeconds').innerHTML = seconds;

  document.querySelector('.finalRating').innerHTML = starCount;

}
window.onload = startNewGame();
