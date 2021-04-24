import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import ViewCard from "./ViewCard";
import { listCards, readDeck } from "../../utils/api/index.js";
import { Trash, Book } from "react-bootstrap-icons";

function DeckView({ handleDeleteDeck }) {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const params = useParams();
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadInfo() {
      const deckData = await readDeck(params.deckId);
      setDeck(deckData);
      const cardData = await listCards(params.deckId);
      setCards(cardData);
    }
    loadInfo();
  }, []);

  if (!deck) return <p>loading...</p>;
  const listOfCards = cards.map((card) => {
    return <ViewCard setCards={setCards} card={card} />;
  });

  return (
    <div>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <Row>
        <Col>
          <Link to={`/Flashcards-App/decks/${deck.id}/edit`}>
            <Button className="m-1" variant="secondary">
              Edit
            </Button>
          </Link>
          <Link to={`/Flashcards-App/decks/${deck.id}/study`}>
            <Button className="m-1">
              <Book />
              Study
            </Button>
          </Link>
          <Link to={`/Flashcards-App/decks/${deck.id}/cards/new`}>
            <Button className="m-1">Add Cards</Button>
          </Link>
        </Col>
        <Col className="col-1">
          <Button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete? You won't be able to get it back"
                )
              ) {
                handleDeleteDeck(deck.id);
                history.push("/Flashcards-App/");
              }
            }}
            className="m-1 text-right"
            variant="danger"
          >
            <Trash />
          </Button>
        </Col>
      </Row>
      <h1>Cards</h1>
      {listOfCards}
    </div>
  );
}

export default DeckView;
