const colors = require('ansi-colors');
const Prompt = require('../../lib/prompts/select');
const symbols = require('../../lib/style/symbols');
const emoji = { pending: '🎃 ', cancelled: '⚰️ ', answered: '💀 ' };

const prompt = new Prompt({
  name: 'halloween',
  message: 'Trick or treat! Take your pick',
  choices: [
    { name: 'candy', value: 'Sweet!' },
    { name: 'apple', value: 'Hard... core?' },
    { name: 'toothpaste', value: 'Orange juice?' },
    { name: 'insult', value: 'You stink!' },
    { name: 'razor blade', value: 'Ouch!' }
  ],
  styles: {
    primary: colors.blue,
    muted: colors.yellow,
  },
  symbols: {
    radio: {
      on: state => ['🍬', '🍎', '👄', '🖕'][state.index],
      off: '  '
    }
  },
  elements: {
    prefix: (state, status) => emoji[status],
    pointer(state, status, choice, prompt) {
      let symbol = prompt.symbols.radio[status];
      let fallback = status === 'on' ? '🗡️ ' : '  ';
      if (typeof symbol === 'function') {
        return symbol(...arguments) || fallback;
      }
      return symbol || fallback;
    },
  }
});

prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(err => console.error('TERMINATED'));