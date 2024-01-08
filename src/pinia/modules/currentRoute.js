import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCurrentRoute = defineStore("currentRoute", () => {
  // 当前route
  const route = ref({})

  // 设置当前route（在路由守卫中调用，可持续追踪当前route）
  function setRoute(r) {
    route.value = r
  }

  // 获取当前route
  const getRoute = computed(() => {
    return route.value
  })

  return {
    getRoute,
    setRoute,
  }
})
