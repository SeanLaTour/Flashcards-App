import React, { useEffect, useState } from "react";
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

  async function handleEditDeck(e) {
    e.preventDefault();
    const newTitle = document.getElementById("deckTitleInput").value;
    const newDescription = document.getElementById("deckTextInput").value;
    const obj = { name: newTitle, description: newDescription, id: deck.id };
    await updateDeck(obj);
    await loadDecks();
    history.push(`/decks/${deck.id}`);
  }

  if (!deck) return <p>Loading...</p>;
  return (
    <div>
      <form>
        <div className="col d-flex flex-column">
          <h1>Edit Deck</h1>
          <label className="mt-1">Name</label>
          <input
            className="mt-1"
            value={deck.name}
            type="text"
            id="deckTitleInput"
          ></input>
          <label className="mt-1">Description</label>
          <textarea
            className="mt-1"
            value={deck.description}
            as="textarea"
            id="deckTextInput"
          ></textarea>
          <Link to={`/decks/${deck.id}`}>
            <button className="col-2 mt-2 mr-1" variant="secondary">
              Cancel
            </button>
          </Link>
          <button
            onClick={(e) => handleEditDeck(e)}
            className="col-2 mt-2 mr-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDeck;
