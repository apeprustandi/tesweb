<script setup>
import {useCounter} from "../store.js";

const counterStore = useCounter();
counterStore.$subscribe((mutation, state) => {
  console.info(mutation)
  console.info(state)
})
counterStore.$onAction((action) => {
  console.info(action)
})

function logDoubled(){
  console.info(counterStore.doubled)
}
</script>

<template>
  <div>
    <h1>Counter {{ counterStore.counter }}</h1>
    <button @click="counterStore.increment()">Increment</button>
    <button @click="counterStore.reset()">Reset</button>
    <button @click="logDoubled">Log Doubled</button>
  </div>
</template>

<style scoped>

</style>