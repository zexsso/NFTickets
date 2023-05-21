<template lang="">
	<div class="flex justify-center mt-12">
		<form @submit.prevent="sell" class="flex flex-col px-4 space-y-8">
			<span class="p-float-label">
				<InputText v-model="user" inputId="user" />
				<label for="user">Nom d'utilisateur</label>
			</span>
			<span class="p-float-label">
				<Password v-model="password" inputId="password" :feedback="false" />
				<label for="password">Mot de passe</label>
			</span>

			<Divider />

			<Button label="Vendre" type="submit" icon="pi pi-user-plus" class="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent" />
		</form>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useToast } from "primevue/usetoast"

	const toast = useToast()

	const sell = () => {}
</script>
