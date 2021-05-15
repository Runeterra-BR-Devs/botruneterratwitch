const jsonParser = require('../helpers/jsonLoader');

const path = require('path');

const dataset = jsonParser(path.resolve('./data/cards.json'));

unitOutput = card => {
    return `${card.name} (Custo: ${card.cost}) -> ${card.attack}/${card.health} (${card.keywords.join('/')}) ${card.description.replace(/<\/?[^>]+(>|$)/g, "")}`;
}

spellsOutput = card => {
    return `${card.name} (Custo: ${card.cost}) -> (${card.keywords.join('/')}) ${card.description.replace(/<\/?[^>]+(>|$)/g, "")}`;
}

module.exports = (args) => {
    const cardName = args.join(' ');

    try{
        const card = dataset.find(e => {
            return e.name.toLowerCase() == cardName.toLowerCase();
        });

        switch(card.type) {
            case 'Unidade':
                return unitOutput(card);
            case 'Feitiço':
                return spellsOutput(card);
            default:
                return card.description.replace(/<\/?[^>]+(>|$)/g, "");
        }
    } catch (e) {
        console.error(e);

        return 'Não encontrado';
    }
}