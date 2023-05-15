import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

// PrimeVue
import PrimeVue from "primevue/config"
import "primevue/resources/themes/arya-blue//theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css"

import Button from "primevue/button"

// Tailwind CSS
import "./style/tailwind.css"

const app = createApp(App)

app.use(PrimeVue);
app.use(createPinia())
app.use(router)

app.component("Button", Button)

app.mount("#app")
