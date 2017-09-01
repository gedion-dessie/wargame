/**
 * Created by gedionz on 8/31/17.
 */

let numberOfCardsInPlay = 0;

/**
 * Evenly deal cards to players
 * @param deck
 * @param players
 */
const dealCards = (deck, players) => {
  numberOfCardsInPlay = deck.length;
  while (deck.length >= players.length) {
    players.forEach((player) => {
      player.facedDownCards.unshift(deck.pop());
    });
  }
  numberOfCardsInPlay -= deck.length;
};

/**
 * Battle between all (two or more) players. Player with higher card will win.
 * If all of the participating players have equal value cards, then there will be a war!
 * @param players
 * @param cardsOnTableParam
 */
const battle = (players, cardsOnTable) => {
  let playersInBattle = [];
  let playerWithHigherCard;
  let thereIsWar = false;
  players.forEach((player) => {
    if (player.getNumberOfCards() !== 0) {
      const cardOnTop = player.facedDownCards.pop();
      if (!playerWithHigherCard) {
        player.facedUpCards.push(cardOnTop);
        playerWithHigherCard = player;
      } else {
        if (cardOnTop.getValue() > playerWithHigherCard.facedUpCards[0].getValue()) {
          cardsOnTable.push(playerWithHigherCard.facedUpCards.pop());
          if (playersInBattle.length > 0) {
            playersInBattle.forEach((loser) => {
              cardsOnTable.push(loser.facedUpCards.pop());
            });
            playersInBattle = [];
          }
          player.facedUpCards.push(cardOnTop);
          playerWithHigherCard = player;
        } else if (cardOnTop.getValue() === playerWithHigherCard.facedUpCards[0].getValue()) {
          playersInBattle.push(player);
        } else {
          cardsOnTable.push(cardOnTop);
        }
      }
    }
  });
  if (playerWithHigherCard && playersInBattle.length === 0) {
    cardsOnTable.forEach((card) => {
      playerWithHigherCard.facedDownCards.unshift(card);
    });
    const winnerCard = playerWithHigherCard.facedUpCards.pop();
    playerWithHigherCard.facedDownCards.unshift(winnerCard);
    cardsOnTable = [];
    thereIsWar = false;
  } else if(playerWithHigherCard) {
    playersInBattle.push(playerWithHigherCard);
    playersInBattle.forEach((player) => {
      cardsOnTable.push(player.facedUpCards.pop());
    });
    // There is a war!
    thereIsWar = true;
  }
  return {
    playersInBattle,
    cardsOnTable,
    thereIsWar
  };
};
