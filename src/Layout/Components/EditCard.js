import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api/index.js";

function EditCard() {
  const [card, setCard] = useState();
  const params = useParams();

  useEffect(() => {
    async function loadCard() {
      const cardData = await readCard(params.cardId);
      setCard(cardData);
    }
    loadCard();
  }, []);

  async function handleEditCardBtn() {
    const front = document.getElementById("front").value;
    const back = document.getElementById("back").value;
    const obj = { front: front, back: back, id: card.id, deckId: card.deckId };
    await updateCard(obj);
  }

  if (!card) return <p>Loading...</p>;
  return (
    <div>
      <Form>
        <Col>
          <h1>Edit Card</h1>
          <Form.Label className="mt-1">Front</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder={card.front}
            as="textarea"
            id="front"
          ></Form.Control>
          <Form.Label className="mt-1">Back</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder={card.back}
            as="textarea"
            id="back"
          ></Form.Control>
          <Link to={`/Flashcards-App/decks/${params.deckId}`}>
            <Button className="mt-2 mr-1" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Link to={`/Flashcards-App/decks/${params.deckId}`}>
            <Button onClick={() => handleEditCardBtn()} className="mt-2 mr-1">
              Submit
            </Button>
          </Link>
        </Col>
      </Form>
    </div>
  );
}

export default EditCard;
