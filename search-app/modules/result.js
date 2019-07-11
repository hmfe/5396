const resultEl = document.getElementById('result');

const resultTemplate = Handlebars.compile(`
    <a href={{scryfall_uri}} target='_blank' rel='noopener noreferrer'>
      <h3>{{name}}</h3>
    </a>
    <img
      class="Result-image"
      src={{image_uris.normal}}
      alt="{{altText}}"
    />
`);

const render = result => {
  resultEl.innerHTML = resultTemplate({
    ...result,
    altText: `${result.name}. ${result.mana_cost}. ${result.type_line}. ${
      result.oracle_text
    }`
  });
};

export default render;
