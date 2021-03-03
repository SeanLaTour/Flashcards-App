import React from "react";
import { Link } from "react-router-dom";
import { listCards } from "../../utils/api/index.js";

function DeckCard({ deck, index, handleDeleteDeck }) {

  if (!deck) return <p>Loading...</p>
  return (
    <div id={deck.id} className="card mt-3 mb-3" key={index}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>{deck.name}</h2>
            </div>
            <div className="col">
              <p className="text-right">{deck.cards.length} cards</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="m-3">{deck.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to={`/decks/${deck.id}`}>
              <button variant="secondary" className="m-1">
              <span className="oi oi-eye"></span>
                View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button onClick={() => listCards(deck.id)}>
              <span className="oi oi-book"></span>
                Study
              </button>
            </Link>
          </div>
          <div className="col-sm-1 col-lg-1 mr-lg-1">
            <button
              variant="danger"
              className="m-1"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete? You won't be able to get it back"
                  )
                )
                  handleDeleteDeck(deck.id);
              }}
            >
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
    </div>
  );
}

export default DeckCard;