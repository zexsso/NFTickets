<template lang="">
	<div class="h-screen basis-screen flex flex-col">
		<div>
			<NavbarVue />
		</div>
		<div class="flex h-full">
			<DataGridTicketVue />
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"

	import NavbarVue from "../components/navbar.vue"
    import DataGridTicketVue from "../components/dataGridTicket.vue"
</script>
