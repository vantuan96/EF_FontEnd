<template>
  <div>
    <div class="input-group-x mb-10" :data="item" :key="index" v-for="(item, index) in items">
      <input class="form-control" :placeholder="__t('Nhập')" v-model="item.value"/>
      <button v-if="index === items.length - 1" class="btn btn-outline-secondary" type="button" @click="newItem">Thêm</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MDCustomTextboxs',
  props: ['value'],
  watch: {
    items: {
      handler (a, b) {
        var newVal = this.cloneObj(this.items)
        console.log(newVal)
        this.$emit('input', JSON.stringify(newVal))
      },
      deep: true
    }
  },
  data () {
    return {
      items: [],
      defaultItem: [
        {
          value: '',
          label: ''
        }
      ]
    }
  },
  created () {
    this.items = this.value ? (this.JSONParse(this.value) || this.defaultItem) : this.defaultItem
  },
  methods: {
    newItem () {
      this.items.push({
        value: '',
        label: ''
      })
    }
  }
}
</script>
