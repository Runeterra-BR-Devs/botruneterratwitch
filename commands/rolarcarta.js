const jsonParser = require('../helpers/jsonLoader');

const path = require('path');

const dataset = jsonParser(path.resolve('./data/cards.json'));

const { formatCard } = require('../helpers/formatters');

module.exports = (args) => {
    const randomIndex = Math.floor(Math.random() * dataset.length);

    return formatCard(dataset[randomIndex]);
};