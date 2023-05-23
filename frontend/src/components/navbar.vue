<template lang="">
	<nav class="bg-zinc-800 border-b border-zinc-700">
		<div class="container mx-auto px-6">
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
						<router-link to="/MyTickets" class="mx-3 text-gray-500 font-bold hover:text-gray-200">My tickets</router-link>
					</div>
					<div class="ml-6">
						<AvatarVue />
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import { ref } from "vue"
	import AvatarVue from "./Avatar.vue"
</script>

<style scoped>
	.router-link-active {
		color: #c9c9c9 !important; /* Changez cette valeur à la couleur que vous souhaitez pour le lien actif */
	}
</style>
