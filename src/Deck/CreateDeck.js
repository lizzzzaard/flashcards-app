import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api/index";

/*
The Create Deck screen has the following features:
- The Home screen has a Create Deck button that brings the user to the Create Deck screen.

- The path to this screen should be /decks/new.(DONE)

- There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).(DONE)

- A form is shown with the appropriate fields for creating a new deck.(DONE)

- The name field is an <input> field of type text.(DONE)

- The description field is a <textarea> field that can be multiple lines of text.(DONE)

- If the user clicks Submit, the user is taken to the Deck screen.

- If the user clicks Cancel, the user is taken to the Home screen.(DONE)
*/

function CreateDeck () {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    const initialDeckState = {
        name: "",
        description: "",
    }

    const [deck, setDeck] = useState({...initialDeckState});

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

    const handleSubmit = (event) => {
        event.preventDefault();
        async function createNewDeck() {
            try {
                const newDeck = await createDeck(deck);
                setDeck({ ...initialDeckState });
                history.push(`/decks/${newDeck.id}`)
            } catch(error) {
                console.log("Error!", error)
            }
        }
        createNewDeck();
    }

    function changeHandler({ target }) {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }

    return (
        <div>
            <div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>/Create Deck</li>
                </ol>
            </div>
            <div>
                <h1>Create Deck</h1>
                <form>
                    <label>Name</label>
                        <input 
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Deck Name"
                            onChange={changeHandler}
                            value={deck.name}
                        />
                    <label>Description</label>
                        <textarea 
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Description of Deck"
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

export default CreateDeck;