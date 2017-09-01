/**
 * Created by gedionz on 8/31/17.
 */

/**
 *
 * @param rank
 * @param suit
 * @returns {{rank: *, suit: *, getValue: (function())}}
 * @constructor
 */
const Card = function(rank, suit) {
  let value;
  switch (rank) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    default:
      value = rank;
      break;
    case 'J':
    case 'j':
      value = 11;
      break;
    case 'Q':
    case 'q':
      value = 12;
      break;
    case 'K':
    case 'k':
      value = 13;
      break;
    case 'A':
    case 'a':
      value = 14;
      break;
  }
  const getValue = () => {
    if (value > 1 && value <= 14) {
      return value;
    }
    throw new Error('Card has an invalid rank!');
  };
  return {
    rank,
    suit,
    getValue
  };
};