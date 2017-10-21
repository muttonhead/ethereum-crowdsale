pragma solidity ^0.4.15;

import {Owned} from './Owned.sol';

contract Token is Owned {
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

	function _transfer(address _from, address _to, uint _value) internal {
		require(_to != 0x0);
		require(balanceOf[_from] > _value);
		require(balanceOf[_to] + _value > balanceOf[_to]);
		//require(!frozenAccount(_from));
		//require(!frozenAccount(_to));
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		Transfer(_from, _to, _value);
	}

	// Transfer coins to another address
	function transfer(address _to, uint256 _value) public {
		_transfer(msg.sender, _to, _value);
	}
}
