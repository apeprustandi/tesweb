import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createRouter, createWebHistory} from "vue-router";
import Faker from "./components/Faker.vue";
import ListTodo from "./components/ListTodo.vue";
import AddTodo from "./components/AddTodo.vue";
import UpdateTodo from "./components/UpdateTodo.vue";

const pinia = createPinia();

const router = createRouter({
  routes: [
    {
      path: "/",
      component: Faker
    },
    {
      path: "/todolist",
      children: [
        {
          path:"",
          component: ListTodo
        },
        {
          path: "add",
          component: AddTodo
        },
        {
          path: ":id/edit",
          name: "todo-edit",
          component: UpdateTodo,
          props: true
        }
      ]
    }
  ],
  history: createWebHistory()
})

createApp(App).use(pinia).use(router).mount('#app')