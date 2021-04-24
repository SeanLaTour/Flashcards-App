import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { House } from "react-bootstrap-icons";
import { readDeck } from "../../utils/api/index.js";

function DeckViewNav() {
  const params = useParams();
  const [deck, setDeck] = useState();

  useEffect(() => {
    async function loadInfo() {
      try {
        const deckData = await readDeck(params.deckId);
        setDeck(deckData);
      } catch (err) {
        console.log(err);
      }
    }
    loadInfo();
  }, []);

  if (!deck) return <p>loading...</p>;
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
          <p>{deck.name}</p>
        </li>
      </ul>
    </nav>
  );
}

export default DeckViewNav;
