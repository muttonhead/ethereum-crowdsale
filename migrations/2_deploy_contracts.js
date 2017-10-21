var Token = artifacts.require('./Token.sol');

module.exports = function(deployer) {
	const initialSupply = new web3.BigNumber(10000);
	deployer.deploy(Token, initialSupply, 'TokenTest', 'TT', 2, '0x0');
};
