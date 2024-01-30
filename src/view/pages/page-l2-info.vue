<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">Inscribe Info</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { tickerList } from "@/api/server-api.js"
import { listFormat } from "@/utils/list-format.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
</script>

<style scoped></style>
