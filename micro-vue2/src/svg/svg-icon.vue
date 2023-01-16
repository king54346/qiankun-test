<template>
  <svg :class="['box',svgClass]" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    svgClass: {
      type: String,
      default: '',
    },
  },
})

</script>

<style scoped lang="css">
.box {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  line-height: 1;
}
</style>