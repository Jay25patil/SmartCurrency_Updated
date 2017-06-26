// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";


// Import libraries we need.
import {
    default as Web3
} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import smartcurrency_artifacts from '../../build/contracts/SmartCurrency.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var SmartCurrency = contract(smartcurrency_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
    start: function() {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        //MetaCoin.setProvider(web3.currentProvider);
        SmartCurrency.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];


            self.refreshBalance();
            self.refreshShares();
            self.refreshLeaves();
            //  self.refreshBalance3();
            // self.accountStatus();
        });
    },

    setStatus: function(message) {
        var status = document.getElementById("status");
        status.innerHTML = message;
    },

    refreshBalance: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.getBalance.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("balance");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },
    refreshShares: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.checkshares.call(account, {
                from: account
            });
        }).then(function(value) {
            var share_element = document.getElementById("shares");
            share_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },
    refreshLeaves: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.checkleaves.call(account, {
                from: account
            });
        }).then(function(value) {
            var leave_element = document.getElementById("leaves");
            leave_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },
    refreshBalance3: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.AuthenticateUser.call(account, {
                from: account
            });
        }).then(function(value) {
            var email_element = document.getElementById("emailsignup");
            email_element.innerHTML = value.valueOf();
            var password_element = document.getElementById("passwordsignup");
            password_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            //console.log(e);
            self.setStatus("E");
        });
    },

    // RegisterUser: function() {
    //     var self = this;

    //     var email = document.getElementById("emailsignup").value;
    //     var password = document.getElementById("passwordsignup").value;
    //     var ethereum_address = document.getElementById("address").value;
    //     var dataString = { "email": "email", "password": "password", "ethaddress": "ethaddress" };

    //     console.log("email :" + email);
    //     console.log("password :" + password);
    //     console.log("ethereum_address :" + ethereum_address);
    //     this.setStatus("Initiating Registration... (please wait)");

    //     var rapid;
    //     SmartCurrency.deployed().then(function(instance) {
    //         rapid = instance;
    //         var returnRegisterValue = rapid.RegisterUser.call(email, password, ethereum_address, {
    //             from: account
    //         });
    //         console.log("returnRegisterValue:" + returnRegisterValue);
    //         return returnRegisterValue;
    //     }).then(function(value) {
    //         console.log("value :" + value);

    //         if (value == true) {
    //             window.location.href = "http://login.com";
    //             alert("Registration Successfull!.... Please Login");
    //             //self.redirect('Employee.html');
    //         } else {
    //             alert("Registration Unsuccessfull!");
    //             window.location.href = "http://template.com";

    //         }

    //         //self.redirect('/Login.html');
    //     }).catch(function(e) {
    //         //console.log(e);
    //         self.setStatus("User Already Exist! Try Diffrent Email");
    //     });
    // },
    RegisterUser: function() {
        var http = new XMLHttpRequest();
        var url = "http://localhost:8080/smartcurrency/user/create";
        // var data = "email" + email & "password" + password & "ethaddress" + ethaddress;
        var email = encodeURIComponent(document.getElementById("emailsignup").value)
        console.log("email :" + email);
        var password = encodeURIComponent(document.getElementById("passwordsignup").value)
        var addresss = encodeURIComponent(document.getElementById("address").value)
        var parameters = "name" + email + "&password=" + password + "&address" + addresss
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() { //Call a function when the state changes.
                if (http.readyState == 4 && http.status == 200) {
                    alert(http.responseText);
                }
            }
            // xhr.send('user=person&pwd=password&organization=place&requiredkey=key');
        http.send(parameters);
    },

    AddressGenerator: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.AddressGenerator.call(account, {
                from: account
            });
        }).then(function(value) {
            var address_receiver = document.getElementById("address");
            address_receiver.innerHTML = value.valueOf();
            // alert("Keep Your Account Number Safe");
        }).catch(function(e) {
            console.log(e);

        });
    },

    AuthenticateUser: function LogIn() {
        var self = this;
        var _email = document.getElementById("emailsignup").value;
        var _password = document.getElementById("passwordsignup").value;
        console.log("email :" + _email);
        console.log("password :" + _password);
        this.setStatus("Initiating ... please wait");

        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;

            var returnValue = rapid.AuthenticateUser.call(_email, _password, {

                from: account

            });
            console.log("ReturnValue: " + returnValue);
            return returnValue;
        }).then(function(value) {
            console.log("value :" + value);
            if (value == true) {
                alert("Login Unsuccessfull!");
                //self.redirect('Employee.html');
            } else {
                alert("Login Successfull!");
            }


            //self.redirect('/Employee');

            //self.refreshBalance3();

        }).catch(function(value) {
            console.log(value);
            self.setStatus("User Doesn't Exist. Register First");
        });
    },

    ResetCoins: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.ResetCoin.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("balance");
            balance_element.innerHTML = value.valueOf();
            //self.refreshBalance();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },

    ResetShares: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.ResetShare.call(account, {
                from: account
            });
        }).then(function(value) {
            var share_element = document.getElementById("shares");
            share_element.innerHTML = value.valueOf();
            //self.refreshShares();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },
    ResetLeaves: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.ResetLeave.call(account, {
                from: account
            });
        }).then(function(value) {
            var leave_element = document.getElementById("leaves");
            leave_element.innerHTML = value.valueOf();
            //self.refreshLeaves();

        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },


    SendCoins: function() {
        var self = this;

        var amount = parseInt(document.getElementById("CoinAmount").value);
        var receiver = document.getElementById("sendCoinReceiver").value;

        this.setStatus("Initiating transaction... (please wait)");

        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            return rapid.SendCoins(receiver, amount, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("SendCoins");
            balance_element.innerHTML = value.valueOf();
            self.setStatus("Transaction complete!");
            self.refreshBalance();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });
    },

    checkBalance: function() {
        var self = this;
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var coinAddress = document.getElementById("coinReceiver").value;

            console.log("Coin Address: " + coinAddress);
            return rapid.getBalance.call(coinAddress, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("checkBalance");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },

    SendShares: function() {
        var self = this;

        var amount = parseInt(document.getElementById("ShareAmount").value);
        var receiver = document.getElementById("sendShareReceiver").value;

        this.setStatus("Initiating transaction... (please wait)");

        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            return rapid.SendShares(receiver, amount, {
                from: account
            });
        }).then(function(value) {
            self.setStatus("Transaction complete!");
            self.refreshShares();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });
    },

    checkShares: function() {
        var self = this;
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var shareAddress = document.getElementById("shareReceiver").value;

            console.log("Share Address: " + shareAddress);
            return rapid.checkshares.call(shareAddress, {
                from: account
            });
        }).then(function(value) {
            var share_element = document.getElementById("sharesBalance");
            share_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },

    GrantLeaves: function() {
        var self = this;

        var amount = parseInt(document.getElementById("LeaveAmount").value);
        var receiver = document.getElementById("sendLeaveReceiver").value;

        this.setStatus("Initiating transaction... (please wait)");
        console.log("Leave Sending: " + receiver + " " + amount);

        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            return rapid.GrantLeaves(receiver, amount, {
                from: account
            });
        }).then(function(value) {
            self.setStatus("Transaction complete!");
            self.refreshLeaves();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });
    },

    checkLeaves: function() {
        var self = this;
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var leaveAddress = document.getElementById("leaveReceiver").value;

            console.log("Leave Address: " + leaveAddress);
            return rapid.checkleaves.call(leaveAddress, {
                from: account
            });
        }).then(function(value) {
            var leave_element = document.getElementById("checkLeaves");
            leave_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },


};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
            // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    App.start();
});