import React from "react";
import DeckCard from './DeckCard';

function Decks({ decks, handleDeleteDeck }) {
  return decks.map((deck, index) => {
    return (
      <DeckCard deck={deck} handleDeleteDeck={handleDeleteDeck} index={index} />
    );
  });
}

export default Decks;
