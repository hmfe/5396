import React from 'react';

export default ({ suggestions, selectResult, formatSuggestion }) => {
  if (!suggestions.length) {
    return null;
  }

  return (
    <ul className='SearchApp-suggestions'>
      {suggestions.map(suggestion => (
        <li key={suggestion.id}>
          <button
            className='SearchApp-suggestion'
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
