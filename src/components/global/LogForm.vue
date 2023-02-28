<template>
  <div v-if="DataSubmit">
    <p class="mrt10" v-if="getUpdatedAt()">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="getUpdatedBy()" /> {{__t('lúc')}} {{getUpdatedAt()}}</p>
  </div>
</template>

<script>
export default {
  name: 'LogForm',
  props: ['DataSubmit'],
  methods: {
    getUpdatedAt () {
      if (this.DataSubmit) {
        if (this.DataSubmit.UpdatedAt) {
          return this.getFTime(this.DataSubmit.UpdatedAt)
        }
        if (this.DataSubmit.CreatedAt) {
          return this.getFTime(this.DataSubmit.CreatedAt)
        }
      }
      return ''
    },
    getUpdatedBy () {
      if (this.DataSubmit) {
        if (this.DataSubmit.UpdatedBy) {
          return this.DataSubmit.UpdatedBy
        }
        if (this.DataSubmit.CreatedBy) {
          return this.DataSubmit.CreatedBy
        }
      }
      return ''
    }
  }
}
</script>
