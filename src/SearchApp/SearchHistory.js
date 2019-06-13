import React from 'react';

export default ({ searchHistory, deleteHistoryEntry, clearSearchHistory }) => {
  if (!searchHistory.length) {
    return null;
  }

  return (
    <aside className='SearchApp-history'>
      <div className='SearchApp-historyHead'>
        <h2>Search history</h2>
        <button className='SearchApp-clearHistory' onClick={clearSearchHistory}>
          Clear search history
        </button>
      </div>
      <ul className='SearchApp-historyList'>
        {searchHistory.map(entry => (
          <li key={entry.id} className='SearchApp-historyEntry'>
            <div className='SearchApp-historyEntryName'>{entry.name}</div>
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
    </aside>
  );
};
