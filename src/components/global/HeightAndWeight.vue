<template>
  <div style="clear: both; margin: 7px 0;padding-top: 7px">
    <template v-if="dataFromHis">
        <i aria-hidden="true" class="fa fa-check v-green"></i>
        {{__t('Thông tin chiều cao cân nặng lượt khám gần nhất từ Concerto ngày')}}: {{dataFromHis.LastUpdated}} {{__t('là')}} <span>{{dataFromHis.ChieuCao || 'N/A'}} cm</span><span> {{__t('và')}} {{dataFromHis.CanNang || 'N/A'}} kg</span>
        <button class="btn btn-flat btn-xs" @click="copy(dataFromHis.ChieuCao, dataFromHis.CanNang)">Copy</button>
    </template>
    <template v-else>
      <div v-if="LastUpdateWeightHeight">
        <i aria-hidden="true" class="fa fa-check v-green"></i>
        {{__t('Thông tin chiều cao cân nặng lượt khám gần nhất từ EFORM ngày')}}: {{LastUpdateWeightHeight}} {{__t('là')}} <span v-if="Height">{{Height}} cm</span><span v-if="Weight"> {{__t('và')}} {{Weight}} kg</span>
        <button class="btn btn-flat btn-xs" @click="copy(Height, Weight)">Copy</button>
      </div>
    </template>
  </div>
</template>
<script>
import HeightAndWeight from '@/services/HeightAndWeight.js'
export default {
  name: 'HeightAndWeight',
  props: [],
  mixins: [],
  data () {
    return {
      LastUpdateWeightHeight: null,
      Height: null,
      Weight: null,
      dataFromHis: null
    }
  },
  created () {
    this.getHeightAndWeight()
  },
  methods: {
    copy (Height, Weight) {
      this.$emit('copy', {
        Height,
        Weight
      })
    },
    getHeightAndWeight () {
      new HeightAndWeight({hidemsg: true}).update(this.$route.params.Id, {}).then(response => {
        if (response) {
          this.Height = response.Height
          this.Weight = response.Weight
          this.LastUpdateWeightHeight = response.LastUpdateHeight || response.LastUpdateWeight
          this.dataFromHis = response.HeightWeightFromHis && response.HeightWeightFromHis.length ? response.HeightWeightFromHis[0] : null
        }
      })
    }
  }
}
</script>
