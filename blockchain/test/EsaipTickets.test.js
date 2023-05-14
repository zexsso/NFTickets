const EsaipTickets = artifacts.require("EsaipTickets")

contract("EsaipTickets", (accounts) => {
	let esaipTickets = null
	const owner = accounts[0]
	const addr1 = accounts[1]
	const addr2 = accounts[2]

	beforeEach(async () => {
		esaipTickets = await EsaipTickets.deployed()
	})

	it("Should mint a new ticket to addr1", async () => {
		const concertId = 1
		const ticketId = 1
		await esaipTickets.safeMint(addr1, concertId, ticketId, { from: owner })

		const balance = await esaipTickets.balanceOf(addr1)
		assert(balance.toNumber() === 1, "balance should be 1")

		const ticketDetails = await esaipTickets.getTicketDetails(0)
		const cId = ticketDetails[0]
		const tId = ticketDetails[1]

		assert(cId.toNumber() === concertId, "concertId should match")
		assert(tId.toNumber() === ticketId, "ticketId should match")
	})
})
