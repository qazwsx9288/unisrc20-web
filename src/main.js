import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index.js"
import { store } from "@/pinia"
import { createI18n } from "vue-i18n"
import messages from "./i18n/index.js"
import eventBus from "vue3-eventbus"
// 用于错误处理
import { errorHandler, onerror } from "@/utils/error-handler.js"

// TODO：翻译校对
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: "en",
  messages,
})

// element
import ElementPlus from "element-plus"
// 引入element自定义主题色
import "./styles/element/index.scss"

// 引入bootstrap
import "bootstrap"

// 全局SCSS
import "./styles/style.scss"

const app = createApp(App)

// TODO:上线
// 错误处理
// const isProd = process.env.NODE_ENV === "production"
// if (isProd) {
app.config.errorHandler = errorHandler
window.onerror = onerror
// }

app.config.productionTip = false
app
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(eventBus)
  .use(i18n)
  .mount("#app")
