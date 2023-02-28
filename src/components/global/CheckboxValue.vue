<template>
  <i v-if="value" class="value-checkbox checked" aria-hidden="true"></i><i v-else class="value-checkbox" aria-hidden="true"></i>
</template>
<script>
export default {
  name: 'CheckboxValue',
  props: ['value']
}
</script>
