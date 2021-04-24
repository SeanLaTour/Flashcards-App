import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api/index.js";

function CreateDeck({ loadDecks }) {
  const [id, setId] = useState(0);
  const history = useHistory();

  // Create a new id for the new deck.
  useEffect(() => {
    async function createNewId() {
      try {
        const decksData = await listDecks();
        console.log("decksData: ", decksData.length);
        if (decksData.length > 0) {
          const orderedDecksData = decksData.map((item) => item.id);
          const idArray = orderedDecksData.sort((itemA, itemB) =>
            itemB > itemA ? 1 : -1
          );
          const newDeckId = idArray[0] + 1;
          setId((id) => (id += newDeckId));
        } else {
          setId(id => id += 1);
        }
      } catch (err) {
        console.log(err);
      }
    }
    createNewId();
  }, []);

  // Creates a new deck with the information that was inputed.
  async function handleCreateDeckBtn() {
    const title = document.getElementById("deckTitleInput").value;
    const text = document.getElementById("deckTextInput").value;
    const obj = { name: title, description: text, id: id };
    await createDeck(obj);
    await loadDecks();
    history.push(`/Flashcards-App/`);
  }

  return (
    <div>
      <Form>
        <Col>
          <h1>Create Deck</h1>
          <Form.Label className="mt-1">Name</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder="Deck Name"
            type="text"
            id="deckTitleInput"
          ></Form.Control>
          <Form.Label className="mt-1">Description</Form.Label>
          <Form.Control
            className="mt-1"
            placeholder="Brief description of the deck"
            as="textarea"
            id="deckTextInput"
          ></Form.Control>
          <Link to="/Flashcards-App/">
            <Button className="mt-2 mr-1" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button onClick={() => handleCreateDeckBtn()} className="mt-2 mr-1">
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default CreateDeck;
