var Token = artifacts.require('Token');

contract('Token', (accounts) => {
	const DECIMALS = 2;
	const NAME = "TokenTest";
	const INITIAL_SUPPLY = 10000;
	const SYMBOL = "TT";

	var owner = accounts[0];
	var tokenInstance;

	before((done) => {
		Token.deployed().then((instance) => {
			tokenInstance = instance;
			done();
		});
	});

	it('should initialize with constructor parameters', (done) => {
		tokenInstance.name.call().then((name) => {
			assert.equal(name, NAME);
			return tokenInstance.symbol.call();
		}).then((symbol) => {
			assert.equal(symbol, SYMBOL);
			return tokenInstance.decimals.call();
		}).then((decimals) => {
			assert.equal(decimals, DECIMALS);
			return tokenInstance.balanceOf(owner);
		}).then((balance) => {
			assert.equal(balance.toNumber(), INITIAL_SUPPLY);
			done();
		});
	});

	it('should throw an error when transferring more tokens than the owner has', (done) => {
		tokenInstance.transfer(accounts[1], INITIAL_SUPPLY + 1).then(() => {
			assert.fail();
		}).catch((error) => {
			assert.isOk(error);
			done();
		});
	});

	it('should transfer tokens between accounts', (done) => {
		const amount = 100;
		tokenInstance.transfer(accounts[1], amount).then((receipt) => {
			assert.equal(receipt.logs.length, 1);
			const log = receipt.logs[0];
			assert.equal(log.event, "Transfer");
			assert.equal(log.args.from, owner);
			assert.equal(log.args.to, accounts[1]);
			assert.equal(log.args.value, amount);
			return tokenInstance.balanceOf(owner);
		}).then((balance) => {
			assert.equal(balance.toNumber(), INITIAL_SUPPLY - amount);
			return tokenInstance.balanceOf(accounts[1]);
		}).then((balance) => {
			assert.equal(balance.toNumber(), amount);
			done();
		});
	});
});
