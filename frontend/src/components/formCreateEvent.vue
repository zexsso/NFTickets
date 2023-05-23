<template lang="">
	<Card class="border border-zinc-700 rounded-xl" style="width: 50em">
		<template #title>Create event</template>
		<template #content>
			<form @submit.prevent="submitForm" class="flex flex-col justify-center px-4 space-y-10 mt-4">
				<span class="flex p-float-label mb-2">
					<InputText class="w-full p-inputtext-lg" v-model="event.name" inputId="name" />
					<label for="name">Name of the event</label>
				</span>
				<div class="flex justify-center space-x-10">
					<span class="p-float-label">
						<Calendar
							v-model="event.date"
							inputId="date"
							dateFormat="yy-mm-dd"
							:showIcon="true"
                            showTime
							:pt="{
								dropdownButton: {
									root: { class: 'bg-indigo-600 border-indigo-600 text-white' },
								},
							}"
						/>
						<label for="date">Date of the event</label>
					</span>
					<span class="p-float-label">
						<InputText v-model="event.address" inputId="address" />
						<label for="address">Address</label>
					</span>
				</div>
				<div class="flex justify-center space-x-2">
					<span class="p-float-label">
						<InputText v-model="event.place" inputId="place" />
						<label for="place">Place</label>
					</span>
					<span class="p-float-label">
						<InputText v-model="event.city" inputId="city" />
						<label for="city">City</label>
					</span>
					<span class="p-float-label">
						<InputText v-model="event.country" inputId="pays" />
						<label for="pays">Country</label>
					</span>
				</div>
				<div class="flex justify-center space-x-10">
					<span class="p-float-label">
						<InputNumber v-model="event.ticketsBase" mode="decimal" useGrouping="false" inputId="tickets" />
						<label for="tickets">Number of tickets</label>
					</span>
					<FileUpload
						mode="basic"
						name="demo[]"
						url="http://localhost:3000/auth/register"
						accept="image/*"
						:maxFileSize="1000000"
						@upload="onUpload"
						:pt="{
							basicButton: { class: 'bg-indigo-600 border-indigo-600 text-white' },
						}"
					>
					</FileUpload>
				</div>
				<div class="flex justify-center">
					<Button label="Create" type="submit" icon="pi pi-check" class="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent" />
				</div>
			</form>
		</template>
	</Card>
</template>

<script setup>
	import { ref } from "vue"
	import { useToast } from "primevue/usetoast"

	const toast = useToast()

	const event = ref({
		name: "",
		date: "",
		address: "",
		place: "",
		city: "",
		country: "",
		id: "", // Vous devez générer un nouvel identifiant à chaque fois
		ticketsBase: 0,
		tickets: 0,
		image: "",
	})

	const submitForm = () => {
		event.value.tickets = event.value.ticketsBase
		console.log(JSON.stringify(event.value, null, 2))
		toast.add({ severity: "info", summary: "Success", detail: "Creation effectuée", life: 3000 })
		// Ici, vous pouvez appeler votre API ou faire ce que vous voulez avec les données de l'événement
	}

	const onUpload = () => {
		toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 })
	}
</script>
