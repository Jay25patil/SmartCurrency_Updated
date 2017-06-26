pragma solidity ^0.4.4;


    contract SmartCurrency {
    mapping (address => uint256) shares; // stores data into contract address.
    mapping (address => uint256) balances;
    mapping (address => uint256) leaves;
    mapping (address => string)  User_Email;
    mapping (address => string)  User_Password;
    mapping ( address => Usr )   Users;

    address[] usersByAddress; //users will be stored in address array.
    
     
    // struct group several variables
    struct Usr {
    string email;
    string password;
    string ethereum_address;
    
  }
    //events invoked when the function is called

    event Transfer(address indexed _from, address indexed _to, uint256 _value); //transfer amount from to receiver 
    event Email(address sender,string email); // sends userinput from senders address.
    event Password(address sender,string password); // sends userinput from senders address.
    
    // stores the coin details
    function Storage(){
        balances[tx.origin]= ResetCoin();
        leaves[tx.origin]= ResetLeave();
        shares[tx.origin]= ResetShare();          
    }

    //this function resets the coin balance 
    function ResetCoin()returns (uint){
        
        return (balances[tx.origin]=1000);
        RefreshCoins();
    }
        
    //this function resets the shares balance 

     function ResetShare()returns (uint){
        return (shares[tx.origin]=100);
        RefreshShares();
    }
    
        
    //this function resets the Leaves balance 

    function ResetLeave()returns (uint){
        return (leaves[tx.origin]=100);
        RefreshLeaves();
    }
    
    // gets called when the coins are 0.
    function is_CoinsLow()internal returns (uint){
        
         if (balances[tx.origin] == 0 ){
            return (balances[tx.origin]=1000);

        }
    }

    // gets called when the Shares are 0.
    function is_SharesLow()internal returns (uint){
        if (shares[tx.origin] == 0 ){
            return (shares[tx.origin]=100);
            
        }
    }    
    
    // gets called when the Leaves are 0.
    function is_LeavesLow()internal returns (uint){
        if (leaves[tx.origin] == 0 ){
           return (leaves[tx.origin]=100);
        }
    }
    
    // gets called internally when coins are low.
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

    function RegisterUser(string email, string password, string ethereum_address) returns (bool success) {
        address NewUser = msg.sender; //stores the new users details in address.
        if(bytes(Users[msg.sender].email).length == 0 && bytes(email).length != 0){ //this lines checks that email exist or not.
        Users[NewUser].email = email; //users email gets stored in mapping user with the help of address NewUser.
        Users[NewUser].password = password;
        Users[NewUser].ethereum_address = ethereum_address;
        usersByAddress.push(NewUser);  //stores in contract address.
        return true;
        } else {
        return false; // either email was null, or a user with this email already existed
         }
         }
    
    function AddressGenerator()external returns (bytes20){
        uint256 lastBlockNumber = block.number - 1; // checks last block number of contract.
        bytes20 etheraddr = bytes20(block.blockhash(lastBlockNumber)); //blockhash converts the block number into ethereum address.
        return bytes20(etheraddr); //returns ethereum address.
    }
    
    function AuthenticateUser(string _email,string _password)returns (bool) {
    bytes memory email = bytes(_email); // stores users input in memory. 
    bytes Email = bytes(User_Email[msg.sender]); // returns registered users email.
    bytes memory password = bytes(_password);// stores users input in memory.
    bytes Password = bytes(User_Password[msg.sender]);// returns registered users email.
    if (email.length != Email.length ) // Compares length of email.
    return false;
    for (uint i = 0; i < password.length; i ++)
    if (password[i]!= Password[i]){ //Compares pasword by index.
    return false;
    }else{
    return true;
    }
    }

    
    function SendCoins(address receiver,uint amount)returns(bool sufficient){
        if (balances[msg.sender] < amount) return false; // checks balance is not 0.
        balances[msg.sender] -= amount; // deducts  balance from Sender.
        balances[receiver] += amount; // increments  balance of  receiver.
        Transfer(msg.sender, receiver, amount); // event transfer gets called.
        return true;
    }

    
    function getBalance(address addr) returns(uint) {
        return balances[addr]; // returns balance of reciever.
    }
     
    
    function SendShares(address receiver,uint amount)returns(bool sufficient){
        if (shares[msg.sender] < amount) return false; // checks shares is not 0.
        shares[msg.sender] -= amount;  // deducts  balance from Sender.
        shares[receiver] += amount;  // increments  balance of  receiver.
        Transfer(msg.sender, receiver, amount); // event transfer gets called.
        return true;
    }

    
    function checkshares(address addr) returns(uint) {
        return shares[addr]; // returns shares  balance of reciever.
    }

    function GrantLeaves(address receiver,uint amount)returns(bool sufficient){
         if(leaves[msg.sender] < amount) return false; // checks Leaves is not 0.
         leaves[msg.sender] -= amount; // deducts  balance from Sender.
         leaves[receiver] += amount;  // increments  balance of  receiver.
         Transfer(msg.sender, receiver, amount); // event transfer gets called.
         return true;
        
    }
    
    function checkleaves(address addr) returns(uint) {        
        return leaves[addr]; // returns Leaves  balance of reciever.
    }

}   

