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
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import DataView from 'primevue/dataview'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import ScrollPanel from 'primevue/scrollpanel'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import Card from 'primevue/card'
import Calendar from 'primevue/calendar'
import FileUpload from 'primevue/fileupload'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'

// Tailwind CSS
import "./style/tailwind.css"

import 'primeflex/primeflex.css';

const app = createApp(App)

app.use(PrimeVue);
app.use(createPinia())
app.use(router)
app.use(ToastService)

app.component("Button", Button)
app.component("Dialog", Dialog)
app.component("InputText", InputText)
app.component("Divider", Divider)
app.component("Password", Password)
app.component("Toast", Toast)
app.component("DataView", DataView)
app.component("Tag", Tag)
app.component("Dropdown", Dropdown)
app.component("ScrollPanel", ScrollPanel)
app.component("InputNumber", InputNumber)
app.component("InputSwitch", InputSwitch)
app.component("Card", Card)
app.component("Calendar", Calendar)
app.component("FileUpload", FileUpload)
app.component("Menu", Menu)
app.component("Avatar", Avatar)

app.mount("#app")
