/**
 * Created by gedionz on 8/31/17.
 */

describe('Game Test', () => {
  let players = [];
  let deck = [];
  beforeEach(() => {
    players = [];
    deck = [];

    const player1 = new Player('Gedion');
    const player2 = new Player('Bisrat');
    players.push(player1);
    players.push(player2);

    const fiveHearts = new Card(5, 'Hearts');
    const sixClubs = new Card(6, 'Clubs');
    const twoSpades = new Card(2, 'Spades');
    const fiveDiamonds = new Card(5, 'Diamonds');

    deck.push(sixClubs);
    deck.push(fiveHearts);
    deck.push(twoSpades);
    deck.push(fiveDiamonds);
  });

  it('Should deal cards evenly', () => {
    dealCards(deck, players);
    const firstPlayerCards = players[0].facedDownCards.length;
    players.forEach((player) => {
      expect(player.facedDownCards.length).toEqual(firstPlayerCards);
    });
  });

  it('Should have at least two cards on table', () => {
    dealCards(deck, players);
    const firstPlayerCards = players[0].facedDownCards.length;
    battle(players, []);
    const firstPlayerCardsAfterBattle = players[0].facedDownCards.length;

    expect(firstPlayerCards).not.toEqual(firstPlayerCardsAfterBattle);
  });

  it('Player with higher card should win the battle', () => {
    players[0].facedDownCards.push(deck[0]);
    players[1].facedDownCards.push(deck[1]);
    battle(players, []);
    expect(players[0].getNumberOfCards()).toBe(2);
    expect(players[1].getNumberOfCards()).toBe(0);
  });

  it('Should allow more than two players to battle', () => {
    const newPlayer = new Player('Abel');
    players.push(newPlayer);
    players[0].facedDownCards.push(deck[0]);
    players[1].facedDownCards.push(deck[1]);
    players[2].facedDownCards.push(deck[2]);
    battle(players, []);
    expect(players[0].getNumberOfCards()).toBe(3);
    expect(players[1].getNumberOfCards()).toBe(0);
    expect(players[2].getNumberOfCards()).toBe(0);
  });

  it('Player2 should win the war!', () => {
    const card1 = new Card('Q', 'Hearts');
    const card2 = new Card('Q', 'Spades');
    const card3 = new Card(7, 'Spades');
    const card4 = new Card(7, 'Clubs');
    const card5 = new Card(2, 'Diamonds');
    const card6 = new Card(2, 'Hearts');
    const card7 = new Card(6, 'Clubs');
    const card8 = new Card(6, 'Diamonds');
    const card9 = new Card(7, 'Diamonds');
    const card10 = new Card('A', 'Spades');

    deck = [];
    deck.unshift(card1);
    deck.unshift(card2);
    deck.unshift(card3);
    deck.unshift(card4);
    deck.unshift(card5);
    deck.unshift(card6);
    deck.unshift(card7);
    deck.unshift(card8);
    deck.unshift(card9);
    deck.unshift(card10);

    numberOfCardsInPlay = deck.length;
    dealCards(deck, players);
    let isThereWar = false;
    let battleResponse = battle(players, []);
    if (battleResponse.thereIsWar) {
      isThereWar = battleResponse.thereIsWar;
      while (isThereWar) {
        battleResponse = battle(battleResponse.playersInBattle, battleResponse.cardsOnTable);
        isThereWar = battleResponse.thereIsWar;
      }
    }
    players.forEach((player) => {
      const numberOfCards = player.getNumberOfCards();
      expect(numberOfCards === 0 || numberOfCards === numberOfCardsInPlay).toBeTruthy();
    });
    expect(players[1].getNumberOfCards()).toBe(numberOfCardsInPlay);
  });
});