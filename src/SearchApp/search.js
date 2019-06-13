const cache = {};

const search = async query => {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=${query}`
    );
    const json = await response.json();
    if (json.status === 404) {
      return [];
    }
    return json.data;
  } catch {
    console.log('error');
    return [];
  }
};

export default async query => {
  if (!query) {
    return [];
  }
  if (cache[query]) {
    return cache[query];
  }
  const results = await search(query);
  cache[query] = results;
  return results;
};
