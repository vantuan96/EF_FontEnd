<template>
  <div class="row">
    <div class="col-md-12" v-if="value">
      <div class="form-group">
        <label>{{__label(value)}} <i class="unit-label" v-if="value.Note">{{value.Note}}</i>:</label>
        <div :value="item" :key="index"  v-for="(item, index) in value.Items">
          <input type="text" :value-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MdInput',
  props: ['value'],
  mixins: [],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  value () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
