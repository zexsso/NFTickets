const Web3 = require("web3")
const EsaipTickets = require("../../blockchain/build/contracts/EsaipTickets.json")

const web3 = new Web3("http://127.0.0.1:7545")

async function get_infos() {
	const accounts = await web3.eth.getAccounts()
	const adminWallet = accounts[0]

	// Instead of hardcoding the contract address, use the address from the artifact
	const networkId = await web3.eth.net.getId()
	const deployedAddress = EsaipTickets.networks[networkId].address
	const contract = new web3.eth.Contract(EsaipTickets.abi, deployedAddress)

    return { adminWallet, contract }
}

module.exports = {
    web3,
    get_infos,
}
