const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) =>{
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });
});