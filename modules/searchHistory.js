const searchHistoryListEl = document.getElementById('searchHistoryList');

const searchHistoryEntryTemplate = Handlebars.compile(`
  <li data-timestamp={{timestamp}} class="SearchHistory-entry">
    <div class="SearchHistory-entryName">{{name}}</div>
    <div>{{formattedTime}}</div>
    <button data-js="searchHistoryEntryDeleteButton" aria-label="Delete">✕</button>
  </li>
`);

const clearSearchHistory = () => {
  searchHistoryListEl.innerHTML = '';
};

const init = () => {
  document
    .querySelector('[data-js="clearSearchHistoryButton"]')
    .addEventListener('click', clearSearchHistory);
};

const appendSearchHistory = result => {
  const timestamp = new Date();
  searchHistoryListEl.insertAdjacentHTML(
    'beforeend',
    searchHistoryEntryTemplate({
      id: result.id,
      name: result.name,
      timestamp: timestamp.getTime(),
      formattedTime: timestamp.toLocaleString()
    })
  );

  const entryEl = document.querySelector(
    `[data-timestamp="${timestamp.getTime()}"]`
  );

  entryEl
    .querySelector('[data-js="searchHistoryEntryDeleteButton"]')
    .addEventListener('click', () => entryEl.remove());
};

export { init, appendSearchHistory };
