/**
 * Created by gedionz on 8/31/17.
 */

describe('Player Test', () => {
  it('Should have facedUpCards property', () => {
    const player = new Player('nwea');
    expect(player.facedUpCards).not.toBeUndefined();
  });
  it('Should have facedDownCards property', () => {
    const player = new Player('nwea');
    expect(player.facedDownCards).not.toBeUndefined();
  });
});