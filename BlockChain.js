/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Auxiliar method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock(){
        let self = this;
        let block = new Block('Genesis block');
        block.time = new Date().getTime().toString().slice(0,-3);
        block.hash = SHA256(JSON.stringify(newBlock)).toString();
        self.db.addLevelDBData(block.height, block)
        .then(value => {
            console.log(`New block added: ${value.toString()}`)
        })
        .catch(err => {
            console.log(`${err.message}`)
        })
    }

    // Get block height, it is auxiliar method that return the height of the blockchain
    getBlockHeight() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.db.getBlocksCount().then(currentLength => {
                resolve(currentLength);
            }).catch(err => {
                reject(new Error(`${err.message}`));
            });
        });
    }

    // Add new block
    addBlock(block) {
        let self = this;
        block.time = new Date().getTime().toString().slice(0,-3);
        return new Promise((resolve, reject) => {
            self.db.getBlocksCount()
            .then(length => {
                block.height = length;
                self.db.getLevelDBData(length -1)
                .then(previousBlock => {
                    block.previousBlockHash = previousBlock.hash;
                    block.hash = SHA256(JSON.stringify(newBlock)).toString();
                    self.db.addLevelDBData(block.height, block)
                    .then(value => {
                        console.log(`New block added: ${value.toString()}`)
                    })
                    .catch(err => {
                        console.log(`${err.message}`)
                    })
                })
                .catch(err => console.log(err))
            })
            .catch( err => {
                console.log(`${err.message}`)
            })
        })
        

        // Add your code here
    }

    // Get Block By Height
    getBlock(height) {
        // Add your code here
        return new Promise((resolve, reject) => {
            this.chain.getBlock(blockHeight).then(block => {
                resolve(block);
            }).catch(err => {
                reject(new Error(`${err.message}`));
            });
});
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // Add your code here
    }

    // Validate Blockchain
    validateChain() {
        // Add your code here
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }

}

module.exports.Blockchain = Blockchain;