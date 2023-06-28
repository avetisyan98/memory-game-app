import React, { useState, FC } from "react";
import "./style.scss";
import Card from "../Cards/Card";
import { cardDetails } from "../Cards/cards";

interface IProps {
  CardDetails: {
    id: number;
    type: string;
    image: any;
  };
}
function shuffleCards(cards: typeof cardDetails) {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }
  return cards;
}
function checkIsFlipped(id: any) {
  let a = true
  a = !a
  return a
} 
const Game = () => {
  const [cards, setCards] = useState(() =>
    shuffleCards(cardDetails.concat(cardDetails))
  );
  console.log(cards, "cards");

  const [openCards, setOpenCards] = useState([]);
  const [state, setState] = useState(false);
  
  return (
    <div className="block">
      <h1>Play the Flip card game</h1>
      <p>
        Select two cards with the same content consecutively to make them vanish
      </p>
      <div className="gameContainer">
        {cards?.map((card, index) => (
          <Card
            cardImg={card.image}
            key={index}
            isFlipped={state}
            onClick={() => setState(!state)}
            />
        ))} 
      </div>
    </div>
  );
};

export default Game;
