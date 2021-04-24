import React, { useEffect, useState } from "react";
import { Trash, Eye, Book } from "react-bootstrap-icons";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listCards } from "../../utils/api/index.js";

function DeckCard({ deck, index, handleDeleteDeck }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    async function waitCards() {
      const cards = await listCards(deck.id);
      setCount(cards.length);
    }
    waitCards();
  }, []);

  return (
    <Card id={deck.id} className="mt-3 mb-3" key={index}>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Card.Title>{deck.name}</Card.Title>
            </Col>
            <Col>
              <p className="text-right">{count} cards</p>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col>
            <Card.Text className="m-3">{deck.description}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to={`/Flashcards-App/decks/${deck.id}`}>
              <Button variant="secondary" className="m-1">
                <Eye />
                View
              </Button>
            </Link>
            <Link to={`/Flashcards-App/decks/${deck.id}/study`}>
              <Button onClick={() => listCards(deck.id)}>
                <Book />
                Study
              </Button>
            </Link>
          </Col>
          <Col className="col-sm-1 col-lg-1 mr-lg-1">
            <Button
              variant="danger"
              className="m-1"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete that dawg? You won't get it back!"
                  )
                )
                  handleDeleteDeck(deck.id);
              }}
            >
              <Trash />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default DeckCard;
