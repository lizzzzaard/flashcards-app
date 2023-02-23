
import React from "react";
import { Link } from "react-router-dom";

function NotEnough({ id, cards}) {
    return (
        <div>
            <h2>Not enough cards.</h2>
            <p>
                You need at least 3 cards to study. There are {cards} cards in this deck.
            </p>
            <div>
                <Link to={`/decks/${id}/cards/new`}>Add Cards</Link>
            </div>
        </div>
    )
}

export default NotEnough