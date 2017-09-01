/**
 * Created by gedionz on 8/31/17.
 */

/**
 *
 * @type {{makeDeck, shuffleDeck}}
 */
const Deck = (function() {
  /**
   * create (numberOfRanks * numberOfSuits) of cards and populate the deck
   * @param ranks
   * @param suits
   * @returns {Array}
   */
  const makeDeck = (ranks, suits) => {
    const deck = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const newCard = new Card(rank, suit);
        deck.push(newCard);
      })
    });
    return deck;
  };

  /**
   * Shuffle a deck
   * @param deck
   */
  const shuffleDeck = (deck) => deck.sort(() => Math.random() - 0.5);

  return {
    makeDeck,
    shuffleDeck
  }
})();