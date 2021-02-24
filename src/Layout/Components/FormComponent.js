import React from "react";
import { Link } from "react-router-dom";

function FormComponent({ info, handleBtn, params, edit }) {

  function resestForm() {
    document.getElementById("front").value = "";
    document.getElementById("back").value = "";
  }

  // Buttons for edit card
  const editBtns = () => {
    return (
      <div>
        <Link to={`/decks/${params.deckId}`}>
          <button className="mt-2 mr-1" variant="secondary">
            Cancel
          </button>
        </Link>
        <Link to={`/decks/${params.deckId}`}>
          <button onClick={() => handleBtn()} className="mt-2 mr-1">
            Submit
          </button>
        </Link>
      </div>
    );
  };

  // buttons for add card
  const addBtns = () => {
    return (
      <div>
        <Link to={`/decks/${params.deckId}`}>
          <button className="mt-2 mr-1" variant="secondary">
            Done
          </button>
        </Link>
        <button
          onClick={() => {
            handleBtn();
            resestForm();
          }}
          className="mt-2 mr-1"
        >
          Save
        </button>
      </div>
    );
  };

  // Main form
  return (
    <div>
      <form>
        <div className="col">
          <h1>{info.name ? `${info.name}: Add Card` : `Edit Card`}</h1>
          <label className="mt-1">Front</label>
          <input
            className="mt-1"
            placeholder="Front of card"
            as="textarea"
            id="front"
          ></input>
          <label className="mt-1">Back</label>
          <input
            className="mt-1"
            placeholder="Back of card"
            as="textarea"
            id="back"
          ></input>
          {edit ? editBtns() : addBtns()}
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
