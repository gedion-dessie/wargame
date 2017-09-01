/**
 * Created by gedionz on 8/31/17.
 */

describe('Card Test', () => {
  it('Should create a valid card object', () => {
    const fiveOfHearts = new Card(5, 'Hearts');
    expect(fiveOfHearts).not.toBe(null);
  });

  it('Should convert rank to value', () => {
    const newCard = new Card('Q', 'Diamonds');
    expect(newCard.getValue()).toBe(12);
  });

  it('Valid rank should not throw error', () => {
    const newCard = new Card(2, 'Diamonds');
    expect(newCard.getValue).not.toThrowError();
  });

  it('Should throw error for invalid rank', () => {
    const newCard = new Card(25, 'Spades');
    expect(newCard.getValue).toThrowError();
  });

  it('Should hide the value of rank', () => {
    const newCard = new Card(7, 'Diamonds');
    expect(newCard.value).toBe(undefined);
  });

});