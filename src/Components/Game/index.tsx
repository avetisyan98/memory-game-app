import React, { useState, useEffect } from "react";
import "./style.scss";
import Card from "../Cards/Card";
import { cardDetails } from "../Cards/cards";
import { SuccessModal } from "../SuccessModal";
import { Button } from "@mui/material";
function shuffleCards(cards: typeof cardDetails) {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }
  return cards;
}

export const Game = () => {
  const [cards, setCards] = useState(() =>
    shuffleCards(cardDetails.concat(cardDetails))
  );
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [modalState, setModalState] = useState(false);
  const [move, setMove] = useState(0);

  const storedBestScore = localStorage.getItem("bestScore");
  const initialBestScore = storedBestScore !== null ? parseInt(storedBestScore) : Infinity;
  const [bestScore, setBestScore] = useState<number | null>(initialBestScore);
  
  useEffect(() => {
    if (cards.length === clearedCards.length) {
      setModalState(true);
      if (bestScore !== null && move < bestScore) {
        setBestScore(move);
        localStorage.setItem("bestScore", "" + move);
      }
    }
  }, [clearedCards]);
  

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluate, 500);
    }
  });

  const checkIsFliped = (index: number) => {
    return openCards.includes(index);
  };
  const checkIsInactive = (index: number) => {
    return clearedCards.includes(index);
  };
  const handleClickOpen = (index: number) => {
    setMove((move) => move + 1);
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
    } else {
      setOpenCards([index]);
    }
  };
  const evaluate = () => {
    const [first_card, second_card] = openCards;
    if (cards[first_card].id === cards[second_card].id) {
      setClearedCards((prevClearedCards) => [
        ...prevClearedCards,
        first_card,
        second_card,
      ]);
      setOpenCards([]);
    } else {
      setOpenCards([]);
    }
  };
  const restartGame = () => {
    setCards(shuffleCards([...cardDetails, ...cardDetails]));
    setOpenCards([]);
    setClearedCards([]);
    setModalState(false);
    setMove(0);
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
            isInactive={checkIsInactive(index)}
            onClick={() => handleClickOpen(index)}
          />
        ))}
      </div>
      <p className="movie"> Move : {move}</p>
      {localStorage.getItem("bestScore") && <p> BestScore : {bestScore}</p>}
      <div><Button variant="contained" onClick={restartGame}>Restart Game</Button></div>
      <SuccessModal
        open={modalState}
        move={move}
        bestScore={bestScore}
        handleRestart={restartGame}
      />
    </div>
  );
};
