const https = require('https');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');
const jsonLoader = require('./helpers/jsonLoader');
const jsonWriter = require('./helpers/jsonWriter');
const rimraf = require('rimraf');

const packages = [
    'https://dd.b.pvp.net/latest/set1-lite-pt_br.zip',
    'https://dd.b.pvp.net/latest/set2-lite-pt_br.zip',
    'https://dd.b.pvp.net/latest/set3-lite-pt_br.zip',
    'https://dd.b.pvp.net/latest/set4-lite-pt_br.zip',
];

download = async url => {

    var dir = './temp';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const writer = fs.createWriteStream("./temp/package.zip");

    const response = await https.get(url, response => {
        response.pipe(writer);
    });

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
}

unzipIt = async file => {
    var reader = fs.createReadStream(file)
        .pipe(unzipper.Extract({
            path: path.resolve('./temp/unzipped')
        }));

    return new Promise((resolve, reject) => {
        reader.on('finish', resolve);
        reader.on('error', reject);
    })
}

copyArray = file => {
    return jsonLoader(file);
}

clean = () => {
    fs.unlinkSync('./temp/package.zip');
    rimraf.sync('./temp/unzipped');
}

execute = async () => {
    var dataset = [];

    for(var i = 0; i < packages.length; i++) {
        console.log('baixando pacote')

        await download(packages[i]);

        console.log('download ok');

        console.log('deszipando');

        await unzipIt('./temp/package.zip');

        console.log('deszipado!');

        console.log('carregando json e copiando array');

        const set = copyArray(path.resolve(`./temp/unzipped/pt_br/data/set${i+1}-pt_br.json`));

        dataset = dataset.concat(set);

        console.log('carregado!');

        console.log('limpando package');

        clean();

        console.log('feito');
    }

    console.log('Gravando dataset');

    jsonWriter(dataset, path.resolve('./data/cards.json'));

    console.log('Gravado!');


}


execute();