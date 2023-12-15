import React, { useEffect, useState } from 'react';
import '../css/Park.css';

const Note = (props : any) => {
    const [noteValue, setNoteValue] = useState(0);

    useEffect(() => {
        setNoteValue(props.value);
    }, [props.value]);

    const handleChange = () => {
        props.onValueChange(noteValue);
    };

    return (
        <div className="note">
            <p>{noteValue}</p>
            <input type="radio" name="star" id="star" value={noteValue} onChange={handleChange} />
            <label htmlFor="star"></label>
        </div>
    );
};

export default Note;