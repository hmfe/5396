import React from 'react';
import './SearchHistory.css';

export default ({ searchHistory, deleteHistoryEntry, clearSearchHistory }) => {
  if (!searchHistory.length) {
    return null;
  }

  return (
    <>
      <div className='SearchHistory-head'>
        <h2>Search history</h2>
        <button className='SearchHistory-clear' onClick={clearSearchHistory}>
          Clear search history
        </button>
      </div>
      <ul className='SearchHistory-list'>
        {searchHistory.map(entry => (
          <li key={entry.id} className='SearchHistory-entry'>
            <div className='SearchHistory-entryName'>{entry.name}</div>
            <div>{entry.timestamp.toLocaleString()}</div>
            <button
              aria-label='Delete'
              onClick={() => deleteHistoryEntry(entry.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
