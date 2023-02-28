<template>
  <div>
    <v-select @input="emit" :multiple="false" v-model="val" :filterable="true" :options="options" :placeholder="__t('Gõ để tìm kiếm')"
      style="background-color: #fff; min-width: 200px;">
      <template slot="no-options">
        {{__t('Gõ để tìm kiếm...')}}
      </template>
    </v-select>
  </div>
</template>
<script>
export default {
  name: 'SelectInput',
  props: ['value', 'options'],
  data () {
    return {
      val: null
    }
  },
  components: {
  },
  created () {
    this.val = (this.options || []).find(e => e.value === this.value)
  },
  computed: {
  },
  watch: {
    // val: function (val) {
    //   this.$emit('input', this.val ? this.val.value : null)
    // }
  },
  methods: {
    emit () {
      setTimeout(() => {
        this.$emit('input', this.val ? this.val.value : null)
      }, 10)
    }
  }
}
</script>
