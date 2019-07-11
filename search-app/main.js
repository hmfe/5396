import search from './modules/search.js';
import renderSuggestions from './modules/suggestions.js';
import renderResult from './modules/result.js';
import {
  init as initSearchHistory,
  appendSearchHistory
} from './modules/searchHistory.js';

const searchFormEl = document.querySelector('[data-js="searchForm"]');
const searchInputEl = searchFormEl.querySelector('input');
let requestCount = 0;

const selectResult = result => {
  renderSuggestions([]);
  renderResult(result);
  searchInputEl.value = '';
  appendSearchHistory(result);
};

const handleQueryChange = async event => {
  const query = event.target.value;
  const requestId = ++requestCount;
  const suggestions = await search(query);

  // Only render suggestions if this was the latest request fired.
  if (requestCount === requestId) {
    renderSuggestions(suggestions, query, selectResult);
  }
};

const handleSubmit = async event => {
  event.preventDefault();
  const results = await search(event.target.query.value);
  selectResult(results[0]);
};

initSearchHistory();
searchFormEl.addEventListener('submit', handleSubmit);
searchInputEl.addEventListener('input', handleQueryChange);
