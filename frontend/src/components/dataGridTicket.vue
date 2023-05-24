<template lang="">
	<ScrollPanel style="width: 100%; height: 60vh">
		<DataView :value="products" :layout="'grid'">
			<template #header> </template>
			<template #grid="slotProps">
				<div class="col-12 md:col-6 xl:col-3 p-4">
					<Button
						@click="confirmBuy($event, slotProps.data)"
						class="transition ease-in-out delay-150 bg-none hover:-translate-y-1 hover:scale-105 hover:bg-gray-700 duration-300 text-white border-none rounded-md"
					>
						<div
							class="w-40 transition ease-in-out delay-150 p-2 border-1 surface-border surface-card rounded-xl"
							:style="`background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}');
           						background-size: cover;
           						background-position: center;`"
						>
							<div class="flex justify-center">
								<div class="flex align-items-center py-5 h-32">
									<div class="text-xl font-bold text-center">{{ slotProps.data.ticketId }}</div>
								</div>
							</div>
							<div class="flex align-items-center justify-content-between">
								<span class="text-lg font-bold text-green-500">{{ slotProps.data.price }} $</span>
							</div>
						</div>
					</Button>
				</div>
			</template>
		</DataView>
	</ScrollPanel>

	<ConfirmPopup></ConfirmPopup>
</template>

<script setup>
	import { ref, onBeforeMount, defineProps } from "vue"
	import { useConfirm } from "primevue/useconfirm"
	import { useToast } from "primevue/usetoast"

	const props = defineProps(["maProp"])

	onBeforeMount(async () => {
		try {
			const event = "test"
			const response = await fetch("http://localhost:3000/sales/") // Make a GET request to the API endpoint
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json() // Parse the JSON data from the response

			// Assign the data to the products value
			const eventWithSpecifiedId = data.events.find(event => event._id === props.maProp)
			products.value = eventWithSpecifiedId.sale_list
		} catch (error) {
			console.error("Fetch failed: ", error)
		}
	})
	const products = ref()
	const confirm = useConfirm()
	const toast = useToast()

	const confirmBuy = (event, data) => {
		confirm.require({
			target: event.currentTarget,
			message: "Are you sure you want to buy this ticket ?",
			icon: "pi pi-exclamation-triangle",
			acceptIcon: "pi pi-check",
			rejectIcon: "pi pi-times",
			accept: () => {
				buyTicket(data)
			},
			reject: () => {},
		})
	}

	function buyTicket(data) {
		toast.add({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 })
		console.log(data)
	}
</script>
