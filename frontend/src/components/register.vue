<template lang="">
	<div class="flex flex-row justify-center mt-12">
		<form @submit.prevent="registerU" class="flex flex-col px-4 space-y-8">
			<h3 class="text-xl font-bold">Utilisateur</h3>
			<span class="p-float-label">
				<InputText v-model="userU" inputId="userU" />
				<label for="userU">Nom d'utilisateur</label>
			</span>
			<span class="p-float-label">
				<Password v-model="passwordU" inputId="passwordU" />
				<label for="passwordU">Mot de passe</label>
			</span>

			<Divider />

			<Button label="Inscription" type="submit" icon="pi pi-user-plus" class="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent" />
		</form>

		<Divider layout="vertical"><b>OU</b></Divider>

		<from @submit.prevent="registerC" class="flex flex-col px-4 space-y-8">
			<h3 class="text-xl font-bold">Créateur d'événements</h3>
			<span class="p-float-label">
				<InputText v-model="userC" inputId="userC" />
				<label for="userC">Nom d'utilisateur</label>
			</span>
			<span class="p-float-label">
				<Password v-model="passwordC" inputId="passwordC" />
				<label for="passwordC">Mot de passe</label>
			</span>

			<Divider />

			<Button label="Inscription" type="submit" icon="pi pi-calendar-plus" class="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent" />
		</from>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useToast } from "primevue/usetoast"

	const toast = useToast()

	const userU = ref(null)
	const passwordU = ref(null)

	const userC = ref(null)
	const passwordC = ref(null)

	const registerU = () => {
		fetch("http://localhost:3000/auth/register", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: userU.value,
				password: passwordU.value,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data) => {
				if (data.success === true) {
					toast.add({ severity: "success", summary: "Success", detail: data.message, life: 3000 })
				} else {
					toast.add({ severity: "warn", summary: "Warning", detail: data.message, life: 3000 })
				}
			})
			.catch((error) => {
				// handle error
				console.error("There was a problem with the register:", error)
			})
	}
</script>
