import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";


/*
The Add Card screen has the following features:
- The Add Card screen allows the user to add a new card to an existing deck.


- The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).(DONE)

- You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.(DONE)

- There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).(DONE)

- The screen displays the React Router: Add Card deck title.(DONE)

- A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.(DONE)

- If the user clicks Save, a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.(Maybe done???)

- If the user clicks Done, the user is taken to the Deck screen.(Maybe done???)
*/

function AddCard () {
    const { deckId } = useParams();
    const history = useHistory();
    
    const initialCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    }
    const [card, setCard] = useState(initialCardState);
    
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
        cards: [],
    }
    const [deck, setDeck] = useState(initialDeckState);

useEffect(() => {
    async function loadDeck() {
       const deckFromAPI = await readDeck(deckId);
       setDeck(deckFromAPI);
    }
    loadDeck();
}, [deckId]);

function changeHandler({ target }) {
    setCard({
        ...card,
        [target.name]: target.value,
    });
}

async function handleSubmit(event) {
    event.preventDefault();
    await createCard(deckId, card);
    setCard(initialCardState);
    history.go(0);
}

function handleDone (event) {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
}
    return (
        <div>
            <div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li>Add Card</li>
                </ol>
            </div>
            <div>
                <h1>{deck.name}: Add Card</h1>
                    <CardForm changeHandler={changeHandler} card={card} />
                    <button type="cancel" onClick={handleDone}>Done</button>
                    <button type="submit" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )

}


export default AddCard;