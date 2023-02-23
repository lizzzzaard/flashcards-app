import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, listDecks, deleteCard, deleteDeck } from"../utils/api/index";

/*
The Deck screen has the following features:
- The Deck screen displays all of the information about a deck.

- The path to this screen should include the deckId (i.e., /decks/:deckId).

- You must use the readDeck() function from src/utils/api/index.js to load the existing deck.(DONE)

- There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).

- The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").

- The screen includes Edit, Study, Add Cards, and Delete buttons. Each button takes the user to a different destination, as follows:

    | Button Clicked | Destination |
    | -------------- |  ---------------------------------------------------------------------------------------------- |
    | Edit | Edit Deck Screen |
    | Study | Study screen |
    | Add Cards | Add Card screen |
    | Delete | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

Each card in the deck:
- Is listed on the page under the "Cards" heading.
- Shows a question and the answer to the question.
- Has an Edit button that takes the user to the Edit Card screen when clicked.
- Has a Delete button that allows that card to be deleted.
    - When the user clicks the Delete button associated with a card, a warning message is shown and the user can click OK or Cancel. If the user clicks OK, the card is deleted.

    - You can use window.confirm() to create the modal dialog shown in the screenshot below.

*/


function Deck () {
    const [decks, setDecks] = useState([]);
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
        cards: [],
    };

    const [deck, setDeck] = useState(initialDeckState);
    const { deckId } = useParams();
    const history = useHistory();


    useEffect(() => {
        const abortController = new AbortController();
        async function loadDecks() {
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        loadDecks();
        return () => abortController.abort();
    }, []);

    async function cardDeleteHandler(cardId) {
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            await deleteCard(cardId);
            const updatedCards = deck.cards.filter((card, index) => card.id !== cardId);
            setDeck({
                ...deck,
                cards: updatedCards
            })
        } else {
            return null;
        }
    }

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        }
        loadDeck();
    }, [deckId]);

    async function deckDeleteHandler(deckId) {
        await deleteDeck(deckId);
        setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== deckId));
        history.push("/");
    }

    return (
        <div>
            <div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>/{deck.name}</li>
                </ol>
            </div>
            <div>
                <h4>{deck.name}</h4>
                <p>{deck.description}</p>
                <div>
                    <Link to={`/decks/${deck.id}/edit`}>
                        <button onClick={() => history.push(`/decks/${deck.id}/edit`)}>Edit</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button onClick={() => history.push(`decks/${deck.id}/study`)}>Study</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/cards/new`}>
                        <button onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>Add Cards</button>
                    </Link>
                    <button type="delete" onClick={() => deckDeleteHandler(deck.id)}>Delete Deck</button>
                </div>
                <h2>Cards</h2>
                {deck.cards.map((card) => {
                    return (
                        <div key={card.id}>
                            <p>{card.front}</p>
                            <p>{card.back}</p>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                                <button onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}>Edit</button>
                            </Link>
                            <button type="delete" onClick={() => cardDeleteHandler(card.id)}>Delete Card</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default Deck;