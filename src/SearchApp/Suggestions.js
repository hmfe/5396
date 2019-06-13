import React from 'react';
import './Suggestions.css';

export default ({ suggestions, selectResult, formatSuggestion }) => {
  if (!suggestions.length) {
    return null;
  }

  return (
    <ul className='Suggestions'>
      {suggestions.map(suggestion => (
        <li key={suggestion.id}>
          <button
            className='Suggestions-suggestion'
            onClick={() => selectResult(suggestion)}
            aria-label={suggestion.name}
          >
            {formatSuggestion(suggestion.name)}
          </button>
        </li>
      ))}
    </ul>
  );
};
