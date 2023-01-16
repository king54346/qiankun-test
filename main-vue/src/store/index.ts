import {defineStore} from 'pinia'

// 1.定义容器
// id:容器名 必选唯一，会将所有的容器挂载到根容器
export const useMainStore=defineStore('main', {
    //类似与data,存储全局状态,必须是箭头函数
    state: () => {
      return {
        count1: 0,
        name: 'main'
      }
    },
    //类似于computed,计算属性，有缓存功能
    getters: {
        // 接收一个可选参数state，如果函数接收state，不需要推导 ,若使用this，需要手动指定返回值类型
        doubleCount1(): number {
            return this.count1 * 2
        }
    },
    //封装业务逻辑，修改state类似于methods
    actions: {
        // 可以传入参数，但是不能使用箭头函数，会指向外部this，否则this指向会出错
        changeCount1(){
            this.count1++
            //this.$patch
        }
    }
})

// 2.使用容器中的state

// 3.使用容器中的actions
