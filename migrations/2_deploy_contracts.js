var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");
require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
   let addr= await web3.eth.getAccounts();
   await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
   await deployer.deploy(KycContract);
   await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address );
   let instance = await MyToken.deployed();
   await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS)
};
