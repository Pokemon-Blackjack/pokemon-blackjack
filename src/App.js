import './App.css';
import { useEffect, useState } from 'react'
import Title from './components/Title'
import ExperienceBar from './components/ExperienceBar'
import randomizer from './utils/randomizer';
import Sprite from './components/Sprite';
import Dealer from './components/Dealer';
import Hand from './components/Hand';

function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState([]);
  const [currentDeck, setCurrentDeck] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [currentBet, setCurrentBet] = useState(100);
  const [balance, setBalance] = useState(200);

  // array of usable pokemon families
  const availablePokemon = [
    // each sub-array is the evolution line of pokemon
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [29, 30, 31],
    [32, 33, 34],
    [66, 67, 68],
    [74, 75, 76],
    [92, 93, 94],
    [147, 148, 149],
    [152, 153, 154],
    [155, 156, 157],
    [158, 159, 160]
  ];

  // function to compare users score to dealers
  // function to test if users score is less than / equal 21
  
  const dealerPokemon = { 
    name: "mr-mime", 
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"
  };
  
  useEffect(() => {
    // generate random pokemon index from availablePokemon array, make the API call, and set the playerPokemon state
    const getPokemon = async (id) => {
      const pokemonId = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const pokemonObject = await pokemonId.json();
      const chosenPokemon = {
        name: pokemonObject.name,
        sprite: pokemonObject.sprites.front_default
      }
      setPlayerPokemon(chosenPokemon);
    }
    const pokemonFamily = randomizer(availablePokemon);

    getPokemon(pokemonFamily[0]);
  }, [])

  useEffect(() => {
    // generate the 6 decks and set state t
    async function getDeck() {
      // Get deckId first to fetch deck of cards.
      // deckId is also used later for shuffling existing deck when restarting the game
      const deckId = await fetch(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
      )
        .then((res) => res.json())
        .then((data) => data.deck_id);

      // get 312 (52 * 6) cards with deck id
      const deck = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=312`
      )
        .then((res) => res.json())
        .then((data) => {
          const cards = data.cards.map((card) => ({
            image: card.image, // "https://deckofcardsapi.com/static/img/0S.png"
            value: card.value, // "10'"
            suit: card.suit, // "SPADES"
          }));
          return cards;
        });
      setCurrentDeck(deck);
    }

    getDeck();
  }, []);
    
  return (
    <>
    <h1>Check console</h1>
    {/* title will include h1 and deal button to start game
    {/* will only appear when game state is false */}
      <Dealer 
      hand={currentDeck.slice(0, 5)} 
      playerPokemon={playerPokemon}
      dealerPokemon={dealerPokemon}
      leftSprite={true}
      />
    {/* <Hand cards={currentDeck}/> */}
    {/* <Sprite pokemon={playerPokemon} leftSprite={true} />
    <Sprite pokemon={dealerPokemon}  /> */}
      {/* <Title /> */}
      {/* div to hold xp bars */}
      {/* <div>
        <ExperienceBar />
      </div>

      <div className="gameBoard"> */}
        {/* dealer component holds hand component and sprite component */}
        {/* needs hand state */}
        {/* <Dealer />
        <GameMessage /> */}
        {/* player component holds hand component and sprite component */}
        {/* needs hand state */}
        {/* <Player />

        <div className="actions">
          {/* only show deal when game state is false */}
          {/* <button>Deal</button> */}
          {/* only show hit, double, stand, if game state is true */}
          {/* <button>Hit</button> */}
          {/* show double only when player hand is 2 cards*/}
          {/* <button>Double</button>
          <button>Stand</button>
        </div>
      </div> */}
    </>
  );
}

export default App;
