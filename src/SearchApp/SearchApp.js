import React, { useState, useEffect, useRef } from 'react';
import search from './search';
import './SearchApp.css';
import Result from './Result';
import SearchHistory from './SearchHistory';
import Suggestions from './Suggestions';

export default () => {
  let requestCount = useRef(0);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [result, setResult] = useState();

  useEffect(() => {
    const doSearch = async () => {
      // only update suggestions if no new request has been started
      const requestId = ++requestCount.current;
      const results = await search(query);
      if (requestCount.current === requestId) {
        setSuggestions(results);
      }
    };
    doSearch();
  }, [query]);

  const handleQueryChange = async event => setQuery(event.target.value);

  const selectResult = result => {
    setQuery('');
    setResult(result);
    setSearchHistory(prevHistory => [
      ...prevHistory,
      { id: result.id, name: result.name, timestamp: new Date() }
    ]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (suggestions.length > 0) {
      selectResult(suggestions[0]);
    } else {
      const results = await search(query);
      selectResult(results[0]);
    }
  };

  const deleteHistoryEntry = id => {
    setSearchHistory(prevHistory =>
      prevHistory.filter(entry => entry.id !== id)
    );
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const formatSuggestion = name => {
    const match = name.match(new RegExp(query, 'i'));
    if (!match) {
      return name;
    }
    const capture = match[0];
    const parts = name.split(capture);
    return (
      <>
        <span>{parts[0]}</span>
        <strong>{capture}</strong>
        <span>{parts[1]}</span>
      </>
    );
  };

  return (
    <div className='SearchApp'>
      <h1 className='SearchApp-heading'>Search App</h1>
      <main className='SearchApp-search'>
        <form role='search' className='SearchApp-form' onSubmit={handleSubmit}>
          <label htmlFor='query'>
            <h2>Search for Magic The Gathering cards</h2>
          </label>
          <input
            id='query'
            type='search'
            className='SearchApp-input'
            value={query}
            onChange={handleQueryChange}
          />
        </form>
        <Suggestions
          suggestions={suggestions}
          selectResult={selectResult}
          formatSuggestion={formatSuggestion}
        />
        <Result result={result} />
      </main>
      <aside>
        <SearchHistory
          searchHistory={searchHistory}
          deleteHistoryEntry={deleteHistoryEntry}
          clearSearchHistory={clearSearchHistory}
        />
      </aside>
    </div>
  );
};
