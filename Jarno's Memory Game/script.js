
// all used cards
const cardsArray = [{
    'name': 'Queen of Hearts',
    'img': 'img/QH.png',
  },
  {
    'name': 'Jack of Spades',
    'img': 'img/JS.png',
  },
  {
    'name': '2 of Clubs',
    'img': 'img/2C.png',
  },
  {
    'name': 'Ace of Spades',
    'img': 'img/AS.png',
  },
  {
    'name': 'King of Diamonds',
    'img': 'img/KD.png',
  },
  {
    'name': '4 of Spades',
    'img': 'img/4S.png',
  },
  {
    'name': '7 of Clubs',
    'img': 'img/7C.png',
  },
  {
    'name': '2 of Hearts',
    'img': 'img/2H.png',
  },
  {
    'name': 'Ace of Diamonds',
    'img': 'img/AD.png',
  },
  {
    'name': '8 of Spades',
    'img': 'img/8S.png',
  },
  {
    'name': '9 of Diamonds',
    'img': 'img/9D.png',
  },
  {
    'name': 'Queen of Spades',
    'img': 'img/QS.png',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());// randomizer

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1000; // view for 1 second

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});