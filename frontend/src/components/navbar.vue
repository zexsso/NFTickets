<template lang="">
	<nav class="bg-zinc-800 border-b border-zinc-700">
		<div class="container mx-auto px-6">
			<div class="flex items-center justify-between">
				<div>
					<router-link to="/explore">
						<img class="h-16 w-auto" src="../../public/NFT-Ticket.png" alt="Logo" />
					</router-link>
				</div>

				<div class="flex items-center">
					<router-link to="/explore" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Explore</router-link>
					<router-link to="/marketplace" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Marketplace</router-link>
					<router-link to="/create-event" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Create Event</router-link>
					<router-link to="/account" class="mx-3 text-gray-500 font-bold hover:text-gray-200">Account</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import { ref } from "vue"
</script>

<style scoped>
	.router-link-active {
		color: #c9c9c9 !important; /* Changez cette valeur à la couleur que vous souhaitez pour le lien actif */
	}
</style>
