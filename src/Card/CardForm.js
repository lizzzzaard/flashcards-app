import React from "react";

function CardForm({ card, changeHandler }) {

    return (
        <div>
            <form>
                <div>
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        type="text"
                        placeholder={card.front}
                        onChange={changeHandler}
                        value={card.front}
                        required
                    />
                </div>
                <div>
                    <label>Back</label>
                    <textarea 
                        id="back"
                        name="back"
                        type="text"
                        placeholder={card.back}
                        onChange={changeHandler}
                        value={card.back}
                        required
                    />
                </div>
            </form>
        </div>
    )
}

export default CardForm;