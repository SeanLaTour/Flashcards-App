import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";

function CreateDeckBtn() {
  return (
    <Link to="/Flashcards-App/decks/new">
      <Button
        variant="secondary"
        size="large"
        className="m-2 d-flex justify-content-center flex-direction-row"
      >
        <PlusSquare className="m-1" size={20} />
        Create Deck
      </Button>
    </Link>
  );
}

export default CreateDeckBtn;
