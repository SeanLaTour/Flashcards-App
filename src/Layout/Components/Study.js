import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
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
        <Link to={`/Flashcards-App/decks/${deck.id}/cards/new`}>
          <Button>Add Cards</Button>
        </Link>
      </div>
    );
  }

  // Flip the card.
  if (flipped) {
    nextButton = (
      <Button
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
      </Button>
    );
    content = cards[index].back;
  } else {
    content = cards[index].front;
    nextButton = null;
  }

  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>
            Card {index + 1} of {cards.length}
          </Card.Title>
          <Card.Text>{content}</Card.Text>
          <Button
            onClick={() => setFlipped(!flipped)}
            variant="secondary"
            className="m-2"
          >
            Flip
          </Button>
          {nextButton}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Study;
