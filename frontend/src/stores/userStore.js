import { defineStore } from "pinia"

export const userStore = defineStore("userStore", {
	state: () => ({
		userId: null,
		userStatus: null,
		userWallet: null,
		userImage: null
	}),
})
