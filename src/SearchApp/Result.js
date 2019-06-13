import React from 'react';

export default ({ result }) => {
  if (!result) {
    return null;
  }
  return (
    <div>
      <a href={result.scryfall_uri} target='_blank' rel='noopener noreferrer'>
        <h3>{result.name}</h3>
      </a>
      <img
        className='Result-image'
        src={result.image_uris.normal}
        alt={`${result.name} ${result.mana_cost} ${result.type_line} ${
          result.oracle_text
        }`}
      />
    </div>
  );
};
