<script setup lang="ts">
import {ref} from 'vue'
import {useMainStore} from '../store'
import {storeToRefs} from "pinia";

const mainStore = useMainStore()
// 结构的方式获取不是响应式的 使用官方提供的api storetoRefs
//pinia 其实就是吧store的数据变成响应式的
// const {count1,name} = mainStore
//把解构出来的数据 做ref 响应式代理 count1.value 访问
const {count1, name} = storeToRefs(mainStore)

defineProps<{ msg: string }>()

const count = ref(0)
const changeMainStore = () => {
  // count1.value++
  // 2. 如果需要修改多个数据，建议使用$patch
  // mainStore.$patch({
  //   count1: count1.value+1,
  //   name: 'main'
  // })
  // 3. $patch 也可以传入一个函数
  // mainStore.$patch((state) => {
  //   state.count1++
  //   state.name = 'main'
  // })
  // 4. 逻辑比较多的时候，可以使用actions
  mainStore.changeCount1()
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <div class="card">
    <button type="button" @click="changeMainStore">count is {{ count1 }}</button>
  </div>


  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
    >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
