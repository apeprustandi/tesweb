<script setup>
import {ref} from "vue";
import {useTodoList} from "../useTodoList.js";
import {useRouter} from "vue-router";

const {id} = defineProps(["id"])

const todoList = useTodoList()
const todo = todoList.get(Number(id))

const name = ref(todo.name)

const router = useRouter()

function updateTodo() {
  todoList.update(Number(id), name.value)
  router.push("/todolist")
}
</script>

<template>
  <div>
    <h1>Add Todo</h1>
    <input v-model="name" placeholder="Enter todo name">
    <button @click="updateTodo">Save</button>
  </div>
</template>

<style scoped>

</style>