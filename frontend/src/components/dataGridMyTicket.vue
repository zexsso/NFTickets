<template lang="">
	<ScrollPanel style="width: 100%; height: 93vh">
		<DataView :value="products" :layout="'grid'">
			<template #grid="slotProps">
				<div class="col-12 sm:col-6 xl:col-2 p-4">
					<div class="cursor-default transition ease-in-out delay-150 bg-none hover:-translate-y-1 hover:scale-105 duration-300 text-white border-none rounded-md p-3">
						<div
							class="transition ease-in-out delay-150 p-2 border-1 surface-border surface-card rounded-xl"
							:style="`background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('http://localhost:3000/');
           						background-size: cover;
           						background-position: center;`"
						>
							<div class="flex justify-center">
								<div class="flex align-items-center py-5 h-32">
									<div class="text-xl font-bold text-center">{{ slotProps.data.eventName }}</div>
								</div>
							</div>
							<div class="flex align-items-center justify-content-between">
								<span class="text-lg font-bold text-green-500">{{ slotProps.data.purchasePrice }} $</span>
								<Button @click="openSell(slotProps.data)" class="bg-indigo-500 hover:bg-indigo-700 text-white border-none p-3" icon="pi pi-dollar" rounded />
							</div>
						</div>
					</div>
				</div>
			</template>
		</DataView>
	</ScrollPanel>

	<Dialog header="Sell this Ticket" v-model:visible="visibleSell" :modal="true" :style="{ width: '30vw' }">
		<div class="flex justify-center">
			<form @submit.prevent="sell" class="flex flex-col px-4 space-y-8">
				<div class="flex justify-between">
					<h2 class="text-xl font-bold mb-4">{{ selectedObject.eventName }}</h2>
					<h2 class="text-xl font-bold mb-4">{{ selectedObject.purchasePrice }} $</h2>
				</div>
				<span class="p-float-label">
					<InputNumber
						v-model="price"
						inputId="stacked-buttons"
						showButtons
						mode="currency"
						currency="USD"
						:pt="{
							incrementButton: { class: 'bg-indigo-600 border-indigo-600 text-white' },
							decrementButton: { class: 'bg-indigo-600 border-indigo-600 text-white' },
						}"
					/>
					<label for="stacked-buttons">Price</label>
				</span>

				<Divider />

				<Button label="Sell" type="submit" icon="pi pi-user-plus" class="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent" />
			</form>
		</div>
	</Dialog>
</template>

<script setup>
	import { ref, onBeforeMount } from "vue"

	onBeforeMount(async () => {
		try {
			const response = await fetch("http://localhost:3000/get_tickets", {
				credentials: "include", // or "same-origin"
			}) // Make a GET request to the API endpoint
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json() // Parse the JSON data from the response

			// Assign the data to the tickets value
			products.value = data	
		} catch (error) {
			console.error("Fetch failed: ", error)
		}
		console.log(slotProps.data)
	})

	const products = ref()

	const selectedObject = ref(null)
	const visibleSell = ref(false)

	const price = ref(10)

	const sell = () => {}

	function openSell(data) {
		selectedObject.value = data
		visibleSell.value = true
	}
</script>
