import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Decks from "./Components/Decks";
import CreateDeckBtn from "./Components/CreateDeckBtn";
import { listDecks } from "../utils/api/index.js";
import Study from "./Components/Study";
import { deleteDeck } from "../utils/api/index.js";
import StudyNav from "./Components/StudyNav";
import CreateDeck from "./Components/CreateDeck";
import CreateNav from "./Components/CreateNav";
import DeckView from "./Components/DeckView";
import DeckViewNav from "./Components/DeckViewNav";
import EditDeckNav from "./Components/EditDeckNav";
import EditDeck from "./Components/EditDeck";
import AddCardNav from "./Components/AddCardNav";
import AddCard from "./Components/AddCard";
import EditCardNav from "./Components/EditCardNav";
import EditCard from "./Components/EditCard";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function waitDecks() {
      await loadDecks();
    }
    waitDecks();
  }, []);

  // LOAD DECKS
  async function loadDecks() {
    try {
      const deckData = await listDecks();
      setDecks(deckData);
    } catch (err) {
      console.log(err);
    }
  }

  // HANDLE DELETE DECK --- Not working properly with card count after clicking...
  async function handleDeleteDeck(id) {
    await deleteDeck(id);
    await loadDecks();
  }

  // RETURN LAYOUT
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/Flashcards-App/">
            <CreateDeckBtn />
            <Decks
              handleDeleteDeck={handleDeleteDeck}
              decks={decks}
            />
          </Route>
          <Route path="/Flashcards-App/decks/:deckId/cards/:cardId/edit">
            <EditCardNav />
            <EditCard />
          </Route>
          <Route path="/Flashcards-App/decks/:deckId/cards/new">
            <AddCardNav />
            <AddCard />
          </Route>
          <Route path="/Flashcards-App/decks/:deckId/study">
            <StudyNav />
            <Study decks={decks} />
          </Route>
          <Route path="/Flashcards-App/decks/:deckId/edit">
            <EditDeckNav />
            <EditDeck loadDecks={loadDecks} />
          </Route>
          <Route path="/Flashcards-App/decks/new">
            <CreateNav />
            <CreateDeck loadDecks={loadDecks} />
          </Route>
          <Route path="/Flashcards-App/decks/:deckId">
            <DeckViewNav />
            <DeckView handleDeleteDeck={handleDeleteDeck} decks={decks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
