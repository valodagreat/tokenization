// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "./KycContract.sol";
import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {

    KycContract kyc;

    constructor(uint256 rate, address payable wallet, IERC20 token, KycContract _kyc) Crowdsale(rate, wallet, token){
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting");
    }

}