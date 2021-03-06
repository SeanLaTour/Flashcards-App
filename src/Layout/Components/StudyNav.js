import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";

function StudyNav() {
  const params = useParams();
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadInfo() {
      const deckData = await readDeck(params.deckId);
      setDeck(deckData);
    }
    loadInfo();
  }, [params.deckId]);

  if (!deck) {
    return <h4>Loading...</h4>;
  }
  return (
    <nav style={{ backgroundColor: "#EBEBEB", borderRadius: "5px" }}>
      <ul className="d-flex flex-direction-row">
        <li className="m-2" style={{ listStyle: "none" }}>
          <Link className="d-flex flex-direction-row" to="/">
          <span className="oi oi-home"></span>
            Home
          </Link>
        </li>
        <li className="m-2" style={{ listStyle: "none" }}>
          <p>/</p>
        </li>
        <li className="m-2" style={{ listStyle: "none" }}>
          <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
        </li>
        <li className="m-2" style={{ listStyle: "none" }}>
          <p>/</p>
        </li>
        <li className="m-2" style={{ listStyle: "none" }}>
          <p>Study</p>
        </li>
      </ul>
    </nav>
  );
}

export default StudyNav;
