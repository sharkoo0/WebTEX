const fs = require('fs');

function writeFilePromise(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (error) => {
            if (error) {
                reject(error);
            }
            resolve;
        })
    });
}

function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, buffer) => {
            if (error) {
                reject(error);
                return;
            }
            const result = buffer.toString();
            resolve(result);
        });
    });
}

module.exports = {
    readFilePromise,
    writeFilePromise
}