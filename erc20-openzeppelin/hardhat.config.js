require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-verify");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/1bc584edc475439b880ad9eb65fca77d`,
      accounts: ["bb01d4f9cc54b612d60e47fdf136164dc831bbd551229aa3507871fbb1c1e273"]
    }
  },
  etherscan: {
    apiKey: "4Z1W81C9HAC646BII6F71I81HQ4DU1PXKM",
  },
};
