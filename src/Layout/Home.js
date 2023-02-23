import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

/*
The Home screen has the following features:

- The Home screen is the first page the user sees. It is displayed at /.(DONE)

- The path to this screen should be /.(DONE)

- A Create Deck button is shown, and clicking it brings the user to the Create Deck screen.(DONE)

- Existing decks are each shown with the deck name, the number of cards, and a Study, View, and Delete button.(DONE)

- Clicking the Study button brings the user to the Study screen.(DONE)
- Clicking the View button brings the user to the Deck screen.(DONE)
- Clicking the Delete button shows a warning message before deleting the deck.(DONE)

- Home component will contain the delete button:
    - When the user clicks the Delete button, a warning message is shown and the user can click OK or Cancel. If the user clicks OK, the deck is deleted and the deleted deck is no longer visible on the Home screen.(DONE)

    - You can use window.confirm() to create the modal dialog shown in the screenshot below.
*/

function Home () {
    //const { url } = useRouteMatch;
    //console.log(url)
const [decks, setDecks] = useState([]);
const history = useHistory();

useEffect(() => {
    // create an async function to use the functions that are making the api calls
    async function fetchDecks () {
        const abortController = new AbortController();
        try {
            // in the .utils/api/index.js file, the listDecks function takes in the signal
            const response = await listDecks(abortController.signal)
            setDecks(response);
        } catch (error) {
            console.log("Error occured", error);
        }
        return () => abortController.abort;
    }
    //call the function
    fetchDecks();
}, [])

    async function handleDelete(deck) {
        if (window.confirm(`Delete this deck? You will not be able to recover it.`)) {
            //clicking delete will refresh the page and the deck will no longer appear on the screen
            history.go(0);
            return await deleteDeck(deck.id);
        }
    }


    return (
        <div>
            <Link to="/decks/new"> Create Deck</Link>
            <div className="card-decks">
                {decks.map((deck) => {
                    return (
                        <div className="card" key={deck.id}>
                            <div className="card-name">
                                {`${deck.name}`}
                            </div>
                            <div className="card-number">
                                {`${deck.cards.length} cards`}
                            </div>
                            <div className="card-description">
                                {`${deck.description}`}
                            </div>
                            <Link to={`/decks/${deck.id}`}>View</Link>
                            <Link to={`/decks/${deck.id}/study`}>Study</Link>
                            <button type="button" onClick={() => handleDelete(deck)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Home;