<template>
  <div id="maintenance-page">
    <div v-html="msg"></div>
  </div>
</template>
<script>
export default {
  props: ['msg'],
  name: 'MaintenancePage'
}
</script>
