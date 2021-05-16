const tmi = require('tmi.js');

require('dotenv').config();

const options = {
    options: {
        debug: false
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: process.env.TMI_USERNAME,
        password: process.env.TMI_PASSWORD,
    },
    channels: [
        'dishark'
    ],
};

const client = new tmi.Client(options);

client.connect();

client.on('connected', (address, port) => {
    // client.say('dishark', 'Bot Runeterra online!');
    console.log('Bot tá on');
})


client.on('message', async (channel, user, message, self) => {
    if(self) return;

    const command = message.split(' ').shift() ?? message;
    const args = message.split(' ').splice(1);

    if(! command.startsWith('!')) {
        return;
    }

    try {

        const output = await require(`./commands/${command.substr(1)}`)(args);

        client.say(channel, output);
    } catch (e) {
        // comando não foi encontrado, não precisa de feedback no chat

    }
});