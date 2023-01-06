// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

/// Contract @title: Rizzed Bears
/// Contract @author: Stinky (@nomamesgwei)
/// Description @dev: Rizzed Bears is a free mint ERC-721 token for Etherscan education
/// Version @notice: 0.1

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

contract RizzedBears is ERC721A, Ownable   {

    /// @dev Max Supply
    uint256 immutable public maxSupply = 6969;
    /// @dev baseURI for NFT Metadata
    string public baseURI;

    /// @dev Throw if Minting is Closed
    error MintingClosed();
    /// @dev Throw if NFT is Minted Out
    error MintedOut();
    /// @dev Minting Status was Updated
    event StatusChange(bool);

    constructor() ERC721A("Rizzed Bears", "RB") 
    {
        baseURI = "";
    }

    /// @dev Public Mint RB NFTs
    /// @param quantity Number of NFTs to mint
    function claim(uint256 quantity) external payable {
        if(_totalMinted() + quantity > maxSupply) { revert MintedOut(); }
        _mint(msg.sender, quantity);
    }

    /// @dev Returns TokenURI for Marketplaces
    /// @param tokenId The ID of the Token you want Metadata for
    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        return string(abi.encodePacked(baseURI, _toString(tokenId), ".json"));
    }
}