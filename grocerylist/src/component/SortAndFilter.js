import React, { useEffect, useState, useRef } from 'react';
import './SortAndFilter.css';

export default function SortAndFilter({ entriesArray, sortedBy, filteredBy, status, sortBy, priority, filteredAndSortedEntries }) {
    const [sortStatusValue, setSortStatusValue] = useState(status[0]);
    const [sortByValue, setSortByValue] = useState(sortBy[0]);
    
    const prevSortStatusValueRef = useRef();
    const prevSortByValueRef = useRef();

    useEffect(() => {
        prevSortStatusValueRef.current = sortStatusValue;
        prevSortByValueRef.current = sortByValue;
        
        if ( sortStatusValue !==  prevSortStatusValue || sortByValue !== prevSortByValue) {
            filteredBy(sortStatusValue);
            sortedBy(sortByValue);
            filteredAndSortedEntries(entriesArray, sortStatusValue, sortByValue)
        }
    })

    const prevSortStatusValue = prevSortStatusValueRef.current;
    const prevSortByValue = prevSortByValueRef.current;

    function filter(event) {
        setSortStatusValue(event.target.value);
    }

    function sort(event) {
        setSortByValue(event.target.value);
    }

    return (
        <tr className='GroceryList-SortAndFilter-row'>
            <td>
            </td>
            <td>
                <span>Last changed</span>
            </td>
            <td>
                <label htmlFor="status-select">Status: </label>
                <select className="status-select form-select" name="status" id="status-select" defaultValue={sortStatusValue} onChange={filter} >
                    <option value={status[0]}>{status[0]}</option>
                    <option value={status[1]}>{status[1]}</option>
                    <option value={status[2]}>{status[2]}</option>
                </select>
            </td>
            <td>
                <label htmlFor="priority-select">Sort by: </label>
                <select name="priority" id="priority-select" defaultValue={sortByValue} onChange={sort} className='form-select'>
                    <option value={sortBy[0]}>{sortBy[0]}</option>
                    <option value={sortBy[1]}>{sortBy[1]}</option>
                </select>
            </td>
            <td>
            </td>
        </tr>
    )
}