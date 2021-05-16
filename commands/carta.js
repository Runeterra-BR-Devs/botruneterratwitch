const jsonParser = require('../helpers/jsonLoader');

const path = require('path');

const dataset = jsonParser(path.resolve('./data/cards.json'));

const { formatCard } = require('../helpers/formatters')

module.exports = (args) => {
    const cardName = args.join(' ');

    try{
        const card = dataset.find(e => {
            return e.name.toLowerCase() == cardName.toLowerCase();
        });

        return formatCard(card);
    } catch (e) {
        console.error(e);

        return 'Não encontrado';
    }
}