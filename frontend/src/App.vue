<template>
	<div class="card flex justify-content-center">
		<Toast />
	</div>
	<RouterView />
</template>

<script setup>
	import { onBeforeMount } from "vue"
	import { RouterLink, RouterView } from "vue-router"
	import { userStore } from "./stores/userStore"

	// import Pinia Store
	const store = userStore()

	onBeforeMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/', {
				credentials: 'include', // Necessary to include the session cookie
				headers: {
					'Accept': 'application/json',
				},
			})
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json()
			store.userId = data.user.id
			store.userStatus = data.user.is_creator
			store.userWallet = data.user.wallet
			store.userImage = data.user.image

		} catch (error) {
			console.error('Error fetching balance:', error)
		}
	})
</script>
