import React, {useState} from 'react';
import './App.css';
import AppHeader from './component/AppHeader';
import EntriesList from './component/EntriesList';
import AddEntry from './component/AddEntry';
import SortAndFilter from './component/SortAndFilter';

export default function App() {
  const status = ['All', 'Have', 'Ran out'];
  const sortBy = ['Name', 'Priority'];
  const priority = [1,2,3,4,5];
  const ls = window.localStorage;

  const [entriesArray, setEntriesArray] = useState(getEntriesFromLS(ls));
  const [filteredBy, setFilteredBy] = useState(status[0]);
  const [sortedBy, setSortedBy] = useState(sortBy[0]);
  const [entryName, setEntryName] = useState('');
  const [entryId, setEntryId] = useState(0);
  const [entryLastChanged, setEntryLastChanged] = useState('');
  const [entryStatus, setEntryStatus] = useState('');
  const [entryPriority, setEntryPriority] = useState('')
  const [existInLS, setExistInLS] = useState('');

  function createEntry(event){
    setEntryName(event.target.value);
    setEntryLastChanged(new Date().toLocaleString());
    setEntryStatus(status[1]);
    setEntryPriority(priority[0]);
    setExistInLS(true);
    if (!(ls.getItem(entryId))) {
      setEntryId(entryId);
    } else if (ls.getItem(entryId)) {
      setEntryId(entryId => entryId + 1)
    }
    
    const newEntry = {
      entryName,
      entryLastChanged,
      entryStatus,
      entryPriority,
      existInLS,
      entryId
    };
    
    return newEntry;
  }
  
  function addEntry(event) {
    if (event.target.value !== '' && event.key === 'Enter'){
      const entry = createEntry(event);
      if (entry.entryName !== '') {
        ls.setItem(entry.entryId, JSON.stringify(entry))
        setEntriesArray(getEntriesFromLS(ls));
        event.target.value = '';
        event.target.placeholder = 'What do you want to buy?';
      }
    } else {
        event.target.placeholder = 'What do you want to buy?';
    }
  }

  function getEntriesFromLS(ls){
      const arr = []
      for (const key in ls) {
          if (Object.hasOwnProperty.call(ls, key)) {
              const element = JSON.parse(ls[key]);
              if (element.entryName !== ''){
                  arr.push(element)
              }
          }
      }
      return arr;
  }

  function filteredAndSortedEntries(arrayOfEntries, filterBy=null, sortBy=null) {
    let arrSorted = null;
    if (filterBy === 'All' && sortBy === 'Name') {
      arrSorted = getEntriesFromLS(ls).sort((a, b) => a.entryName.localeCompare(b.entryName));
      setEntriesArray(arrSorted);
    } else if (filterBy === 'All' && sortBy === 'Priority') {
      arrSorted = arrayOfEntries.sort((a,b) => {
        a = Number(a.entryPriority);
        b = Number(b.entryPriority);
        return  b - a;
      })
      setEntriesArray(arrSorted);
    } else if (filterBy !== 'All' && sortBy === 'Name') {
      arrSorted = arrayOfEntries.filter(entry => entry.entryStatus === filterBy).sort((a, b) => a.entryName.localeCompare(b.entryName));
      setEntriesArray(arrSorted);
    } else if (filterBy !== 'All' && sortBy === 'Priority') {
      arrSorted = arrayOfEntries.filter(entry => entry.entryStatus === filterBy).sort((a,b) => {
        a = Number(a.entryPriority);
        b = Number(b.entryPriority);
        return  b - a;
      })
      setEntriesArray(arrSorted);
    } 
  }

  function deleteEntry(event) {
    window.localStorage.removeItem(event.target.parentElement.parentElement.id)
    setEntriesArray(getEntriesFromLS(ls));
  }

  return (
    <table className='App'>
        <tbody>
            <AppHeader title='Grocery List' />
            <AddEntry 
              addEntry={addEntry} 
              createEntry={createEntry}/>
            <SortAndFilter 
              entriesArray={getEntriesFromLS(ls)} 
              status={status} 
              sortBy={sortBy} 
              filteredBy={setFilteredBy} 
              sortedBy={setSortedBy} 
              priority={priority} 
              filteredAndSortedEntries={filteredAndSortedEntries} />
            <EntriesList 
              entriesArray={entriesArray}
              getEntriesFromLS={getEntriesFromLS}
              filteredAndSortedEntries={filteredAndSortedEntries}
              deleteEntry={deleteEntry} 
              sortedBy={sortedBy}
              filteredBy={filteredBy}
              status={status} 
              priority={priority} />
        </tbody>
    </table>
  );
}

