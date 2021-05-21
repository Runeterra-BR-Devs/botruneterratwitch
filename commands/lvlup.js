const { lvlUpOutput } = require('../helpers/formatters')
const axios = require('axios');

module.exports = async (args) => {
    const cardName = args.join(' ');

    try{
        const response = await axios.get('http://botruneterra.com.br:1337/lvlup/' + encodeURI(cardName));

        return lvlUpOutput(response.data);
    } catch (e) {
        console.error(e);

        return 'Não encontrado';
    }
}