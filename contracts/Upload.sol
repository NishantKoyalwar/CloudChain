// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Upload {
  

  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  
  function add(address _user,string memory url) external {
        ownership[msg.sender][_user] = true;
      value[_user].push(url);
    }
  function greet() public pure returns(string memory){
    return "hello";
  }
    function display(address _user) external view returns(string[] memory){
      return value[_user];
  }

  
  
}