"use strict";

// Bank Accounts Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let currentLoggedInUser;

// FE Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Update the accounts Object with userNames

const accountUserNames = function (userAccounts) {
  userAccounts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

accountUserNames(accounts);

const userAccountBalance = function (transactions) {
  // total balance of user's account

  const balance = transactions.reduce(function (
    previous,
    current,
    index,
    array
  ) {
    const sum = previous + current;

    return sum;
  });

  return balance;
};

// Total deposits
const totalDeposits = function (transactions) {
  const balance = transactions.reduce(function (
    previous,
    current,
    index,
    array
  ) {
    return current > 0 ? (previous + current) : previous;
  },
  0);
  return balance;
};

// Total withdrawls
const totalWithdrawls = function (transactions) {
  const balance = transactions.reduce(function (
    previous,
    current,
    index,
    array
  ) {
    return current < 0 ? previous + current : previous;
  },
  0);
  return balance;
};

const updateUserAccount = function (currentLoggedInUser) {
  // deposit or withdrawl
  currentLoggedInUser.movements.forEach(function (transaction, index) {
    const type = transaction > 0 ? "deposit" : "withdrawal";
    const htmlElement = `
     <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      index + 1
    }${type}</div>
     <div class="movements__value">${transaction}€</div>
   </div>
   `;
    containerMovements.insertAdjacentHTML("afterbegin", htmlElement);
  });

  // Update the user balance value
  labelBalance.textContent = `${userAccountBalance(
    currentLoggedInUser.movements
  )}€`;

  labelSumIn.textContent = `${totalDeposits(currentLoggedInUser.movements)}€`;
  labelSumOut.textContent = `${totalWithdrawls(
    currentLoggedInUser.movements
  )}€`;
};

//Transfer money functionality
const transferMoney = function(){

  // The user is allowed to transfer amount only to the another three accounts
  // The amount user can transfer must be less than or equal to the total users balance
  // Then this must update the whole account of this user and the user which is recieving the money

  // In case if there are any issues in transferring the money, then raise the warning message with alerts accordingly

  const transferToAccount = inputTransferTo.value;
  const transferAmount = inputTransferAmount.value;

  //now update that userAccount with deposit.

  accounts.forEach(function(acc){
      if(acc.userName === transferToAccount) acc.movements.push(Number(transferAmount));
  })

  //now update the currentAccount with transfer.
  currentLoggedInUser.movements.push(-(Number(transferAmount)));
  updateUserAccount(currentLoggedInUser);
}


btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  transferMoney();
});



//Request money functionality
const requestMoney = function(){

  // If the user is requesting money then the user's account must be 

  const loanApprovalValue = inputLoanAmount.value;

  //now update the currentUserAccount with deposit

currentLoggedInUser.movements.push((Number(loanApprovalValue)));
updateUserAccount(currentLoggedInUser);

}

btnLoan.addEventListener("click", function(e){
  e.preventDefault();
  requestMoney();

})




// Login implementation of the user
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentLoggedInUser = accounts.find(
    (acc) => acc.userName === String(inputLoginUsername.value)
  );

  if (currentLoggedInUser?.pin === Number(inputLoginPin.value)) {
    //Update the user account with latest transactions data
    updateUserAccount(currentLoggedInUser);

    // Now user is allowed to view his/her account
    document.querySelector(".app").style.opacity = 100;
  } else {
    alert("Please enter valid credentials");
  }
});
