import './searchHistory.css';
import searchHistoryEntryTemplate from './searchHistoryEntry.handlebars';

const searchHistoryListEl = document.getElementById('searchHistoryList');

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
