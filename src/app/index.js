/**
 * Created by gedionz on 8/31/17.
 */

window.onload = function() {
  const players = [];
  let facedUpCardsCount = 0;
  let activePlayersCount = 0;
  let playersStillInBattle = [];
  let cardsStillOnTable = [];
  let isThereWar = false;
  let deck = Deck.makeDeck(
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    ['Clubs', 'Diamonds', 'Hearts', 'Spades']
  );
  deck = Deck.shuffleDeck(deck);

  const addPlayerButton = document.getElementById('addPlayer');
  const playerNameInput = document.getElementById('newPlayerName');
  const playersListDiv = document.getElementById('playersList');
  const playButton = document.getElementById('play');
  const nextButton = document.getElementById('next');
  const cardTableDiv = document.getElementById('cardTable');

  /**
   * Creates a div that will be appended to playerList div
   * @param player
   * @returns {Element}
   */
  const createPlayerDiv = (player) => {
    const name = player.name;
    const playerDiv = document.createElement('div');
    const playerNameDiv = document.createElement('div');
    const playerStats = document.createElement('div');
    const playerNameContent = document.createTextNode(name);

    playerDiv.setAttribute('id', `player_${name}`);
    playerDiv.setAttribute('class', 'playerNameBox');
    playerStats.setAttribute('class', 'playerStats');
    playerDiv.setAttribute('class', 'playerBox');
    playerNameDiv.appendChild(playerNameContent);
    playerDiv.appendChild(playerNameDiv);
    playerDiv.appendChild(playerStats);

    return playerDiv;
  };

  /**
   * Creates a card box of a player on the table
   * @param player
   * @returns {Element}
   */
  const createCardBoxDiv = (player) => {
    const cardBoxDiv = document.createElement('div');
    const playerNameDiv = document.createElement('div');
    const playerNameContent = document.createTextNode(player.name);
    const cardDiv = document.createElement('div');

    cardBoxDiv.setAttribute('id', `card_${player.name}`);
    cardBoxDiv.setAttribute('class', 'cardBox');
    cardDiv.setAttribute('class', 'cardDiv');
    cardDiv.setAttribute('data-faceEnum', 'down')
    cardDiv.innerHTML = 'Click me!';
    cardDiv.onclick = handleCardDivClick;
    playerNameDiv.appendChild(playerNameContent);
    cardBoxDiv.appendChild(playerNameDiv);
    cardBoxDiv.appendChild(cardDiv);
    return cardBoxDiv;
  };

  /**
   * Handle when a user clicks a card (the same us turning the face up)
   * @param event
   */
  const handleCardDivClick = (event) => {
    console.log(numberOfCardsInPlay);
    const cardDiv = event.target;
    const cardBoxDiv = cardDiv.parentNode;
    const playerName = cardBoxDiv.id.slice(5);
    const player = players.find(singlePlayer => playerName.toLowerCase() === singlePlayer.name.toLowerCase());
    if (player) {
      const faceEnum = cardDiv.getAttribute('data-faceEnum');
      console.log(player.getNumberOfCards());
      if (player.getNumberOfCards() === 0) {
        cardDiv.innerHTML = 'Lost the game!';
      } else if(player.getNumberOfCards() === numberOfCardsInPlay) {
        cardDiv.innerHTML = 'WINNER!';
        cardDiv.setAttribute('data-faceEnum', 'up');
        facedUpCardsCount += 1;
      } else if (faceEnum.toLowerCase() === 'down') {
        const cardOnTop = player.facedDownCards[player.facedDownCards.length - 1];
        cardDiv.innerHTML = `${cardOnTop.rank} ${cardOnTop.suit}`;
        cardDiv.setAttribute('data-faceEnum', 'up');
        facedUpCardsCount += 1;
      }
    }
    if (facedUpCardsCount === activePlayersCount) {
      nextButton.classList.remove('btn-primary');
      nextButton.classList.add('btn-primary');
      nextButton.disabled = false;
    }
  };

  /**
   * Handles adding a player to the list. This game allows 2 - 5 players to play
   */
  const handleAddPlayer = () => {
    const playerName = playerNameInput.value;
    if (playerName.length > 0) {
      const nameFound = players.find(player => player.name.toLowerCase() === playerName.toLowerCase());
      if (!nameFound) {
        const newPlayer = new Player(playerName);
        playersListDiv.appendChild(createPlayerDiv(newPlayer));
        playerNameInput.value = '';
        players.push(newPlayer);
      }
      if (players.length > 1 && players.length < 5) {
        playButton.classList.remove('btn-secondary');
        playButton.classList.add('btn-primary');
        playButton.disabled = false;
      }
      else if (players.length >= 5) {
        addPlayerButton.classList.remove('btn-primary');
        addPlayerButton.classList.add('btn-secondary');
        addPlayerButton.disabled = true;
        playerNameInput.disabled = true;
      }
    }
  };

  /**
   * Handle the 'Play' button click. This marks the start of the game
   */
  const handlePlayGame = () => {
    addPlayerButton.classList.remove('btn-primary');
    addPlayerButton.classList.add('btn-secondary');
    addPlayerButton.disabled = true;
    playerNameInput.disabled = true;

    dealCards(deck, players);
    players.forEach((player) => {
      const cardBoxDiv = createCardBoxDiv(player);
      cardTableDiv.appendChild(cardBoxDiv);
    });
    activePlayersCount = players.length;

    playButton.classList.remove('btn-primary');
    playButton.classList.add('btn-secondary');
    playButton.disabled = true;

    const allPlayerBoxes = document.getElementsByClassName('playerBox');
    for (let i = 0; i < allPlayerBoxes.length; i += 1) {
      const playerBox = allPlayerBoxes[i];
      const playerStatsDiv = playerBox.lastElementChild;
      const playerName = playerBox.id.slice(7);
      const playerFound = players.find((player) => player.name.toLowerCase() === playerName.toLowerCase());
      if (playerFound) {
        playerStatsDiv.innerHTML = playerFound.getNumberOfCards() > 0 ? `${playerFound.getNumberOfCards()} cards` : 'Lost the game!';
      }
    }
  };

  /**
   * Handle 'Next' button click and determine who won this battle
   */
  const handleBattle = () => {
    let battleResult;
    if (isThereWar) {
      battleResult = battle(playersStillInBattle, cardsStillOnTable);
    } else {
      battleResult = battle(players, []);
    }
    if (battleResult.thereIsWar) {
      isThereWar = battleResult.thereIsWar;
      playersStillInBattle = battleResult.playersInBattle;
      cardsStillOnTable = battleResult.cardsOnTable;
    } else {
      isThereWar = false;
      playersStillInBattle = [];
      cardsStillOnTable = [];
    }
    activePlayersCount = 0;
    players.forEach((player) => {
      if (player.getNumberOfCards() !== 0) {
        activePlayersCount += 1;
      }
    });
    const allCardDivs = document.getElementsByClassName('cardDiv');
    for (let i = 0; i < allCardDivs.length; i += 1) {
      const cardDiv = allCardDivs[i];
      cardDiv.setAttribute('data-faceEnum', 'down');
      cardDiv.innerHTML = 'Click me!';
    }
    facedUpCardsCount = 0;
    nextButton.classList.remove('btn-primary');
    nextButton.classList.add('btn-secondary');
    nextButton.disabled = true;

    const allPlayerBoxes = document.getElementsByClassName('playerBox');
    for (let i = 0; i < allPlayerBoxes.length; i += 1) {
      const playerBox = allPlayerBoxes[i];
      const playerStatsDiv = playerBox.lastElementChild;
      const playerName = playerBox.id.slice(7);
      const playerFound = players.find((player) => player.name.toLowerCase() === playerName.toLowerCase());
      if (playerFound) {
        playerStatsDiv.innerHTML = playerFound.getNumberOfCards() > 0 ? `${playerFound.getNumberOfCards()} cards` : 'Lost the game!';
      }
    }
  };

  addPlayerButton.onclick = handleAddPlayer;
  playButton.onclick = handlePlayGame;
  nextButton.onclick = handleBattle;
};