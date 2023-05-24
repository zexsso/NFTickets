<template lang="">
	<ScrollPanel style="width: 100%; height: 93vh">
		<DataView :value="products" :layout="'grid'" :sortOrder="sortOrder" :sortField="sortField">
			<template #header>
				<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By tickets" @change="onSortChange($event)" />
			</template>

			<template #grid="slotProps">
				<div class="col-12 sm:col-6 xl:col-4 p-4">
					<Button
						@click="openDescription(slotProps.data)"
						class="w-11 justify-center transition ease-in-out delay-150 bg-none hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 duration-300 text-white border-none rounded-md"
					>
						<div
							class="w-12 p-3 border-1 surface-border surface-card rounded-xl"
							:style="`background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('http://localhost:3000/${slotProps.data.image.replace(/\\/g, '/')}');
           						background-size: cover;
           						background-position: center;`"
						>
							<div class="flex flex-wrap align-items-center justify-content-between gap-2">
								<div class="flex align-items-center gap-2">
									<i class="pi pi-clock"></i>
									<span class="font-semibold">{{ formatDate(slotProps.data.date) }}</span>
								</div>
								<Tag class="h-8 w-2 font-bold" :value="slotProps.data.total_tickets" :severity="getSeverity(slotProps.data)"></Tag>
							</div>
							<div class="flex flex-column align-items-center gap-3 py-5">
								<div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
								<div class="text-lg italic font-bold">{{ slotProps.data.city }}</div>
							</div>
							<div class="flex align-items-center justify-content-between">
								<span class="text-lg font-bold text-green-500">{{ slotProps.data.price }} $</span>
								<span class="text-sm font-semibold">{{ slotProps.data.address }}</span>
							</div>
						</div>
					</Button>
				</div>
			</template>
		</DataView>
	</ScrollPanel>

	<Dialog v-if="visibleDescript" :header="selectedObject.name" :draggable="false" v-model:visible="visibleDescript" :modal="true" :style="{ width: '50vw' }">
		<div class="flex flex-col p-2">
			<div class="flex justify-center"></div>
			<div class="flex justify-between">
				<p class="mb-4"><strong>Date :</strong> {{ formatDate(selectedObject.date) }}</p>
				<p class="mb-4"><strong>Address :</strong> {{ selectedObject.address }}</p>
			</div>
			<div class="flex justify-between">
				<p class="mb-4"><strong>Country :</strong> {{ selectedObject.country }}</p>
				<p class="mb-4"><strong>City :</strong> {{ selectedObject.city }}</p>
			</div>
			<div class="flex justify-between items-center">
				<p><strong>Tickets Available :</strong> {{ selectedObject.total_tickets }}</p>
				<p class="text-green-500 font-bold"><strong class="text-white font-normal">Price :</strong> {{ selectedObject.price }} $</p>
			</div>
			<div class="flex h-full">
				<DataGridTicketVue />
			</div>
		</div>
	</Dialog>
</template>

<script setup>
	import { ref, onBeforeMount } from "vue"
	import { format } from "date-fns"
    import DataGridTicketVue from "./dataGridTicket.vue";

	const products = ref()

	const sortKey = ref()
	const sortOrder = ref()
	const sortField = ref()
	const sortOptions = ref([
		{ label: "Tickets High to Low", value: "!total_tickets" },
		{ label: "Tickets Low to High", value: "total_tickets" },
	])

	onBeforeMount(async () => {
		try {
			const response = await fetch("http://localhost:3000/events/") // Make a GET request to the API endpoint
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json() // Parse the JSON data from the response

			// Assign the data to the products value
			products.value = data.events.slice()
		} catch (error) {
			console.error("Fetch failed: ", error)
		}
	})

	const selectedObject = ref(null)
	const visibleDescript = ref(false)

	function openDescription(data) {
		selectedObject.value = data
		visibleDescript.value = true
	}

	function buyTicket(data) {
		// process the ticket buying here
	}

	const onSortChange = (event) => {
		const value = event.value.value
		const sortValue = event.value

		if (value.indexOf("!") === 0) {
			sortOrder.value = -1
			sortField.value = value.substring(1, value.length)
			sortKey.value = sortValue
		} else {
			sortOrder.value = 1
			sortField.value = value
			sortKey.value = sortValue
		}
	}

	const getSeverity = (product) => {
		if (product.tickets > product.ticketsBase / 4) {
			return "success"
		} else if (product.tickets <= product.ticketsBase / 4 && product.tickets != 0) {
			return "warning"
		} else if (product.tickets === 0) {
			return "danger"
		} else {
			return null
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString)
		return format(date, "EEEE dd MMMM HH:mm")
	}
</script>
