const fs = require('fs');

module.exports = (json, file) => {
    let data = JSON.stringify(json);
    fs.writeFileSync(file, data);
}