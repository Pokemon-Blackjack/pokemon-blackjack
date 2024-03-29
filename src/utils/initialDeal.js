/**
 * 
 * @param {array} currentDeck
 * @param {function} setPlayerHand
 * @param {function} setDealerHand
 * @param {function} setCurrentDeck
 */

const initialDeal = (currentDeck) => {
  // spread currentDeck into new variable
  const deck = [...currentDeck];

  // remove the top 4 cards from the deck
  const cardsDealt = deck.splice(0, 4);

  return {
    player: [cardsDealt[0], cardsDealt[2]],
    dealer: [cardsDealt[1], cardsDealt[3]],
    updatedDeck: deck
  }
}

export default initialDeal