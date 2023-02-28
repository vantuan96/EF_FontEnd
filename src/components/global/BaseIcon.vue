<template>
<div v-if="url" class="inline">
  <img :src="`static/${url}`" :style="`width: ${width};`"/>
</div>
</template>
<script>
export default {
  name: 'BaseIcon',
  props: {
    url: {
      type: String
    },
    width: {
      type: String,
      default: '20px'
    }
  }
}
</script>
