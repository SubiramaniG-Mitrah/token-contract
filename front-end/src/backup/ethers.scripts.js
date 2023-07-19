// Configure Ethers.js
// const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/`);
const signer = provider.getSigner();

// const tokenContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenContractAddress = '0x7E212b6987513a7c63840C8f9BF15675b90Fa0F2';

// Create the TokenContract instance
const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, signer);

// Function to retrieve the total supply of tokens
async function getTotalSupply() {
  const totalSupply = await tokenContract.totalSupply();
  document.getElementById('totalSupply').textContent = totalSupply.toString();
}
getTotalSupply()
// Function to retrieve the balance of tokens for a given address
async function getBalance() {
  const address = document.getElementById('balanceAddress').value;
  const balance = await tokenContract.balanceOf(address);
  document.getElementById('balanceResult').textContent = balance.toString();
}

// Function to transfer tokens from the sender's address to another address
async function transferTokens() {
  const toAddress = document.getElementById('transferToAddress').value;
  const amount = document.getElementById('transferAmount').value;

  const tx = await tokenContract.transfer(toAddress, amount);
  await tx.wait();
  console.log(tx);
}

// Function to approve a certain amount of tokens to be spent by another address
async function approveTokens() {
  const toAddress = document.getElementById('approveToAddress').value;
  const amount = document.getElementById('approveAmount').value;

  const tx = await tokenContract.approve(toAddress, amount);
  await tx.wait();
  console.log(tx);
}

// Function to transfer tokens from one address to another on behalf of a given address (delegated transfer)
async function delegatedTransfer() {
  const fromAddress = document.getElementById('delegatedFromAddress').value;
  const toAddress = document.getElementById('delegatedToAddress').value;
  const amount = document.getElementById('delegatedAmount').value;

  const tx = await tokenContract.connect(signer).transferFrom(fromAddress, toAddress, amount);
  await tx.wait();
  console.log(tx);
}

// Function to check allowance for a given address
async function checkAllowance() {
  const ownerAddress = document.getElementById('allowanceOwnerAddress').value;
  const spenderAddress = document.getElementById('allowanceSpenderAddress').value;

  const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
  document.getElementById('allowanceResult').textContent = allowance.toString();
}
