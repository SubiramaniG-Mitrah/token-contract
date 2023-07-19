import React, { useEffect, useState } from 'react';
import { tokenContract } from './utils';

const App = () => {
  // State variables to store input values and results
  const [balanceAddress, setBalanceAddress] = useState('');
  const [balanceResult, setBalanceResult] = useState('');
  const [transferToAddress, setTransferToAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [approveToAddress, setApproveToAddress] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [delegatedFromAddress, setDelegatedFromAddress] = useState('');
  const [delegatedToAddress, setDelegatedToAddress] = useState('');
  const [delegatedAmount, setDelegatedAmount] = useState('');
  const [allowanceOwnerAddress, setAllowanceOwnerAddress] = useState('');
  const [allowanceSpenderAddress, setAllowanceSpenderAddress] = useState('');
  const [allowanceResult, setAllowanceResult] = useState('');
  const [totalSupply, setTotalSupply] = useState('');

  // Function to retrieve the total supply of tokens
  const getTotalSupply = async () => {
    const totalSupply = await tokenContract.totalSupply();
    setTotalSupply(totalSupply.toString());
  };

  // Function to retrieve the balance of tokens for a given address
  const getBalance = async () => {
    const balance = await tokenContract.balanceOf(balanceAddress);
    setBalanceResult(balance.toString());
  };

  // Function to transfer tokens from the sender's address to another address
  const transferTokens = async () => {
    const tx = await tokenContract.transfer(transferToAddress, transferAmount);
    await tx.wait();
    console.log(tx);
  };

  // Function to approve a certain amount of tokens to be spent by another address
  const approveTokens = async () => {
    const tx = await tokenContract.approve(approveToAddress, approveAmount);
    await tx.wait();
    console.log(tx);
  };

  // Function to transfer tokens from one address to another on behalf of a given address (delegated transfer)
  const delegatedTransfer = async () => {
    const tx = await tokenContract.connect(signer).transferFrom(delegatedFromAddress, delegatedToAddress, delegatedAmount);
    await tx.wait();
    console.log(tx);
  };

  // Function to check allowance for a given address
  const checkAllowance = async () => {
    const allowance = await tokenContract.allowance(allowanceOwnerAddress, allowanceSpenderAddress);
    setAllowanceResult(allowance.toString());
  };

  useEffect(() => {
    getTotalSupply();
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <div className="card card-container">
        <h1 className="mb-4">TokenContract Interaction</h1>
        <div className="form-group">
          <label>Total Supply:</label>
          <span id="totalSupply">{totalSupply}</span>
        </div>
        <div className="form-group">
          <label>Balance for Address:</label>
          <input type="text" value={balanceAddress} onChange={(e) => setBalanceAddress(e.target.value)} className="form-control" />
          <button className="btn btn-primary btn-sm mt-2" onClick={getBalance}>
            Get Balance
          </button>
          <span id="balanceResult">{balanceResult}</span>
        </div>
        <div className="form-group">
          <label>Transfer To Address:</label>
          <input type="text" value={transferToAddress} onChange={(e) => setTransferToAddress(e.target.value)} className="form-control" />
          <label>Amount:</label>
          <input type="number" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="form-control" />
          <button className="btn btn-primary btn-sm mt-2" onClick={transferTokens}>
            Transfer
          </button>
        </div>
        <div className="form-group">
          <label>Approve To Address:</label>
          <input type="text" value={approveToAddress} onChange={(e) => setApproveToAddress(e.target.value)} className="form-control" />
          <label>Amount:</label>
          <input type="number" value={approveAmount} onChange={(e) => setApproveAmount(e.target.value)} className="form-control" />
          <button className="btn btn-primary btn-sm mt-2" onClick={approveTokens}>
            Approve
          </button>
        </div>
        <div className="form-group">
          <label>Allowance Owner Address:</label>
          <input type="text" value={allowanceOwnerAddress} onChange={(e) => setAllowanceOwnerAddress(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Allowance Spender Address:</label>
          <input type="text" value={allowanceSpenderAddress} onChange={(e) => setAllowanceSpenderAddress(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-sm mt-2" onClick={checkAllowance}>
            Check Allowance
          </button>
          <span id="allowanceResult">{allowanceResult}</span>
        </div>
        <div className="form-group">
          <label>Delegated Transfer From Address:</label>
          <input type="text" value={delegatedFromAddress} onChange={(e) => setDelegatedFromAddress(e.target.value)} className="form-control" />
          <label>To Address:</label>
          <input type="text" value={delegatedToAddress} onChange={(e) => setDelegatedToAddress(e.target.value)} className="form-control" />
          <label>Amount:</label>
          <input type="number" value={delegatedAmount} onChange={(e) => setDelegatedAmount(e.target.value)} className="form-control" />
          <button className="btn btn-primary btn-sm mt-2" onClick={delegatedTransfer}>
            Delegated Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
