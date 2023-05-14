const Web3 = require("web3")
const EsaipTickets = require("../blockchain/build/contracts/EsaipTickets.json")

// Créez une instance de Web3 en se connectant à votre réseau Ganache local
const web3 = new Web3("http://localhost:7545") // Remplacez l'URL par celle de votre réseau Ganache

// Récupérez les informations nécessaires pour interagir avec votre contrat déployé
const contractAddress = "0x7f00E873096831037932932b9E5932572B7e28D1" // Remplacez par l'adresse de votre contrat déployé

// Chargez le contrat en utilisant l'adresse du contrat et son ABI
const contract = new web3.eth.Contract(EsaipTickets.abi, contractAddress)

const concertId = 123 // ID du concert
const addressToMint = "0x8DF9559a041E24d78727999B024604dfd3eCAe69" // Adresse à laquelle le ticket sera attribué (remplacez par l'adresse souhaitée)

// Appel de la fonction safeMint pour créer un ticket
// contract.methods
// 	.safeMint(addressToMint, concertId)
// 	.send({ from: addressToMint, gas: 5000000 })
// 	.then((receipt) => {
// 		console.log("Le ticket a été créé avec succès !")
// 		// Effectuez les opérations supplémentaires nécessaires après la création du ticket
// 	})
// 	.catch((error) => {
// 		console.error("Une erreur s'est produite lors de la création du ticket :", error)
// 		// Gérez l'erreur
// 	})

contract.methods
	.balanceOf(addressToMint)
	.call()
	.then((balance) => {
		console.log("Balance of owner:", balance)
	})
	.catch((error) => {
		console.error("Error retrieving balance:", error)
	})

// // Retrieve the tokenId of the token owned by the ownerAddress
// contract.methods
// 	.tokenOfOwnerByIndex(addressToMint, 0)
// 	.call()
// 	.then((tokenId) => {
// 		console.log("Token ID:", tokenId)
// 	})
// 	.catch((error) => {
// 		console.error("Error retrieving the token ID:", error)
// 	})

const tokenId = 0 // ID du token
contract.methods
	.ownerOf(tokenId)
	.call()
	.then((owner) => {
		console.log("Owner of token:", owner)
	})
	.catch((error) => {
		console.error("Error retrieving owner:", error)
	})

const fromAddress = addressToMint // Adresse du propriétaire actuel du token
const toAddress = "0xe1e7aCc1601f32006fBF9ddDeB0d8bb58E63400b" // Adresse à laquelle le token sera transféré

// contract.methods
// 	.safeTransferFrom(fromAddress, toAddress, tokenId)
// 	.send({ from: fromAddress, gas: 5000000 })
// 	.then((receipt) => {
// 		console.log("Le transfert du token a été effectué avec succès !")
// 		// Effectuez les opérations supplémentaires nécessaires après le transfert du token
// 	})
// 	.catch((error) => {
// 		console.error("Une erreur s'est produite lors du transfert du token :", error)
// 		// Gérez l'erreur
// 	})
