import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api/index.js";
import FormComponent from "./FormComponent";

function EditCard() {
  const [card, setCard] = useState();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadCard() {
      const cardData = await readCard(params.cardId);
      setCard(cardData);
    }
    loadCard();
  }, [params.cardId]);

  async function handleEditCardBtn(e) {
    e.preventDefault();
    const front = document.getElementById("front").value;
    const back = document.getElementById("back").value;
    const obj = { front: front, back: back, id: card.id, deckId: card.deckId };
    await updateCard(obj);
    history.push(`/decks/${params.deckId}`)
  }

  if (!card) return <p>Loading...</p>;
  return (
    <FormComponent info={card} edit={true} params={params} handleBtn={handleEditCardBtn} />
  );
}

export default EditCard;
