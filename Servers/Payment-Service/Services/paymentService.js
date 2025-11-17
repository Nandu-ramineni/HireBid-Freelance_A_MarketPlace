import web3 from '../Config/web3Config.js'

export const makePaymentTransaction = async(clientId,freelancerId,amount) => {
    try {
        const amountInWei = web3.utils.toWei(amount.toString(),'ether');
        const transaction = await web3.eth.sendTransaction({
            from: clientId,
            to: freelancerId,
            value: amountInWei,
            gas: 21000
        });
        return transaction.transactionHash;
    } catch (error) {
        console.log("Blockchain transaction failed",error);
    }
}