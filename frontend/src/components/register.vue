<template lang="">
	<div class="flex flex-row justify-center mt-12">
		<form @submit.prevent="register" class="flex flex-col px-4 space-y-8">
			<span class="p-float-label">
				<InputText v-model="user" inputId="user" />
				<label for="user">Username</label>
			</span>
			<span class="p-float-label">
				<InputText v-model="email" inputId="email" />
				<label for="email">Email</label>
			</span>
			<span class="p-float-label">
				<Password v-model="password" inputId="password" />
				<label for="password">Password</label>
			</span>

			<div class="flex space-x-2">
				<InputSwitch v-model="is_creator" />
				<p>Event Creator</p>
			</div>

			<Divider />

			<Button label="Register" type="submit" icon="pi pi-user-plus" class="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent" />
		</form>
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useToast } from "primevue/usetoast"

	const toast = useToast()

	const user = ref(null)
	const password = ref(null)
	const email = ref(null)
	const is_creator = ref(false)

	const register = () => {
		fetch("http://localhost:3000/auth/register", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: user.value,
				password: password.value,
				is_creator: is_creator.value,
			}),
		})
			.then((response) => {
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
