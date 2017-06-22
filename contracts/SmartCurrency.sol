pragma solidity ^0.4.4;


contract SmartCurrency {
    mapping (address => uint256) shares;
    mapping (address => uint256) balances;
    mapping (address => uint256) leaves;
    mapping (address => string)  User;
    mapping (address => string)  Credential;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Email(address sender,string email);
    event Password(address sender,string password);
    
    
    function SmartCurrency(){
        balances[tx.origin]= ResetCoin();
        leaves[tx.origin]= ResetLeave();
        shares[tx.origin]= ResetShare();          
    }

    function ResetCoin()returns (uint){
        
        return (balances[tx.origin]=1000);
        RefreshCoins();
    }
    
     function ResetShare()returns (uint){
        return (shares[tx.origin]=100);
        RefreshShares();
    }
    
    function ResetLeave()returns (uint){
        return (leaves[tx.origin]=100);
        RefreshLeaves();
    }
    
    
    function is_CoinsLow()internal returns (uint){
        
         if (balances[tx.origin] == 0 ){
            return (balances[tx.origin]=1000);

        }
    }
    function is_SharesLow()internal returns (uint){
        if (shares[tx.origin] == 0 ){
            return (shares[tx.origin]=100);
            
        }
    }    
    
    function is_LeavesLow()internal returns (uint){
        if (leaves[tx.origin] == 0 ){
           return (leaves[tx.origin]=100);
        }
    }
    
    function RefreshCoins()internal {
        if(now>= 60 seconds){
          is_CoinsLow();
        } 
        
    }
        
    function RefreshShares()internal {
        if(now>= 60 seconds){
           is_SharesLow();
        } 
    }
        
    function RefreshLeaves()internal {
        if(now>= 60 seconds){
           is_LeavesLow();
        } 
    }


    function RegisterUser(string email,string password)returns(bool) {
        User[msg.sender]=email;
        Credential[msg.sender]=password;
        Email(msg.sender,email);
        Password(msg.sender,password);
        return true;
    }
    
    function AddressGenerator()external returns (bytes20){
        uint256 lastBlockNumber = block.number - 1;
        bytes20 etheraddr = bytes20(block.blockhash(lastBlockNumber));
        return bytes20(etheraddr);
    }
    
    function AuthenticateUser(string _email,string _password)returns (bool) {
    bytes memory email = bytes(_email);
    bytes Email = bytes(User[msg.sender]);
    bytes memory password = bytes(_password);
    bytes Password = bytes(Credential[msg.sender]);
    if (email.length != Email.length )
    return false;
    for (uint i = 0; i < password.length; i ++)
    if (password[i]!= Password[i]){
    return false;
    }else{
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

