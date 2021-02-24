import React from "react";
import { Link } from "react-router-dom";
import { deleteCard, listCards } from "../../utils/api";

function ViewCard({ card, setCards }) {

  async function handleDeleteCard(card) {
    console.log(card);
    await deleteCard(card.id);
    const newCardList = await listCards(card.deckId);
    setCards(newCardList);
  }

  return (
    <div>
      <div className="card mt-3 mb-3">
        <container>
          <div className="row">
            <div className="col">
              <label>{card.front}</label>
            </div>
            <div className="col">
              <label>{card.back}</label>
            </div>
          </div>
          <div className="d-flex row flex-row-reverse">
            <button
              onClick={() => {
                if (window.confirm("Delete card?")) handleDeleteCard(card);
              }}
              variant="danger"
              className="m-1"
            >
              <span class="oi oi-trash"></span>
            </button>
            <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}>
              <button variant="secondary" className="m-1">
                Edit
              </button>
            </Link>
          </div>
        </container>
      </div>
    </div>
  );
}

export default ViewCard;
