<template>
	<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-30 w-auto" src="../../public/NFT-Ticket.png" alt="Logo" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-200">Bienvenue sur notre site</h2>
			</div>
			<div>
				<Button
					label="Se connecter"
					icon="pi pi-user"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
					@click="visiblelogin = true"
				/>
				<Button
					label="S'inscrire"
					icon="pi pi-users"
					class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
					@click="visibleRegister = true"
				/>
			</div>
		</div>
	</div>

	<Dialog header="Inscription" v-model:visible="visibleRegister" :modal="true" :style="{ width: '35vw' }">
		<RegisterVue />
	</Dialog>

	<Dialog header="Connexion" v-model:visible="visiblelogin" :modal="true" :style="{ width: '20vw' }">
		<LoginVue />
	</Dialog>
</template>

<script setup>
	import { ref } from "vue"

	import RegisterVue from "../components/register.vue"
	import LoginVue from "../components/login.vue"

	const visibleRegister = ref(false)
	const visiblelogin = ref(false)
</script>
