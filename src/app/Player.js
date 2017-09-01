/**
 * Created by gedionz on 8/31/17.
 */

/**
 * A player object
 * @param name
 * @returns {{name: *, facedDownCards: Array, facedUpCards: Array, getNumberOfCards: (function())}}
 * @constructor
 */
const Player = function(name) {
  const facedDownCards = [];
  const facedUpCards = [];
  const numberOfCards = () => {
    return facedDownCards.length + facedUpCards.length;
  };
  return {
    name,
    facedDownCards,
    facedUpCards,
    getNumberOfCards: numberOfCards
  }
};