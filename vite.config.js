import { defineConfig } from "vite"
import path from "path"
import * as dotenv from "dotenv"
import * as fs from "fs"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"

const NODE_ENV = process.env.NODE_ENV || "development"
const envFiles = [`.env.${NODE_ENV}`]
for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
  ],
  build: {
    // sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString()
          }
        },
      },
    },
  },
  server: {
    // 如果使用docker-compose开发模式，设置为false
    open: true,
    port: process.env.VITE_CLI_PORT,
    proxy: {
      // 把key的路径代理到target位置
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VITE_BASE_API]: {
        // 需要代理的路径   例如 '/api'
        target: `${process.env.VITE_BASE_PATH}/`, // 代理到 目标路径
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(new RegExp("^" + process.env.VITE_BASE_API), ""),
      },
    },
  },
})
