<template>
  <div class="intervention-view" v-if="v2">
    <div :key="index" v-for="(item, index) in grouped" class="mb-5">
      <div :key="ind" v-for="(it, ind) in item" class="mb-5">
        <i v-if="ind" class="fa fa-check fa-2 green-color pl-5" aria-hidden="true"></i> {{__label(it)}}
      </div>
    </div>
  </div>
  <div class="intervention-view" v-else>
    <div :key="index" v-for="(item, index) in data" class="mb-5">
      <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i> {{__label(item)}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Intervention',
  props: ['Intervention', 'view'],
  data () {
    return {
      data: null,
      grouped: {},
      v2: false
    }
  },
  watch: {
    Intervention (val) {
      this.data = this.JSONParse(val) || []
    }
  },
  mounted () {
    this.data = this.JSONParse(this.Intervention) || []
    this.data.forEach(item => {
      if (item.Group) {
        this.v2 = true
        if (this.grouped[item.Group.Code]) {
          this.grouped[item.Group.Code].push(item)
        } else {
          this.$set(this.grouped, item.Group.Code, [item.Group, item])
        }
        console.log(this.grouped)
      }
    })
  }
}
</script>
