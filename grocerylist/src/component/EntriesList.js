import React from 'react';
import './EntriesList.css';
import Entry from './Entry';

export default function EntriesList({ entriesArray, getEntriesFromLS,  sortedBy, filteredBy, deleteEntry, status, priority, filteredAndSortedEntries}) {
    const ls = window.localStorage;

    function nameChanged(target) {
        const entryId = target.parentNode.parentNode.id
        const entry = JSON.parse(ls.getItem(entryId));
        entry.entryName = target.value;
        entry.entryId = entryId;
        entry.entryLastChanged = new Date().toLocaleString();
        ls.setItem(entryId, JSON.stringify(entry));
    }

    function statusChanged(target){
        const entryId = target.parentNode.parentNode.id
        const entry = JSON.parse(ls.getItem(entryId));
        entry.entryStatus = target.value;
        entry.entryId = entryId;
        entry.entryLastChanged = new Date().toLocaleString();
        ls.setItem(entryId, JSON.stringify(entry));
    }

    function priorityChanged(target){
        const entryId = target.parentNode.parentNode.id
        const entry = JSON.parse(ls.getItem(entryId));
        entry.entryPriority = (target.value);
        entry.entryId = entryId;
        entry.entryLastChanged = new Date().toLocaleString();
        ls.setItem(entryId, JSON.stringify(entry));
    }

    function onEntryChanged(event) {
        const t = event.target;
        if (t.classList.contains('EntryName')) {
            nameChanged(t);
        } else if (t.classList.contains('EntryStatus')) {
            statusChanged(t);
        } else if (t.classList.contains('EntryPriority')) {
            priorityChanged(t);
        } 
        console.log(filteredBy, sortedBy);
        filteredAndSortedEntries(entriesArray, filteredBy, sortedBy);
    }

    return (
        entriesArray.map(entry => (
        <Entry 
            key={entry.entryId}
            entryId={entry.entryId}
            entryName={entry.entryName} 
            entryLastChanged={entry.entryLastChanged} 
            entryStatus={entry.entryStatus}
            entryPriority={entry.entryPriority}
            deleteEntry={deleteEntry}
            status={status}
            priority={priority}
            onEntryChanged={onEntryChanged}
            />
        ))
    );
}