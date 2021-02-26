import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api/index.js";

function CreateDeck() {
  const history = useHistory();

  // Creates a new deck with the information that was inputed.
  async function handleCreateDeckBtn(e) {
    e.preventDefault();
    const title = document.getElementById("deckTitleInput").value;
    const text = document.getElementById("deckTextInput").value;
    const obj = { name: title, description: text };
    const result = await createDeck(obj);
    history.push(`/decks/${result.id}`)
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
          <textarea
            className="mt-1"
            placeholder="Brief description of the deck"
            as="textarea"
            id="deckTextInput"
          ></textarea>
          <Link to="/">
            <button className="mt-2 mr-1" variant="secondary">
              Cancel
            </button>
          </Link>
            <button onClick={(e) => handleCreateDeckBtn(e)} className="mt-2 mr-1">
              Submit
            </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDeck;
