import React, { useState } from 'react';
import './Entry.css';

export default function Entry({entryName, entryLastChanged, entryStatus, entryPriority, entryId, status, priority, deleteEntry, onEntryChanged}) {
    const [entryChanged, setEntryChanged] = useState(entryLastChanged)
    
    function applyChanges(event) {
        setEntryChanged(new Date().toLocaleString());
        onEntryChanged(event);
    }

    return (
        <tr className='GroceryList-Entry-row' id={entryId} >
            <td>
                <input type="text" name="entry" className='EntryName form-control' placeholder="Name" defaultValue={entryName} onChange={applyChanges}/>
            </td>
            <td>
                <span className="EntryLastChanged">{entryChanged}</span>
            </td>
            <td>
                <select name="status" className="EntryStatus form-select" defaultValue={entryStatus} onChange={applyChanges}>
                    <option value={status[1]}>{status[1]}</option>
                    <option value={status[2]}>{status[2]}</option>
                </select>
            </td>
            <td>
                <select name="priority" className="EntryPriority form-select" defaultValue={entryPriority} onChange={applyChanges}>
                    <option value={priority[0]}>{priority[0]}</option>
                    <option value={priority[1]}>{priority[1]}</option>
                    <option value={priority[2]}>{priority[2]}</option>
                    <option value={priority[3]}>{priority[3]}</option>
                    <option value={priority[4]}>{priority[4]}</option>
                </select>
            </td>
            <td>
                <button className='deleteButton btn btn-danger' onClick={deleteEntry}>Delete</button>
            </td>
        </tr>
    )
}