// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract EsaipTickets is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Ticket {
        uint256 concertId;
    }

    mapping(uint256 => Ticket) private _tickets;

    constructor() ERC721("EsaipTickets", "ETS") {}

    function safeMint(address to, uint256 concertId) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        Ticket storage ticket = _tickets[tokenId];
        ticket.concertId = concertId;
    }

    function getTicketInfo(uint256 tokenId) external view returns (uint256 concertId) {
        Ticket storage ticket = _tickets[tokenId];
        concertId = ticket.concertId;
    }
}
