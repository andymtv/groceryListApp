import React, { useState } from 'react';
import './AddEntry.css';


export default function AddEntry({ addEntry, createEntry}) {
    const [placeholderValue, setPlaceholderValue] = useState('What do you want to buy?')
    const [inputValue, setinputValue] = useState('')

    function clearInput(event) {
        setinputValue('');
        setPlaceholderValue('What do you want to buy?');
    }

    return (
        <tr className="GroceryList-AddEntry-row">
            <td>
                <input className="GroceryList-AddEntry-input form-control" defaultValue={inputValue} placeholder={placeholderValue} onFocus={clearInput} onKeyDown={addEntry} onBlur={clearInput} onChange={createEntry}></input>
            </td>
        </tr>
    )
}