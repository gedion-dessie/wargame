/**
 * Created by gedionz on 8/31/17.
 */

describe('Deck functions Test', () => {

  const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'J', 'Q', 'K', 'A'];
  const suits = ['Clubs', 'Hearts', 'Diamonds', 'Hearts'];

  it('Deck object should have two functions', () => {
    expect(Deck.shuffleDeck).not.toBe(undefined);
    expect(Deck.makeDeck).not.toBe(undefined);
  });
  it('Deck.makeDeck should return rank * suits number of cards', () => {
    const deck = Deck.makeDeck(ranks, suits);
    expect(deck.length).toEqual(ranks.length * suits.length);
  });
});