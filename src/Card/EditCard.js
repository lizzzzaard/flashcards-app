import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

/*
The Edit Card screen has the following features:
- The Edit Card screen allows the user to modify information on an existing card.

- The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).(DONE)

- You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.(DONE)
js to load the card that you want to edit.

- There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).(DONE)

- It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.(DONE)

- If the user clicks on either Save or Cancel, the user is taken to the Deck screen.(DONE)

*/

function EditCard () {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    
    const intialCardState = {
        front: "",
        back: "",
        deckId: "",
    }
    const [card, setCard] = useState({...intialCardState});
    
    const initialDeckState = {
        name: "",
        description: "",
        cards: [],
    }
    const [deck, setDeck] = useState({...initialDeckState});

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck({ ...deckFromAPI });
        }
        loadDeck();
    }, [deckId]);

    useEffect(() => {
        async function loadCard() {
            const cardFromAPI = await readCard(cardId);
            setCard({ ...cardFromAPI });
        }
        loadCard();
    }, [cardId])

    function changeHandler({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        async function editCard() {
            try {
                await updateCard({ ...card });
                history.push(`/decks/${deckId}`)
            } catch(error) {
                console.log("Error!", error)
            }
        }
        editCard();
    }

    const handleSave = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to={`/decks/${deckId}`}>/ Deck {deck.name}</Link>
                    </li>
                    <li>/ Edit Card {card.id} </li>
                </ol>
            </div>
            <div>
                <h1>Edit Card</h1>
                    <CardForm changeHandler={changeHandler} card={card} />
                    <button type="cancel" onClick={handleSave}>Cancel</button>
                    <button type="submit" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}

export default EditCard;