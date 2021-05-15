const fs = require('fs');

module.exports = filename => {
    try {
        let rawData = fs.readFileSync(filename);
        return JSON.parse(rawData);
    } catch (e) {
        console.error(e);
        return [];
    }
}