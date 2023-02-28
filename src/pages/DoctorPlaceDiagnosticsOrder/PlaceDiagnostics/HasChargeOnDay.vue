<template>
  <label v-if="chargeItem" class="label label-warning hover-tooltip">
    <i class="fa fa-warning" aria-hidden="true"></i>
    <span class="tooltiptext">
      {{__t('Đã được chỉ định bởi')}} <ad-Info :ad="chargeItem.CreatedBy" /> {{__t('lúc')}} {{chargeItem.CreatedAt | formatDate}}
    </span>
  </label>
</template>

<script>
// import _ from 'lodash'
export default {
  props: ['items', 'item'],
  name: 'HasChargeOnDay',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  computed: {
    chargeItem: function () {
      return this.items.find(e => e.Code === this.item.Code)
    }
  },
  methods: {
  }
}
</script>
