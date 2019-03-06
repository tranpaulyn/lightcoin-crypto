class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >=0);
  }
}

class Deposit extends Transaction {

  get value () {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log('Starting Balance', myAccount.balance);

const t1 = new Deposit(120, myAccount);
t1.commit();

const t2 = new Withdrawal(50, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
