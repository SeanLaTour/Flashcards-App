import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listCards, readDeck } from "../../utils/api/index.js";

function Study({ decks }) {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState();
  let content, nextButton;

  const params = useParams();

  useEffect(() => {
    async function loadInfo() {
      const deckData = await readDeck(params.deckId);
      setDeck(deckData);
      const cardData = await listCards(params.deckId);
      setCards(cardData);
    }
    loadInfo();
  }, []);

  // Test to be sure cards and deck are present.
  if (!deck || cards == []) {
    return <h4>Loading...</h4>;
  } else if (cards.length <= 2) {
    return (
      <div>
        <h3>Not enough cards.</h3>
        <p>
          {" "}
          You need at least 3 cards to study. There{" "}
          {cards.length === 1 ? "is" : "are"} only {cards.length} card
          {cards.length === 1 ? null : "s"} in this deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="col-2">Add Cards</button>
        </Link>
      </div>
    );
  }

  // Flip the card.
  if (flipped) {
    nextButton = (
      <div className="d-flex col-1">
      <button
        onClick={() => {
          if (index < cards.length - 1) {
            setIndex((index) => index + 1);
            setFlipped(!flipped);
          } else {
            if (window.confirm("Would you like to restart the deck?")) {
              setIndex((index) => (index = 0)); // Maybe change this.
              setFlipped(!flipped);
            }
          }
        }}
        className="m-1"
      >
        Next
      </button>
      </div>
    );
    content = cards[index].back;
  } else {
    console.log("cards: ", cards)
    content = cards[index].front;
    nextButton = null;
  }

  return (
    <div className="card p-2 d-flex flex-column">
      <h1>Study: {deck.name}</h1>
      <div>
        <div className="d-flex flex-column">
          <h2>
            Card {index + 1} of {cards.length}
          </h2>
          <label>{content}</label>
          <button
            onClick={() => setFlipped(!flipped)}
            variant="secondary"
            className="m-2 col-1"
          >
            Flip
          </button>
          {nextButton}
        </div>
      </div>
    </div>
  );
}

export default Study;
