<template lang="">
	<div class="h-screen basis-screen flex flex-col">
		<div>
			<NavbarVue />
		</div>
		<div class="flex items-center justify-center h-full">
			<FormCreateEventVue />
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"

	import NavbarVue from "../components/navbar.vue"
	import FormCreateEventVue from "../components/formCreateEvent.vue"
</script>
