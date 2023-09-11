require('dotenv').config();

const web3 = require('web3');
const apiKey =process.env['apikey']
const network = 'goerli';

const node =`https://app.zeeve.io/shared-api/eth/6e70c02075bcca62f49e95abfcd7123b948eaaec46ce666f/`

const Web3 = new web3(node)

//console.log(web3)

const accountTo = web3.eth.accounts.create();
//console.log(accountTo);
//console.log(accountTo.address)
const privateKey = process.env['privateKey'];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
//console.log(accountFrom)

const createSignedTx = async(rawTx) => {
    rawTx.gas = await web3.eth.accounts.estimatedGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

const sendSignedTx = async(signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}
const amountTo="0.01"
    const rawTx = {
        to:accountTo.address,
        value:web3.utils.toWei(amountTo, "ether")
    }
createSignedTx(rawTx).then(sendSignedTx)

