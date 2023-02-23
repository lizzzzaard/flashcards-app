import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

/*
The Edit Deck screen has the following features:
- The Edit Deck screen allows the user to modify information on an existing deck.

- The path to this screen should include the deckId (i.e., /decks/:deckId/edit).(DONE)

- You must use the readDeck() function from src/utils/api/index.js to load the existing deck.(DONE)

- There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).

- It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck.

- The user can edit and update the form.(DONE)

- If the user clicks Cancel, the user is taken to the Deck screen.(DONE)

*/


function EditDeck () {
    const initialDeckState = {
        name: "",
        description: "",
    }
    
    const [deck, setDecks] = useState({...initialDeckState});
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDecks(deckFromAPI);
        }
        loadDeck();
    }, [deckId]);

    function changeHandler({ target }) {
        setDecks({
            ...deck,
            [target.name]: target.value,
        });
    }

    //async function handleSubmit(event) {
        //event.preventDefault();
        //await updateDeck(deck);
        //history.push(`/decks/${deck.id}`);
    //}

    const handleSubmit = (event) => {
        event.preventDefault();
        async function editDeck() {
            try {
                await updateDeck(deck);
                history.push(`/decks/${deckId}`)
            } catch(error) {
                console.log("Error!", error)
            }
        }
        editDeck();
    }

    return (
        <div>
            <div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>/ {deck.name}</li>
                    <li>/ Edit Deck</li>
                </ol>
            </div>
            <div>
                <h1>Edit Deck</h1>
                <form>
                    <label>Name</label>
                        <input 
                            id="name"
                            name="name"
                            type="text"
                            placeholder={deck.name}
                            onChange={changeHandler}
                            value={deck.name}
                        />
                    <label>Description</label>
                        <textarea 
                            id="description"
                            name="description"
                            type="text"
                            placeholder={deck.description}
                            onChange={changeHandler}
                            value={deck.description}
                        />
                <button type="cancel" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )

}

export default EditDeck;