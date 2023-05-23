<template lang="">
	<Card class="border border-zinc-700 rounded-xl" style="width: 50em">
		<template #title>Create event</template>
		<template #content>
			<form @submit.prevent="submitForm" class="flex flex-col justify-center px-4 space-y-10 mt-4">
				<span class="flex p-float-label mb-2">
					<InputText class="w-full p-inputtext-lg" v-model="the_event.name" inputId="name" />
					<label for="name">Name of the event</label>
				</span>
				<div class="flex justify-center space-x-10">
					<span class="p-float-label">
						<Calendar
							v-model="the_event.date"
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
						<InputText v-model="the_event.address" inputId="address" />
						<label for="address">Address</label>
					</span>
				</div>
				<div class="flex justify-center space-x-2">
					<span class="p-float-label">
						<InputText v-model="the_event.place" inputId="place" />
						<label for="place">Place</label>
					</span>
					<span class="p-float-label">
						<InputText v-model="the_event.city" inputId="city" />
						<label for="city">City</label>
					</span>
					<span class="p-float-label">
						<InputText v-model="the_event.country" inputId="pays" />
						<label for="pays">Country</label>
					</span>
				</div>
				<div class="flex justify-center space-x-10">
					<span class="p-float-label">
						<InputNumber v-model="the_event.tickets" inputId="tickets" mode="decimal" showButtons :min="0" :max="500" />
						<label for="tickets">Number of tickets</label>
					</span>
					<span class="p-float-label">
						<InputNumber v-model="the_event.price" inputId="price" showButtons mode="currency" currency="EUR" />
						<label for="tickets">Price of a ticket</label>
					</span>
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

	const the_event = ref({
		name: "",
		date: "",
		address: "",
		place: "",
		city: "",
		country: "",
		tickets: 10,
		price: 20,
		image: null,
	})

	const submitForm = async () => {
		const formData = new FormData()

		formData.append("name", the_event.value.name)
		formData.append("date", the_event.value.date)
		formData.append("address", the_event.value.address)
		formData.append("place", the_event.value.place)
		formData.append("city", the_event.value.city)
		formData.append("country", the_event.value.country)
		formData.append("price", the_event.value.price)
		formData.append("tickets", the_event.value.tickets)
		formData.append("image", the_event.value.image)

		try {
			const res = await fetch("http://localhost:3000/events/create", {
				method: "POST",
				body: formData,
			})

			const data = await res.json()

			if (data.success) {
				toast.add({ severity: "info", summary: "Success", detail: data.message, life: 3000 })
			} else {
				toast.add({ severity: "error", summary: "Error", detail: data.message, life: 3000 })
			}
		} catch (err) {
			toast.add({ severity: "error", summary: "Error", detail: err.message, life: 3000 })
		}
	}
	const img_upload = (event) => {
		the_event.value.image = event.files[0]
	}
</script>
