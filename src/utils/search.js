const cache = {};

export default async query => {
  if (!query) {
    return [];
  }
  if (cache[query]) {
    return cache[query];
  }
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=${window.encodeURIComponent(
        query
      )}`
    );
    const json = await response.json();
    if (json.status === 404) {
      return [];
    }
    const results = json.data;
    cache[query] = results;
    return results;
  } catch {
    console.log('error');
    cache[query] = [];
    return [];
  }
};
