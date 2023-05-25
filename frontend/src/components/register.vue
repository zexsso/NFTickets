<template lang="">
	<div class="flex flex-row justify-center mt-4">
		<form @submit.prevent="register" class="flex flex-col px-4 space-y-8">
			<div class="flex justify-between space-x-2">
				<span class="p-float-label">
					<InputText v-model="userInputs.user" inputId="user" />
					<label for="user">Username</label>
				</span>
				<span class="p-float-label">
					<InputText v-model="userInputs.email" inputId="email" />
					<label for="email">Email</label>
				</span>
			</div>
			<div class="flex justify-around">
				<span class="p-float-label">
					<Password v-model="userInputs.password" inputId="password" />
					<label for="password">Password</label>
				</span>
			</div>
			<div class="flex justify-around items-center">
				<div class="flex space-x-2">
					<InputSwitch v-model="userInputs.is_creator" />
					<p>Event Creator</p>
				</div>
				<FileUpload
					mode="basic"
					accept="image/*"
					customUpload
					@uploader="img_upload"
					:auto="true"
					:maxFileSize="1000000"
					:pt="{
						basicButton: { class: 'bg-indigo-600 border-indigo-600 text-white' },
					}"
				>
				</FileUpload>
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

	const userInputs = ref({
		user: "",
		password: "",
		email: "",
		is_creator: false,
		image: null,
	})

	const register = () => {
		let formData = new FormData()
		formData.append("username", userInputs.value.user)
		formData.append("password", userInputs.value.password)
		formData.append("email", userInputs.value.email)
		formData.append("is_creator", userInputs.value.is_creator)
		formData.append("image", userInputs.value.image)

		fetch("http://localhost:3000/auth/register", {
			method: "POST",
			credentials: "include",
			body: formData,
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

	const img_upload = (event) => {
		userInputs.value.image = event.files[0]
	}
</script>
