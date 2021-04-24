import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index.js";

function EditDeck({ loadDecks }) {
  const history = useHistory();
  const params = useParams();
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(params.deckId);
      setDeck(deckData);
    }
    loadDeck();
  }, []);

  async function handleEditDeck() {
    const newTitle = document.getElementById("deckTitleInput").value;
    const newDescription = document.getElementById("deckTextInput").value;
    const obj = { name: newTitle, description: newDescription, id: deck.id };
    await updateDeck(obj);
    await loadDecks();
    history.push(`/Flashcards-App/decks/${deck.id}`);
  }

  if (!deck) return <p>Loading...</p>;
  return (
    <div>
      <Form>
        <Col>
          <h1>Edit Deck</h1>
          <Form.Label className="mt-1">Name</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder={deck.name}
            type="text"
            id="deckTitleInput"
          ></Form.Control>
          <Form.Label className="mt-1">Description</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder={deck.description}
            as="textarea"
            id="deckTextInput"
          ></Form.Control>
          <Link to={`/Flashcards-App/decks/${deck.id}`}>
            <Button className="mt-2 mr-1" variant="secondary">
              Cancel
            </Button>
          </Link>
            <Button onClick={() => handleEditDeck()} className="mt-2 mr-1">Submit</Button>
        </Col>
      </Form>
    </div>
  );
}

export default EditDeck;
