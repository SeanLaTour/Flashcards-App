import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { deleteCard, listCards } from "../../utils/api";

function ViewCard({ card, setCards }) {

  async function handleDeleteCard(card) {
    await deleteCard(card.id);
    const newCardList = await listCards(card.deckId);
    setCards(newCardList);
  }

  return (
    <div>
      <Card className="mt-3 mb-3">
        <Container>
          <Row>
            <Col>
              <Card.Text>{card.front}</Card.Text>
            </Col>
            <Col>
              <Card.Text>{card.back}</Card.Text>
            </Col>
          </Row>
          <Row className="d-flex flex-row-reverse">
            <Button
              onClick={() => {
                if (window.confirm("Delete card?")) handleDeleteCard(card);
              }}
              variant="danger"
              className="m-1"
            >
              <Trash />
            </Button>
            <Link to={`/Flashcards-App/decks/${card.deckId}/cards/${card.id}/edit`}>
              <Button variant="secondary" className="m-1">
                Edit
              </Button>
            </Link>
          </Row>
        </Container>
      </Card>
    </div>
  );
}

export default ViewCard;
