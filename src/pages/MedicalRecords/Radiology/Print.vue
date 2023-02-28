<template>
  <div class="a4-page box" id="printMe">
    <div class="radiology-view" v-html="Content"></div>
  </div>
</template>
<script>
export default {
  name: 'PrintRadiology',
  props: ['Content']
}
</script>
