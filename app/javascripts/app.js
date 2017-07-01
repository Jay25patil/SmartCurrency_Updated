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
// var Account = contract(account_artifacts);

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
            self.refreshBalance1();
            self.refreshShares2();
            self.refreshLeaves3();
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
            // self.setStatus("Error getting balance; see log.");
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
            var balance_element = document.getElementById("shares");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
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
            var balance_element = document.getElementById("leaves");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
        });
    },
    refreshBalance1: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.getBalance1.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("balance1");
            balance_element.innerHTML = value.valueOf();
            1
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
        });
    },
    refreshShares2: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.checkshares1.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("shares1");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
        });
    },
    refreshLeaves3: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.checkleaves1.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("leaves1");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
        });
    },


    RegisterUser: function() {
        var self = this;

        var email = document.getElementById("emailsignup").value;
        var password = document.getElementById("passwordsignup").value;
        console.log("email :" + email);
        console.log("password :" + password);
        this.setStatus("Initiating Registration... (please wait)");

        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var returnRegisterValue = rapid.RegisterUser.call(email, password, {
                from: account
            });
            console.log("returnRegisterValue:" + returnRegisterValue);
            return returnRegisterValue;
        }).then(function(value) {
            console.log("value :" + value);

            if (value == true) {

                alert("Registration Successfull!.... Please Login");
                //self.redirect('Employee.html');
            } else {
                alert("Registration Unsuccessfull!");
            }

            //self.redirect('/Login.html');
        }).catch(function(e) {
            //console.log(e);
            self.setStatus("User Already Exist! Try Diffrent Email");
        });
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
            var balance_element = document.getElementById("address");
            balance_element.innerHTML = value.valueOf();
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
            if (_email == "abc@admin.com") {
                document.getElementById('send').onclick = function() {
                    location.href = "dashboard.html";
                }
            } else {
                location.href = "user.html";
            }


            //self.redirect('/Employee');

            //self.refreshBalance3();

        }).catch(function(value) {
            console.log(value);
            self.setStatus("User Doesn't Exist. Register First");
        });
    },

    Resetbalance: function() {
        var self = this;

        var meta;

        SmartCurrency.deployed().then(function(instance) {
            meta = instance;
            return meta.Resetbalance.call(account, {
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
            return meta.ResetShares.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("shares");
            balance_element.innerHTML = value.valueOf();
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
            return meta.ResetLeaves.call(account, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("leaves");
            balance_element.innerHTML = value.valueOf();
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
            var balance_element = document.getElementById("sharesBalance");
            balance_element.innerHTML = value.valueOf();
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
            var balance_element = document.getElementById("checkLeaves");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },
    SendCoin: function() {
        var self = this;

        var amount = parseInt(document.getElementById("CoinAmount").value);
        var receiver = document.getElementById("sendCoinReceiver").value;

        this.setStatus("Initiating transaction... (please wait)");

        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            return rapid.SendCoin(receiver, amount, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("SendCoins");
            balance_element.innerHTML = value.valueOf();
            self.setStatus("Transaction complete!");
            self.refreshBalance1();

        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });
    },

    checkBalances: function() {
        var self = this;
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var coinAddress = document.getElementById("coinReceiver").value;

            console.log("Coin Address: " + coinAddress);
            return rapid.getBalance1.call(coinAddress, {
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

    SendShare: function() {
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
            self.refreshShares1();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });
    },

    checkShare: function() {
        var self = this;
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var shareAddress = document.getElementById("shareReceiver").value;

            console.log("Share Address: " + shareAddress);
            return rapid.checkshares1.call(shareAddress, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("sharesBalance");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
        });
    },

    GrantLeave: function() {
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
            self.refreshLeaves1();
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error sending coin; see log.");
        });
    },

    checkLeave: function() {
        var self = this;
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            var leaveAddress = document.getElementById("leaveReceiver").value;

            console.log("Leave Address: " + leaveAddress);
            return rapid.checkleaves1.call(leaveAddress, {
                from: account
            });
        }).then(function(value) {
            var balance_element = document.getElementById("checkLeaves");
            balance_element.innerHTML = value.valueOf();
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