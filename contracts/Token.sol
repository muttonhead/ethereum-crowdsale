pragma solidity ^0.4.15;

contract Token {
	// Configuration
	string public name;
	string public symbol;
	uint8 public decimals;

	// Mapping of balances
	mapping (address => uint256) public balanceOf;

	// Events
	event Transfer(address indexed from, address indexed to, uint256 value);

	function Token(uint256 initialSupply, string _name, string _symbol, uint8 _decimals) public {
		balanceOf[msg.sender] = initialSupply;
		name = _name;
		symbol = _symbol;
		decimals = _decimals;
	}

	// Transfer coins to another address
	function transfer(address _to, uint256 _value) {
		// Check that the sender has enough tokens and for overflows
		require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);

		// Send the tokens
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;

		// Notify listeners
		Transfer(msg.sender, _to, _value);
	}
}
