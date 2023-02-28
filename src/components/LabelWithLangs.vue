<template>
  <span>{{data.ViName}} /<i>{{data.EnName}}</i></span>
</template>
<script>
export default {
  props: ['data'],
  name: 'LabelWithLangs'
}
</script>
