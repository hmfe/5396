import suggestionTemplate from './suggestions.handlebars';
import './suggestions.css';

const suggestionsEl = document.getElementById('suggestions');

const fixWhitespace = str => str.replace(/\s/g, '&nbsp');

const formatSuggestion = (name, query) => {
  const match = name.match(new RegExp(query, 'i'));
  if (!match) {
    return { prefix: name };
  }
  const capture = match[0];
  const parts = name.split(capture);
  return {
    prefix: fixWhitespace(parts[0]),
    match: fixWhitespace(capture),
    suffix: fixWhitespace(parts[1])
  };
};

const render = (suggestions, query, selectResult) => {
  suggestionsEl.innerHTML = suggestionTemplate({
    suggestions: suggestions.slice(0, 10).map(suggestion => {
      const splitName = formatSuggestion(suggestion.name, query);
      return {
        id: suggestion.id,
        name: suggestion.name,
        ...splitName
      };
    })
  });

  document
    .querySelectorAll('[data-js=suggestionButton]')
    .forEach(suggestionButton => {
      suggestionButton.addEventListener('click', () =>
        selectResult(
          suggestions.find(
            suggestion => suggestion.id === suggestionButton.dataset.id
          )
        )
      );
    });
};

export default render;
