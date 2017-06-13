pragma solidity ^0.4.4;


contract SmartCurrency {
    mapping (address => uint256) shares;
    mapping (address => uint256) balances;
    mapping (address => uint256) leaves;
    mapping (address => string)  User;
    mapping (address => string)  Credential;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Register(address sender,string email);
    event Register1(address sender,string password);
    event username(address sender, string UserName);

    function SmartCurrency(){
        balances[tx.origin]=1000;
        leaves[tx.origin]=10;
        shares[tx.origin]=10;        
    }

    function RegisterUser(string email,string password)returns(bool) {
        User[msg.sender]=email;
        Credential[msg.sender]=password;
        Register(msg.sender,email);
        Register1(msg.sender,password);
        return true;
    }
    
    function AuthenticateUser(string _email,string _password)returns (bool) {
    bytes memory email = bytes(_email);
    bytes Register = bytes(User[msg.sender]);
    bytes memory password = bytes(_password);
    bytes Register1 = bytes(Credential[msg.sender]);
    if (email.length != Register.length && password.length != Register1.length)
    return false;
    for (uint i = 0; i < password.length; i ++)
    if (password[i]!= Register1[i] && email[i]!=Register[i]){
    return false;
    }
    else{
    return true;
    }
    }
    
    function SendCoins(address receiver,uint amount)returns(bool sufficient){
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Transfer(msg.sender, receiver, amount);
        return true;
    }

    
    function getBalance(address addr) returns(uint) {
        return balances[addr];
    }
     
    function SendShares(address receiver,uint amount)returns(bool sufficient){
        if (shares[msg.sender] < amount) return false;
        shares[msg.sender] -= amount;
        shares[receiver] += amount;
        Transfer(msg.sender, receiver, amount);
        return true;
    }

    
    function checkshares(address addr) returns(uint) {
        return shares[addr];
    }

    function GrantLeaves(address receiver,uint amount)returns(bool sufficient){
         if(leaves[msg.sender] < amount) return false;
         leaves[msg.sender] -= amount;
         leaves[receiver] += amount;
         Transfer(msg.sender, receiver, amount);
         return true;
        
    }
    
    function checkleaves(address addr) returns(uint) {        
        return leaves[addr];
    }

}   

