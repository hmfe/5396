import template from './result.handlebars';
import './result.css';

const resultEl = document.getElementById('result');

const render = result => {
  resultEl.innerHTML = template({
    ...result,
    altText: `${result.name}. ${result.mana_cost}. ${result.type_line}. ${
      result.oracle_text
    }`
  });
};

export default render;
