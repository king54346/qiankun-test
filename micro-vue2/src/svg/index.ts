
// @types/webpack-env 添加了 NodeJS 的类型定义，所以可以使用 NodeJS 的全局变量
export const requireContext =  require.context('./common', false, /\.svg$/)

// 将所有svg全加载一遍
requireContext.keys().forEach(requireContext)

export { default } from './svg-icon.vue'