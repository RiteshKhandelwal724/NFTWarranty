// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Warranty is ERC721URIStorage,Ownable{
    using Counters for Counters.Counter;
    uint256 [] public nftTokenList;
    Counters.Counter private _tokenIds;
    Counters.Counter private _productIds;
    Counters.Counter private _manufacturerIds;
    Counters.Counter private _consumerIds;

    // uint256 cost= 1 ether;
    uint256 maxSupply=1000;
    uint256 totalSupply=0;

    struct Product {
        uint256 productId;
        uint256 tokenId;
        string warrantyType;
        uint8 warrantyMonths;
        uint256 manufacturerId;
        uint256 consumerId;
    }
    Product[] public products;
        
    struct Manufacturer {
        uint256 manufacturerId;
        uint256 tokenId;
        Product[] products;
        Consumer[] consumers;
    }
    Manufacturer[] public manufacturers;
    
    struct Consumer {
        uint256 consumerId;
        uint256 tokenId;
        Product[] product;
        Manufacturer[] manufacturers;
    }
    Consumer[] public consumers;


    constructor()ERC721 ("Token","TOKEN"){}
    function mint ()public returns(uint256){
        _tokenIds.increment();
        uint256 newItemId=_tokenIds.current();
        _mint(msg.sender, newItemId);
        nftTokenList.push(newItemId);
        return newItemId;
    }
    function getTokens()public view returns (uint256[] memory){
        return nftTokenList;
}
    function assignTokenToProduct(uint256 _id)public {
        uint256 supply=totalSupply;
        require(supply<=maxSupply, "Maximum minitng capacity reached");
      totalSupply+=1;
        _safeMint(msg.sender, _id);
    }
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner(_msgSender(), tokenId),"ERC 721: Transfer is not owner or approved");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId,bytes memory _data) public override {
        require(_isApprovedOrOwner(_msgSender(), tokenId),"ERC 721: Transfer is not owner or approved");
        _safeTransfer(from, to, tokenId,_data);

    }
    function getProducts()public view returns (Product[] memory){
        return products; 
}

    function addData(uint256 tokenId, string memory tokenURI)public returns (uint256){
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
}

    function addProduct( uint256 productId, uint256 tokenId,string memory warrantyType, uint8 warrantyMonths, uint256 manufacturerId,uint256  consumerId) public {
        products.push(Product(productId,tokenId,warrantyType,warrantyMonths,manufacturerId,consumerId));

}
    function getProduct(uint256 _id)public view returns (Product memory){
        return products[_id-1];
}

}
