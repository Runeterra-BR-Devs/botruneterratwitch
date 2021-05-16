const jsonParser = require('../helpers/jsonLoader');

const path = require('path');

const dataset = jsonParser(path.resolve('./data/cards.json'));

const { formatCard } = require('../helpers/formatters');

module.exports = (args) => {
    const subdataset = dataset.filter(e => e.type != 'Habilidade');

    const randomIndex = Math.floor(Math.random() * subdataset.length);

    return formatCard(subdataset[randomIndex]);
};