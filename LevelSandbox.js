/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB)



    // Get data from levelDB with key (Promise)
    getLevelDBData(key){
        let self = this;
        return new Promise(function(resolve, reject) {
            db.get(key, function(err, value) {
                if (err) {
                    reject(err)
                }
                resolve(value)
            })
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            db.put(key, value, function(err) {
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
        return new Promise(function(resolve, reject){
            let i = -1;
            db.createReadStream().on('data', function(data) {
                i++;
            }).on('error', function(err) {
                console.log('Error: ' + err);
                reject(err);
            }).on('close', function() {
                resolve(i);
            });
            // Add your code here, remember un Promises you need to resolve() or reject()
        });
    }
        


module.exports = {
    getBlocksCount,
    addLevelDBData,
    getLevelDBData
};