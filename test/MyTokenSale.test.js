const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

require('dotenv').config({path: '../.env'});

contract("TokenSale Test", async(accounts)=> {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("No token should be found in the deployerAccount", async ()=>{
        let instance = await Token.deployed();
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all coins should be in the tokensale smart contract", async () => {
       let instance = await Token.deployed();
       let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
       let totalSupply = await instance.totalSupply();
       return await expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
});

   it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
    let tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let kycInstance = await KycContract.deployed();
    let balanceBeforeAccount = await tokenInstance.balanceOf(deployerAccount);

    await kycInstance.setKycCompleted(deployerAccount, { from: deployerAccount });
    await expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
    return await expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf(deployerAccount));

});

});