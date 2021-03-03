import React from "react";
import { Link } from "react-router-dom";

function CreateDeckBtn() {
  return (
    <Link to="/decks/new">
      <button
        variant="secondary"
        size="large"
        className="m-2 d-flex justify-content-center flex-direction-row"
      >
        <span className="oi oi-plus"></span>
        Create Deck
      </button>
    </Link>
  );
}

export default CreateDeckBtn;
