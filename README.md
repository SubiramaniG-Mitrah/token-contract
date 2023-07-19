markdown
Copy code
# ERC-20 Token Contract

This repository contains a basic ERC-20 token contract built using OpenZeppelin.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SubiramaniG/token-contract.git
```
Change into the project directory:
```bash
cd token-contract/erc20-openzeppelin
```
Install the required dependencies using either npm or yarn:
```bash
npm install
or
yarn
```
Running the Local Hardhat Network
Start the Hardhat server:
```bash
npx hardhat node
```
In another terminal, compile the contracts:
```bash
npx hardhat compile
```
Run the tests to ensure everything is working correctly:
```bash
npx hardhat test
```
Deploying the Contract Locally
Deploy the contract to your local Hardhat network:
```bash
npx hardhat run --network localhost ./scripts/deploy.js
```
Copy the contract address displayed in the terminal.

Update the tokenContractAddress variable in the ethers-scripts.js file located in the front-end folder with the copied contract address.

Interacting with the Contract
Open the index.html file, which is located in the front-end folder, in your browser.

You can now start interacting with the ERC-20 token contract. The first Hardhat address will be the primary holder.

# Additional Notes:
 - The contract is deployed on a local Hardhat network for testing and development purposes.
 - The front-end provides a user interface to test the contract functionalities.

Happy token contract testing! 🚀
