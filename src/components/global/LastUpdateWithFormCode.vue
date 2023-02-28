<template>
  <div>
    <p v-if="FormCode">{{FormCode}}</p>
    <div v-if="DataSubmit">
      <p class="mrt10" v-if="getUpdatedAt()">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="getUpdatedBy()" /> {{__t('lúc')}} {{getUpdatedAt()}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LastUpdateWithFormCode',
  props: ['DataSubmit', 'FormCode'],
  methods: {
    getUpdatedAt () {
      if (this.DataSubmit) {
        if (this.DataSubmit.TabUpdatedAt) {
          return this.getFTime(this.DataSubmit.TabUpdatedAt)
        }
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
        if (this.DataSubmit.TabUpdatedBy) {
          return this.DataSubmit.TabUpdatedBy
        }
        if (this.DataSubmit.UpdatedBy.Username) {
          return this.DataSubmit.UpdatedBy.Username || ''
        }
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
