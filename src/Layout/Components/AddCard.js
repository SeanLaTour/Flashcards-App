import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index.js";
import FormComponent from "./FormComponent";


function AddCard() {
  const [deck, setDeck] = useState();
  const params = useParams();

  // Load info and create a new id for the new deck.
  useEffect(() => {
    async function loadDeck() {
      const deckData = await readDeck(params.deckId);
      setDeck(deckData);
    }
    loadDeck();
  }, [params.deckId]);

  // Creates a new card with the information that was inputed.
  async function handleAddCardBtn(e) {
    e.preventDefault();
    const front = document.getElementById("front").value;
    const back = document.getElementById("back").value;
    const obj = { front: front, back: back, deckId: deck.id };
    await createCard(deck.id, obj);
  }

  if (!deck) return <p>Loading...</p>;
  return (
    <FormComponent info={deck} params={params} handleBtn={handleAddCardBtn} />
  );
}

export default AddCard;
