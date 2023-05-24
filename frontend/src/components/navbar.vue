<template lang="">
	<nav class="bg-zinc-800 border-b border-zinc-700">
		<div class="container mx-auto px-6 py-2">
			<div class="flex items-center justify-between">
				<div>
					<router-link to="/explore">
						<img class="h-14 w-auto" src="../../images/NFT-Ticket.png" alt="Logo" />
					</router-link>
				</div>

				<div class="flex items-center">
					<div>
						<router-link to="/explore" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Explore</router-link>
						<router-link to="/marketplace" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Marketplace</router-link>
						<router-link to="/create-event" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Create Event</router-link>
						<router-link to="/mytickets" class="mx-3 text-gray-500 font-bold hover:text-gray-200">My tickets</router-link>
					</div>
					<Divider class="ml-2" layout="vertical" />
					<div class="flex flex-col">
						<div>
							<span class="font-bold text-green-500">$ {{ balanceUSD }}</span>
						</div>
						<div>
							<span class="flex font-bold text-indigo-500 space-x-1 items-center">
								<img class="h-4 w-auto" src="../../images/Eth.png" />
								<div>
									{{ balanceETH }}
								</div>
							</span>
						</div>
					</div>
					<div class="ml-7">
						<AvatarVue />
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import { ref, onMounted } from "vue"
	import AvatarVue from "./Avatar.vue"

	const balanceUSD = ref(0)
	const balanceETH = ref(0)
	
	onMounted(async () => {
		try {
			const response = await fetch('http://localhost:3000/get_balance', {
				credentials: 'include', // Necessary to include the session cookie
				headers: {
					'Accept': 'application/json',
				},
			})
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json()
			balanceUSD.value = data.USD_balance.toFixed(2)
			balanceETH.value = parseInt(data.ETH_balance).toFixed(2)
		} catch (error) {
			console.error('Error fetching balance:', error)
		}
	})
</script>

<style scoped>
	.router-link-active {
		color: #c9c9c9 !important; /* Changez cette valeur à la couleur que vous souhaitez pour le lien actif */
	}
</style>
