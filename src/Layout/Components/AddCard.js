import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck, listCards } from "../../utils/api/index.js";

function AddCard() {
  const [deck, setDeck] = useState();
  const [id, setId] = useState(0);
  const params = useParams();

  // Load info and create a new id for the new deck.
  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(params.deckId);
      const cardsData = await listCards();
      const orderedCardsData = cardsData.map((item) => item.id);
      const idArray = orderedCardsData.sort((itemA, itemB) =>
        itemB > itemA ? 1 : -1
      );
      const newCardId = idArray[0] + 1;
      setId((id) => (id += newCardId));
      setDeck(deckData);
    }
    loadDeck();
  }, []);

  // Creates a new card with the information that was inputed.
  async function handleAddCardBtn() {
    const front = document.getElementById("front").value;
    const back = document.getElementById("back").value;
    const obj = { front: front, back: back, id: id, deckId: deck.id };
    await createCard(deck.id, obj);
    document.getElementById("front").value = '';
    document.getElementById("back").value = '';
  }

  if (!deck) return <p>Loading...</p>;
  return (
    <div>
      <Form>
        <Col>
          <h1>{deck.name}: Add Card</h1>
          <Form.Label className="mt-1">Front</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder="Front of card"
            as="textarea"
            id="front"
          ></Form.Control>
          <Form.Label className="mt-1">Back</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder="Back of card"
            as="textarea"
            id="back"
          ></Form.Control>
          <Link to={`/Flashcards-App/decks/${deck.id}`}>
            <Button className="mt-2 mr-1" variant="secondary">
              Done
            </Button>
          </Link>
          <Button onClick={() => handleAddCardBtn()} className="mt-2 mr-1">
            Save
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default AddCard;
