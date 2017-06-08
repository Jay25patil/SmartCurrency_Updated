pragma solidity ^0.4.4;


contract SmartCurrency {
    mapping (address => string) User;
    mapping (address => string) credential;
    mapping (address => string) log_in;
    mapping (address => string) usr;
    mapping (address => uint256) shares;
    mapping (address => uint256) balances;
    mapping (address => uint256) leaves;
    

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event LoginAttempt(address sender, string ethadress);
    event Register(address sender, string email);
    event Register1(address sender, string password);
    event username(address sender, string UserName);

    function SmartCurrency(){
        balances[tx.origin]=1000;
        leaves[tx.origin]=10;
        shares[tx.origin]=10;        
    }

    function RegisterUser(string email,string password) {
        User[msg.sender]=email;
        credential[msg.sender]=password;
        Register(msg.sender,email);
        Register1(msg.sender,password);
    }
    
    function AuthenticateUser(string _email,string _password)returns (bool) {
    bytes memory email = bytes(_email);
    bytes memory Register = bytes(User[msg.sender]);
    bytes memory password = bytes(_password);
    bytes memory Register1 = bytes(credential[msg.sender]);
    if (email.length != Register.length)
    return false;
    if (password.length != Register1.length)
    return false;
    for (uint i = 0; i < email.length; i ++)
    if (email[i]!= Register[i])
    return false;
    return true;
    }

    
    function CreateUser(string UserName){
        usr[msg.sender]=UserName;
        username(msg.sender,UserName);
        
    }
    
    function AuthenticateUserName(string _UserName)returns (bool) {
    bytes memory UserName = bytes(_UserName);
    bytes memory username = bytes(usr[msg.sender]);
    if (UserName.length != username.length)
    return false;
    for (uint i = 0; i < UserName.length; i ++)
    if (UserName[i]!= username[i])
    return false;
    return true;
    }

    function Login(string Ethadress){
       log_in[msg.sender]=Ethadress;
       LoginAttempt(msg.sender, Ethadress);
        
    }
    
    function AuthenticateLogin(string _ethadress)returns (bool) {
    bytes memory Ethadress = bytes(_ethadress);
    bytes memory LoginAttempt = bytes(log_in[msg.sender]);
    if (Ethadress.length != LoginAttempt.length)
    return false;
    for (uint i = 0; i < Ethadress.length; i ++)
    if (Ethadress[i]!= LoginAttempt[i])
    return false;
    return true;
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

