import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { House } from "react-bootstrap-icons";
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
  }, []);

  if (!deck) {
    return <h4>Loading...</h4>;
  }
  return (
    <nav style={{ backgroundColor: "#EBEBEB", borderRadius: "5px" }}>
      <ul className="d-flex flex-direction-row">
        <li className="m-2" style={{ listStyle: "none" }}>
          <Link className="d-flex flex-direction-row" to="/Flashcards-App/">
            <House className="m-1" />
            Home
          </Link>
        </li>
        <li className="m-2" style={{ listStyle: "none" }}>
          <p>/</p>
        </li>
        <li className="m-2" style={{ listStyle: "none" }}>
          <Link to={`/Flashcards-App/decks/${deck.id}`}>{deck.name}</Link>
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
