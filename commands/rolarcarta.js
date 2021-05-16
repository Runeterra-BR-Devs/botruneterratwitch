const { formatCard } = require('../helpers/formatters');
const axios = require('axios');

module.exports = async (args) => {

    try{
        const response = await axios.get('http://botruneterra.com.br:1337/random');

        return formatCard(response.data);
    } catch (e) {
        console.error(e);

        return 'Não encontrado';
    }
};