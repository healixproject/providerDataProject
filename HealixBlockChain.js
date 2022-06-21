

const SHA256 = require('crypto-js/sha256'); // Import Function for Hash


class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index ;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.CalculateHash();
    }

    CalculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{

    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock() {
        return new Block(0,"01/01/2021", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.CalculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.CalculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}


class Provider {

    constructor(name, specialtyType, providerNPI, practiceAddress, taxId, providerWarnings) {
        this.name = name ;
        this.specialtyType = specialtyType;
        this.providerNPI = providerNPI;
        this.taxId = taxId;
        this.providerWarnings = this.providerWarnings
    }
}


let providerBlockchain = new Blockchain();

providerBlockchain.addBlock(new Block(1, "02/01/2021", {ProviderTaxId: 1034534}));
providerBlockchain.addBlock(new Block(1, "03/01/2021", {ProviderTaxId: 1134533}));

console.log('Is blockchain valid?' + providerBlockchain.isChainValid());
console.log(JSON.stringify(providerBlockchain, null, 4));


//Attempt to change block without consesus protocol 

//Attempt 1: Try to manual change provider tax id within system
providerBlockchain.chain[1].data = { ProviderTaxId: 3897233};
console.log('Is blockchain valid?' + providerBlockchain.isChainValid());

//Attempt 2: Manual re-calculate hash
providerBlockchain.chain[1].hash = providerBlockchain.chain[1].CalculateHash();
console.log('Is blockchain valid?' + providerBlockchain.isChainValid());