import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL));
console.log("Private Key:", process.env.PRIVATE_KEY);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;


export default web3;