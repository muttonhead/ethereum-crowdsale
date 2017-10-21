var Token = artifacts.require('Token');

contract('Owned', (accounts) => {
	var owner = accounts[0];
	var tokenInstance;

	before((done) => {
		Token.deployed().then((instance) => {
			tokenInstance = instance;
			done();
		});
	});

	it('should set owner', (done) => {
		tokenInstance.owner.call().then((tokenOwner) => {
			assert.equal(tokenOwner, owner);
			done();
		});
	});

	it('should be able to transfer ownership', (done) => {
		tokenInstance.transferOwnership(accounts[1])
		.then(() => {
			return tokenInstance.owner.call();
		}).then((tokenOwner) => {
			assert.equal(tokenOwner, accounts[1]);
			done();
		});
	});

	it('should require owner to transfer ownership', (done) => {
		tokenInstance.transferOwnership(accounts[2])
		.catch((error) => {
			assert.isOk(error);
			return tokenInstance.owner.call();
		}).then((tokenOwner) => {
			assert.equal(tokenOwner, accounts[1]);
			done();
		});
	});
});
