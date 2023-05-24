<template lang="">
	<div class="h-screen basis-screen flex flex-col">
		<div>
			<NavbarVue />
		</div>
		<div class="flex flex-col h-full space-y-8">
			<div class="text-5xl font-extrabold justify-center mt-10 ml-10">
				<span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"> Account </span>
			</div>
			<div></div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue"

	import NavbarVue from "../components/navbar.vue"
</script>
