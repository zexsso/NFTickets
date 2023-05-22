<template lang="">
	<div class="h-screen basis-screen flex flex-col">
		<div>
			<NavbarVue />
		</div>
		<div class="relative h-full">
			<Button @click="visibleSell = true" class="absolute top-2 right-2 z-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border-none">Vendre ticket</Button>
			<DataGridTicketVue class="z-0" />
		</div>
	</div>

	<Dialog header="Vente" v-model:visible="visibleSell" :modal="true" :style="{ width: '30vw' }">
		<SellTicketVue />
	</Dialog>
</template>

<script setup>
	import { ref } from "vue"

	import NavbarVue from "../components/navbar.vue"
	import DataGridTicketVue from "../components/dataGridTicket.vue"
    import SellTicketVue from "../components/sellTicket.vue"

    const visibleSell = ref(false)
</script>
