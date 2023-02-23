import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnough from "../Card/NotEnough";


function Study() {
    const [deck, setDeck] = useState({ cards: [] });
    const [flip, setFlip] = useState(false);
    const [cardCount, setCardCount] = useState(0);
    const [index, setIndex] = useState(0);
    const { deckId } = useParams();
    const history = useHistory();


    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try {
                const deckFromAPI = await readDeck(deckId, abortController.signal);
                setDeck(deckFromAPI);
            } catch (error) {
                console.log("Error occured", error);
            }
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

// click handler to handler the flipped cards
    const flipHandler = () => {
        setFlip(!flip);
    }

// function to get the handle next card in the deck

    function handleNextCard() {
        if (index === deck.cards.length -1) {
            if (window.confirm(`Restart cards? Click 'cancel' to return to home page.`) === true){
                setIndex(0);
            } else {
                history.push("/")
            }
        } else {
            setIndex((currentIndex) => currentIndex + 1)
        }
        setFlip(!flip)
    }

    
    return (
        <div>
         <ol className="breadcrumb">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li>/ Study</li>
            </ol>
            <div>
                <h1>{`${deck.name}: Study`}</h1>
                {deck.cards.length > 2 ? (
                    <div>
                        <h5>Card {index + 1} of {deck.cards.length}</h5>
                        <p>
                            {!flip ? `${deck.cards[cardCount].front}` : `${deck.cards[cardCount].back}` }
                        </p>
                        <button onClick={flipHandler}>Flip</button>
                        {flip && (
                            <button onClick={handleNextCard}>Next</button>
                        )}
                    </div>
                ): (
                    <NotEnough id={deck.id} cards={cardCount}/>
                )} 
            </div>
        </div>
    )

}

export default Study;