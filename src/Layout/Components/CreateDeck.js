import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api/index.js";

function CreateDeck({ loadDecks }) {
  const [id, setId] = useState(0);

  // Create a new id for the new deck.
  useEffect(() => {
    async function createNewId() {
      const decksData = await listDecks();
      const orderedDecksData = decksData.map((item) => item.id);
      const idArray = orderedDecksData.sort((itemA, itemB) =>
        itemB > itemA ? 1 : -1
      );
      const newDeckId = idArray[0] + 1;
      setId((id) => (id += newDeckId));
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
  }

  return (
    <div>
      <form>
        <div className="col d-flex flex-column">
          <h1>Create Deck</h1>
          <label className="mt-1">Name</label>
          <input
            className="mt-1"
            placeholder="Deck Name"
            type="text"
            id="deckTitleInput"
          ></input>
          <label className="mt-1">Description</label>
          <input
            className="mt-1"
            placeholder="Brief description of the deck"
            as="textarea"
            id="deckTextInput"
          ></input>
          <Link to="/">
            <button className="mt-2 mr-1" variant="secondary">
              Cancel
            </button>
          </Link>
          <Link to={`/decks/${id}`}>
            <button onClick={() => handleCreateDeckBtn()} className="mt-2 mr-1">
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateDeck;
