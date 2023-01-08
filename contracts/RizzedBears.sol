// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

/// Contract @title: Rizzed Bears
/// Contract @author: Stinky (@nomamesgwei)
/// Description @dev: Rizzed Bears is a free mint ERC-721 token for Etherscan education

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

contract RizzedBears is ERC721A, Ownable   {

    /// @dev Max Supply
    uint256 immutable public maxSupply = 7000;
    /// @dev Minting Open/Close Flag
    bool public mintOpen;
    /// @dev Max Mint per txs
    uint256 public mintLimit = 5;    
    /// @dev baseURI for NFT Metadata
    string public baseURI;

    /// @dev Throw if Minting is Closed
    error MintingClosed();
    /// @dev Throw if NFT is Minted Out
    error MintedOut();
    /// @dev Throw if greater than mint limit
    error MintExceeded();

    /// @dev Minting Status was Updated
    event StatusChange(bool);
    /// @dev Minting Limit was Updated
    event LimitChange(uint256);

    constructor() ERC721A("Rizzed Bears", "RB") {
        mintOpen = true;
        baseURI = "ipfs://bafybeidxzi5h7zw7pcm3apcjye26vs6prfgeyllc4qzuqy66rwra367z6i/";
    }

    /// @dev Public Mint RB NFTs
    /// @param quantity Number of NFTs to mint
    function claim(uint256 quantity) external payable {
        if(!mintOpen) { revert MintingClosed(); }
        if(_totalMinted() + quantity > maxSupply) { revert MintedOut(); }
        if(quantity > mintLimit) { revert MintExceeded(); }
        _mint(msg.sender, quantity);
    }

    /// @dev Returns TokenURI for Marketplaces
    /// @param tokenId The ID of the Token you want Metadata for
    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        return string(abi.encodePacked(baseURI, _toString(tokenId), ".json"));
    }

    /// @dev Toggles the mint status from on/off
    function updateMintStatus() external onlyOwner {  
        mintOpen = !mintOpen;
        emit StatusChange(mintOpen);
    }

    /// @dev Update the mint limit
    function updateLimit(uint256 newLimit) external onlyOwner {  
        mintLimit = newLimit;
        emit LimitChange(mintLimit);
    }    
}