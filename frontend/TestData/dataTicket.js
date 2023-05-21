export const ProductService = {
	getProductsData() {
		return [
			{
				tokenID: "tkt1",
				concertID: "b90b056d-1a6f-4c3b-a45a-2f6f5e6c5e11",
				name: "Concert Ticket Festival de musique 1",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
			{
				tokenID: "tkt2",
				concertID: "b90b056d-1a6f-4c3b-a45a-2f6f5e6c5e11",
				name: "Concert Ticket Festival de musique 2",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
			{
				tokenID: "tkt3",
				concertID: "b90b056d-1a6f-4c3b-a45a-2f6f5e6c5e11",
				name: "Concert Ticket Festival de musique 3",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
			{
				tokenID: "tkt4",
				concertID: "f24c4e3d-6d6f-4a5b-b724-12f5e6a5b13a",
				name: "Concert Ticket Exposition d'art 1",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
            {
				tokenID: "tkt5",
				concertID: "f24c4e3d-6d6f-4a5b-b724-12f5e6a5b13a",
				name: "Concert Ticket Exposition d'art 2",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
			{
				tokenID: "tkt6",
				concertID: "f24c4e3d-6d6f-4a5b-b724-12f5e6a5b13a",
				name: "Concert Ticket Exposition d'art 3",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
            {
				tokenID: "tkt7",
				concertID: "b56d3e2d-4a6f-4c3b-a35b-2e6f5e6c5e14",
				name: "Concert Ticket Salon du livre 1",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
			{
				tokenID: "tkt8",
				concertID: "b56d3e2d-4a6f-4c3b-a35b-2e6f5e6c5e14",
				name: "Concert Ticket Salon du livre 2",
				price: 50,
                image: 'bamboo-watch.jpg',
			},
		]
	},

	getProducts() {
		return Promise.resolve(this.getProductsData())
	},
}
