pragma solidity ^0.4.4;

    
    contract SmartCurrency {
    mapping (address => uint256) public shares; // stores data into contract address.
    mapping (address => uint256) public balances;
    mapping (address => uint256) public leaves;
    mapping (address => uint256) public Usershares; // stores data into contract address.
    mapping (address => uint256) public Userbalances;
    mapping (address => uint256) public Userleaves;
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
   function SmartCurrency(){
        balances[tx.origin]= Resetbalance();
        leaves[tx.origin]= ResetLeaves();
        shares[tx.origin]= ResetShares(); 
        Userbalances[tx.origin]=0;
        Userleaves[tx.origin]=0;
        Usershares[tx.origin]=0;      
    }

    function Resetbalance() returns (uint balance){
        if(balances[msg.sender]<1){
        balance=balances[msg.sender]+=1000;
        return balance;
        }
        
    } 
    
    function ResetShares() returns (uint share){
        if(shares[msg.sender]<1){
            share=shares[msg.sender]+=100;
        }
    }
    
    
    function ResetLeaves()returns (uint leave){
        if (leaves[msg.sender]<1){
            leave=leaves[msg.sender]+=100;
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
    function SendCoinsUser(address receiver,uint amount)returns(bool sufficient){
        if (Userbalances[msg.sender] < amount) return false; // checks balance is not 0.
        Userbalances[msg.sender] -= amount; // deducts  balance from Sender.
        Userbalances[receiver] += amount; // increments  balance of  receiver.
        Transfer(msg.sender, receiver, amount); // event transfer gets called.
        return true;
    }
    
    function getBalance(address addr) returns(uint) {
        return balances[addr]; // returns balance of reciever.
       
   }
     
     function getUserBalance(address addr) returns(uint){
         return Userbalances[addr];
     }
    
    function SendShares(address receiver,uint amount)returns(bool sufficient){
        if (shares[msg.sender] < amount) return false; // checks shares is not 0.
        shares[msg.sender] -= amount;  // deducts  balance from Sender.
        shares[receiver] += amount;  // increments  balance of  receiver.
        Transfer(msg.sender, receiver, amount); // event transfer gets called.
        return true;
    }

    function SendSharesUser(address receiver,uint amount)returns(bool sufficient){
        if (Usershares[msg.sender] < amount) return false; // checks shares is not 0.
        Usershares[msg.sender] -= amount;  // deducts  balance from Sender.
        Usershares[receiver] += amount;  // increments  balance of  receiver.
        Transfer(msg.sender, receiver, amount); // event transfer gets called.
        return true;
    }
    
    function checkshares(address addr) returns(uint) {
        return shares[addr]; // returns shares  balance of reciever.
    }

    function checkUsershares(address addr) returns(uint) {
        return Usershares[addr]; // returns shares  balance of reciever.
    }

    function GrantLeaves(address receiver,uint amount)returns(bool sufficient){
         if(leaves[msg.sender] < amount) return false; // checks Leaves is not 0.
         leaves[msg.sender] -= amount; // deducts  balance from Sender.
         leaves[receiver] += amount;  // increments  balance of  receiver.
         Transfer(msg.sender, receiver, amount); // event transfer gets called.
         return true;
        
    }
    function GrantLeavesUser(address receiver,uint amount)returns(bool sufficient){
         if(Userleaves[msg.sender] < amount) return false; // checks Leaves is not 0.
         Userleaves[msg.sender] -= amount; // deducts  balance from Sender.
         Userleaves[receiver] += amount;  // increments  balance of  receiver.
         Transfer(msg.sender, receiver, amount); // event transfer gets called.
         return true;
        
    }
    
    function checkleaves(address addr) returns(uint) {        
        return leaves[addr]; // returns Leaves  balance of reciever.
    }
    function checkUserleaves(address addr) returns(uint) {        
        return Userleaves[addr]; // returns Leaves  balance of reciever.
    }
}   

