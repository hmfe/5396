const suggestionsEl = document.getElementById('suggestions');

const suggestionTemplate = Handlebars.compile(`
{{#each suggestions}}
  <li>
      <button
        type="button"
        class="Suggestions-suggestion"
        data-js="suggestionButton"
        data-id={{id}}
        aria-label="{{name}}"
      >
        <span>{{{prefix}}}</span>
        <strong>{{{match}}}</strong>
        <span>{{{suffix}}}</span>
      </button>
  </li>
{{/each}}
`);

const formatSuggestion = (name, query) => {
  const match = name.match(new RegExp(query, 'i'));
  if (!match) {
    return { prefix: name };
  }
  const capture = match[0];
  const parts = name.split(capture);
  return {
    prefix: parts[0].replace(/\s/g, '&nbsp'),
    match: capture.replace(/\s/g, '&nbsp'),
    suffix: parts[1].replace(/\s/g, '&nbsp')
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
