<template>
  <div class="flex-box flex-center">
    <div v-if="readonly">
      <i v-if="value.Value" class="value-checkbox checked" aria-hidden="true"></i><i v-else class="value-checkbox" aria-hidden="true"></i>
    </div>
    <div class="v-checkbox" v-else>
      <input type="checkbox" :id="value.Code + '-cb'" v-model="value.Value">
      <label :for="value.Code + '-cb'"></label>
    </div>
    <span>{{__label(value)}}</span>
  </div>
</template>
<script>
export default {
  name: 'MdCheckboxInput',
  props: ['value', 'readonly'],
  watch: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>
