// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Betting {

    struct Bet {
        string name;
        string side1;
        string side2;
        uint256 amount;
        bool isOpen;
        bool exists;
    }

    struct Better {
        address betterAddress;
        uint256 amount;
        bool side;
    }

    struct Validator {
        address validatorAddress;
        uint256 amount;
        bool side;
    }

    struct PrizeInfo {
        address user_address;
        uint256 amount;
    }

    uint public minBet;
    uint public maxBet;
    uint lastBetId;
    uint openBets;
    uint closedBets;
    uint balance;
    address contractOwner;

    mapping (uint256 => Bet) bets;
    mapping (uint256 => address) betIdToOwner;
    mapping (uint256 => Better[]) betIdToBetters;
    mapping (uint256 => Validator[]) betIdToValidators;

    constructor() public {
        minBet = 100000000000000; // 0.0001 ether
        maxBet = 10000 * minBet; // 10 ether
        lastBetId = 0;
        openBets = 0;
        closedBets = 0;
        balance = 0;
        contractOwner = msg.sender;
    }

    function createBet(string memory _name, string memory _side1, string memory _side2) external {
        bets[++lastBetId] = Bet(
            _name,
            _side1,
            _side2,
            0,
            true,
            true
        );
        betIdToOwner[lastBetId] = msg.sender;
        openBets++;
    }

    function getOpenBets() external view returns (Bet[] memory) {
        Bet[] memory result = new Bet[](openBets);
        uint count = 0;
        for (uint i = 1; i <= lastBetId; i++) {
            if (bets[i].isOpen == true) result[count++] = bets[i];
        }
        return result;
    }

    function getClosedBets() external view returns (Bet[] memory) {
        Bet[] memory result = new Bet[](openBets);
        uint count = 0;
        for (uint i = 1; i <= lastBetId; i++) {
            if (bets[i].isOpen == false) result[count++] = bets[i];
        }
        return result;
    }

    function betExists(uint256 betId) external view returns (bool) {
        return bets[betId].exists;
    }

    function makeBet(uint256 betId, bool side) external payable {
        require(this.betExists(betId));
        require(msg.value >= minBet);
        Better memory better = Better(msg.sender, msg.value, side);  
        betIdToBetters[betId].push(better);
        bets[betId].amount += msg.value;
    }

    function subscribeAsValidator(uint256 betId, bool side) external payable {
        require(this.betExists(betId));
        require(msg.value >= minBet);
        Validator memory validator = Validator(msg.sender, msg.value, side);
        betIdToValidators[betId].push(validator);
        bets[betId].amount += msg.value;
    }

    function getBetResult(uint256 betId) public view returns (bool) {
        uint256 side1 = 0;
        uint256 side2 = 0;
        for (uint i = 0; i < betIdToBetters[betId].length; i++) {
            Better memory better = betIdToBetters[betId][i];
            if (better.side == false) side1++;
            else side2++;
        }
        return side2 > side1;
    }

    function getBettersPrizes(uint256 betId) public view returns (PrizeInfo[] memory) {
        bool betResult = getBetResult(betId);            
        uint256 totalAmount = bets[betId].amount * 80 / 100; // 80% of prize amount goes to betters
        uint256 totalAmountWinners = 0;
        uint256 prizesSize = 0;
        for (uint i = 0; i < betIdToBetters[betId].length; i++) {
            Better memory better = betIdToBetters[betId][i];
            if (better.side == betResult) {
                totalAmountWinners += better.amount;
                prizesSize++;
            }
        }
        PrizeInfo[] memory prizes = new PrizeInfo[](prizesSize);
        uint256 distributedPrizes = 0;
        for (uint i = 0; i < prizesSize; i++) {
            Better memory better = betIdToBetters[betId][i];
            if (better.side == betResult) {
                prizes[distributedPrizes++] = PrizeInfo(
                    better.betterAddress,
                    totalAmount * better.amount / totalAmountWinners
                );
            }
        }
        return prizes;
    }

    function getValidatorsPrizes(uint256 betId) public view returns (PrizeInfo[] memory) {
        bool betResult = getBetResult(betId);            
        uint256 totalAmount = bets[betId].amount * 80 / 100; // 80% of prize amount goes to validators
        uint256 totalAmountRightValidators = 0;
        uint256 prizesSize = 0;
        for (uint i = 0; i < betIdToValidators[betId].length; i++) {
            Validator memory validator = betIdToValidators[betId][i];
            if (validator.side == betResult) {
                totalAmountRightValidators += validator.amount;
                prizesSize++;
            }
        }
        PrizeInfo[] memory prizes = new PrizeInfo[](prizesSize);
        uint256 distributedPrizes = 0;
        for (uint i = 0; i < betIdToValidators[betId].length && distributedPrizes < prizesSize; i++) {
            Validator memory validator = betIdToValidators[betId][i];
            if (validator.side == betResult) {
                prizes[distributedPrizes++] = PrizeInfo(
                    validator.validatorAddress,
                    totalAmount * validator.amount / totalAmountRightValidators
                );
            }
        }
        return prizes;
    }


    function getBetOwnerPrizes(uint256 betId) public view returns (PrizeInfo[] memory) {
        PrizeInfo[] memory prizes = new PrizeInfo[](1);
        uint256 totalAmount = bets[betId].amount * 5 / 100; // 5% of prize amount goes to bet owner
        address owner = betIdToOwner[betId];
        prizes[0] = PrizeInfo(owner,totalAmount);
    }

    function closeBet(uint256 betId) external payable {
        require(msg.sender == betIdToOwner[betId]);
        PrizeInfo[] memory betterToPrizes = getBettersPrizes(betId);
        PrizeInfo[] memory validatorToPrizes = getValidatorsPrizes(betId);
        PrizeInfo memory ownerToPrizes = getBetOwnerPrizes(betId)[0];
        uint256 totalAmount = bets[betId].amount;
        for (uint i = 0; i < betterToPrizes.length; i++) {
            address betterAddress = betterToPrizes[i].user_address;
            uint256 amount = betterToPrizes[i].amount;
            bool success = payable(betterAddress).send(amount);
            require(success);
            totalAmount -= amount;
        }
        for (uint i = 0; i < validatorToPrizes.length; i++) {
            address validatorAddress = validatorToPrizes[i].user_address;
            uint256 amount = validatorToPrizes[i].amount;
            bool success = payable(validatorAddress).send(amount);
            require(success);
            totalAmount -= amount;
        }
        address ownerAddress = ownerToPrizes.user_address;
        uint256 amount = ownerToPrizes.amount;
        bool success = payable(ownerAddress).send(amount);
        require(success);
        totalAmount -= amount;

        success = payable(contractOwner).send(totalAmount);
        require(success);
    }
}