// Configure Web3
let web3;
if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  alert("Web3 provider not found. Please install MetaMask.");
}
const tokenContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Create the TokenContract instance
const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);

// Function to retrieve the total supply of tokens
async function getTotalSupply() {
  const totalSupply = await tokenContract.methods.totalSupply().call();
  document.getElementById('totalSupply').textContent = totalSupply;
}

// Function to retrieve the balance of tokens for a given address
async function getBalance() {
  const address = document.getElementById('balanceAddress').value;
  const balance = await tokenContract.methods.balanceOf(address).call();
  document.getElementById('balanceResult').textContent = balance;
}

// Function to transfer tokens from the sender's address to another address
async function transferTokens() {
  const toAddress = document.getElementById('transferToAddress').value;
  const amount = document.getElementById('transferAmount').value;
  
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  const tx = await tokenContract.methods.transfer(toAddress, amount).send({ from: sender });
  console.log(tx);
}

// Function to approve a certain amount of tokens to be spent by another address
async function approveTokens() {
  const toAddress = document.getElementById('approveToAddress').value;
  const amount = document.getElementById('approveAmount').value;
  
  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  const tx = await tokenContract.methods.approve(toAddress, amount).send({ from: sender });
  console.log(tx);
}

// Function to transfer tokens from one address to another on behalf of a given address (delegated transfer)
async function delegatedTransfer() {
  const fromAddress = document.getElementById('delegatedFromAddress').value;
  const toAddress = document.getElementById('delegatedToAddress').value;
  const amount = document.getElementById('delegatedAmount').value;

  const accounts = await web3.eth.requestAccounts();
  const sender = accounts[0];

  const tx = await tokenContract.methods.transferFrom(fromAddress, toAddress, amount).send({ from: sender });
  console.log(tx);
}

// Function to check allowance for a given address
async function checkAllowance() {
  const ownerAddress = document.getElementById('allowanceOwnerAddress').value;
  const spenderAddress = document.getElementById('allowanceSpenderAddress').value;

  const allowance = await tokenContract.methods.allowance(ownerAddress, spenderAddress).call();
  document.getElementById('allowanceResult').textContent = allowance;
}

