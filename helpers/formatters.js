unitOutput = card => {
    return `${card.name} (Custo: ${card.cost}) -> ${card.attack}/${card.health} ${card.keywords.length >=1 ? '(' + card.keywords.join('/') + ')' : ''} ${card.description.replace(/<\/?[^>]+(>|$)/g, "")}`;
}

spellsOutput = card => {
    return `${card.name} (Custo: ${card.cost}) -> (${card.keywords.join('/')}) ${card.description.replace(/<\/?[^>]+(>|$)/g, "")}`;
}

landmarkOutput = card => {
    return `${card.name} (Custo: ${card.cost}) -> (${card.keywords.join('/')}) ${card.description.replace(/<\/?[^>]+(>|$)/g, "")}`;
}

formatCard = card => {
    switch(card.type) {
        case 'Unidade':
            return unitOutput(card);
        case 'Feitiço':
            return spellsOutput(card);
        case 'Monumento':
            return landmarkOutput(card);
        default:
            return card.description.replace(/<\/?[^>]+(>|$)/g, "");
    }
}

module.exports = {
    unitOutput: unitOutput,
    spellsOutput: spellsOutput,
    landmarkOutput: landmarkOutput,
    formatCard: formatCard
};