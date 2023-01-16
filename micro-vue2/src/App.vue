<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {defineComponent} from "vue";
import SvgIcon from "@/svg/svg-icon.vue";
import './style.css'
defineComponent({
  components: {
    HelloWorld,
    SvgIcon
  }
})

Array.from(new Set([1, 2, 3, 2, 1]));
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src='../public/vite.svg' class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <SvgIcon name="vue" svg-class="logo vue"></SvgIcon>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="vue logo" alt="vue logo"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  width: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
