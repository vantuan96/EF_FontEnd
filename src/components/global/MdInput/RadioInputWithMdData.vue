<template>
  <div>
    <p v-if="readonly" class="fake-input disable">{{value || 'N/A'}}</p>
    <div v-else>
      <radio-list v-model="value" :options="optionss" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RadioInputWithMdData',
  props: ['value', 'readonly', 'options'],
  computed: {
    optionss: function () {
      console.log(this.options)
      return this.JSONParse(this.options)
    }
  }
}
</script>
