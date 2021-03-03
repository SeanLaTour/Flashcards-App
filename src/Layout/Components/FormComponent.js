import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormComponent({ info, handleBtn, params, edit }) {
  const [front, setFront] = useState(info.front);
  const [back, setBack] = useState(info.back);

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
          <button onClick={(e) => handleBtn(e)} className="mt-2 mr-1">
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
          onClick={(e) => {
            handleBtn(e);
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
          <textarea
            onChange={(e) => {setFront(e.target.value)
            console.log("e.targ: ", e.target.value)}}
            className="mt-1"
            placeholder="Front of card"
            defaultValue={edit ? front : null}
            as="textarea"
            id="front"
          ></textarea>
          <label className="mt-1">Back</label>
          <textarea
            onChange={(e) => setBack(e.target.value)}
            className="mt-1"
            placeholder="Back of card"
            defaultValue={edit ? back : null}
            as="textarea"
            id="back"
          ></textarea>
          {edit ? editBtns() : addBtns()}
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
