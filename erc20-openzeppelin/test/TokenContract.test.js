// test/TokenContract.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenContract", function () {
  let TokenContract;
  let tokenContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    TokenContract = await ethers.getContractFactory("TokenContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    tokenContract = await TokenContract.deploy(1000);
    await tokenContract.deployed();
  });

  it("Should have the correct name and symbol", async function () {
    expect(await tokenContract.name()).to.equal("TokenContract");
    expect(await tokenContract.symbol()).to.equal("TKC");
  });

  it("Should set the total supply upon deployment", async function () {
    const totalSupply = await tokenContract.totalSupply();
    expect(totalSupply).to.equal(1000);
  });

  it("Should allocate the initial supply to the contract creator", async function () {
    const balanceOfOwner = await tokenContract.balanceOf(owner.address);
    expect(balanceOfOwner).to.equal(1000);
  });

  it("Should transfer tokens between accounts", async function () {
    await tokenContract.transfer(addr1.address, 100);
    let balance = await tokenContract.balanceOf(addr1.address);
    expect(balance).to.equal(100);

    await tokenContract.connect(addr1).transfer(addr2.address, 50);
    balance = await tokenContract.balanceOf(addr2.address);
    expect(balance).to.equal(50);
  });

  it("Should not allow transfers exceeding balance", async function () {
    await expect(
      tokenContract.connect(addr1).transfer(owner.address, 200)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("Should approve token allowances", async function () {
    await tokenContract.approve(addr1.address, 100);
    const allowance = await tokenContract.allowance(owner.address, addr1.address);
    expect(allowance).to.equal(100);
  });

  it("Should update token allowances", async function () {
    await tokenContract.approve(addr1.address, 100);
    await tokenContract.approve(addr1.address, 150);
    const allowance = await tokenContract.allowance(owner.address, addr1.address);
    expect(allowance).to.equal(150);
  });

  it("Should handle delegated token transfers", async function () {
    await tokenContract.transfer(addr1.address, 100);
    await tokenContract.connect(addr1).approve(addr2.address, 50);
    await tokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 30);
    const balanceOfAddr1 = await tokenContract.balanceOf(addr1.address);
    const balanceOfAddr2 = await tokenContract.balanceOf(addr2.address);
    expect(balanceOfAddr1).to.equal(70);
    expect(balanceOfAddr2).to.equal(30);
  });

  it("Should not allow delegated transfers exceeding allowance", async function () {
    await tokenContract.transfer(addr1.address, 100);
    await tokenContract.connect(addr1).approve(addr2.address, 50);
    await expect(
      tokenContract.connect(addr2).transferFrom(addr1.address, addr2.address, 60)
    ).to.be.revertedWith("ERC20: insufficient allowance");
  });
});
