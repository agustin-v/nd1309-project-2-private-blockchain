/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key){
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.get(key, function(err, value) {
                if (err) {
                    reject(err)
                }
                resolve(JSON.parse(value))
            })
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.put(key, JSON.stringify(value), function(err) {
                if (err) {
                    reject(err);
                }
                resolve(value);
            })
            // Add your code here, remember un Promises you need to resolve() or reject() 
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        return new Promise((resolve, reject) => {
            let length = 0;
            self.db.createReadStream()
            .on('data', (data) => {
                length++;
            })
            .on('error', (err) => {
                console.log('Error: ' + err);
                reject(err);
            })
            .on('close', () => {
                resolve(length);
            });
        });
    }
}


module.exports.LevelSandbox = LevelSandbox;