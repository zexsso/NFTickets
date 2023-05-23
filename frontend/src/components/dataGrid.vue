<template lang="">
	<ScrollPanel style="width: 100%; height: 93vh">
		<DataView :value="products" :layout="'grid'" :sortOrder="sortOrder" :sortField="sortField">
			<template #header>
				<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By tickets" @change="onSortChange($event)" />
			</template>

			<template #grid="slotProps">
				<div class="col-12 sm:col-6 xl:col-3 p-4">
					<Button
						@click="openDescription(slotProps.data)"
						class="transition ease-in-out delay-150 bg-none hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 duration-300 text-white border-none rounded-md"
					>
						<div class="p-3 border-1 surface-border surface-card rounded-xl">
							<div class="flex flex-wrap align-items-center justify-content-between gap-2">
								<div class="flex align-items-center gap-2">
									<i class="pi pi-tag"></i>
									<span class="font-semibold">{{ slotProps.data.date }}</span>
								</div>
								<Tag class="h-8 w-2 text-sm" :value="slotProps.data.tickets" :severity="getSeverity(slotProps.data)"></Tag>
							</div>
							<div class="flex flex-column align-items-center gap-3 py-5">
								<img class="w-9 shadow-2 border-round" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" />
								<div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
								<div class="text-xl font-bold">{{ slotProps.data.city }}</div>
							</div>
							<div class="flex align-items-center justify-content-between">
								<span class="text-sm font-semibold">{{ slotProps.data.address }}</span>
							</div>
						</div>
					</Button>
				</div>
			</template>
		</DataView>
	</ScrollPanel>

	<Dialog header="Description" v-model:visible="visibleDescript" :modal="true" :style="{ width: '35vw' }">
		<div class="p-6">
			<h2 class="text-xl font-bold mb-4">{{ selectedObject.name }}</h2>
			<img :src="`https://primefaces.org/cdn/primevue/images/product/${selectedObject.image}`" class="w-full h-64 object-cover mb-4" />
			<p class="mb-4"><strong>Date:</strong> {{ selectedObject.date }}</p>
			<p class="mb-4"><strong>Address:</strong> {{ selectedObject.address }}</p>
			<p class="mb-4"><strong>City:</strong> {{ selectedObject.city }}</p>
			<p class="mb-4"><strong>Country:</strong> {{ selectedObject.country }}</p>
			<p class="mb-4"><strong>Tickets Available:</strong> {{ selectedObject.tickets }}</p>
			<div class="flex space-x-2">
				<Button @click="buyTicket(selectedObject)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :disabled="selectedObject.tickets === 0"
					>Buy Ticket</Button
				>
				<Button @click="goMarket()" v-if="selectedObject.tickets === 0" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border-none">
					<router-link to="/marketplace">Go to market place</router-link>
				</Button>
			</div>
		</div>
	</Dialog>
</template>

<script setup>
	import { ref, onMounted } from "vue"
	import { ProductService } from "../../TestData/dataEvent"

	onMounted(() => {
		ProductService.getProducts().then((data) => (products.value = data.slice()))
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

	const products = ref()

	const sortKey = ref()
	const sortOrder = ref()
	const sortField = ref()
	const sortOptions = ref([
		{ label: "Tickets High to Low", value: "!tickets" },
		{ label: "Tickets Low to High", value: "tickets" },
	])
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
</script>
