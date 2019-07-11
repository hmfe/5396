import search from './utils/search';
import renderSuggestions from './components/suggestions';
import renderResult from './components/result';
import {
  init as initSearchHistory,
  appendSearchHistory
} from './components/searchHistory';
import './index.css';

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
