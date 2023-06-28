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

const Game = () => {
  const [cards, setCards] = useState(() =>
    shuffleCards(cardDetails.concat(cardDetails))
  );

  const [openCards, setOpenCards] = useState<number[]>([]);
  const checkIsFliped = (index:number) => {
    return openCards.includes(index)
  }
  const [state, setState] = useState(false);
  const handleClickOpen = (index: number) => {
    if(openCards.length === 1) {
      setOpenCards((prev) => 
      [...prev, index]);
    } else {
      setOpenCards([index]);
    }
  };
  
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
            isFlipped={checkIsFliped(index)}
            onClick={() => handleClickOpen(index)}
            />
        ))} 
      </div>
    </div>
  );
};

export default Game;
