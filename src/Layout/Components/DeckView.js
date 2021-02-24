import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import ViewCard from "./ViewCard";
import { listCards, readDeck } from "../../utils/api/index.js";

function DeckView({ handleDeleteDeck }) {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const params = useParams();
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadInfo() {
      const deckData = await readDeck(params.deckId);
      setDeck(deckData);
      const cardData = await listCards(params.deckId);
      setCards(cardData);
    }
    loadInfo();
  }, []);

  if (!deck) return <p>loading...</p>;
  const listOfCards = cards.map((card) => {
    return <ViewCard setCards={setCards} card={card} />;
  });

  return (
    <div>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="row">
        <div className="col">
          <Link to={`/decks/${deck.id}/edit`}>
            <button className="m-1" variant="secondary">
              Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="m-1">
            <span class="oi oi-book"></span>
              Study
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button className="m-1">Add Cards</button>
          </Link>
        </div>
        <div className="col-1">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete? You won't be able to get it back"
                )
              ) {
                handleDeleteDeck(deck.id);
                history.push("/");
              }
            }}
            className="m-1 text-right"
            variant="danger"
          >
            <span class="oi oi-trash"></span>
          </button>
        </div>
      </div>
      <h1>Cards</h1>
      {listOfCards}
    </div>
  );
}

export default DeckView;
