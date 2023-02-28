<template>
  <modal name="tpc-modal" transition="pop-out" :height="modalHeight" :scrollable="true" :width="modalWidth" :clickToClose="false" class="full-modal">
    <div class="box v-model-content-popup">
      <div class="box-header text-center">
        <h3 class="box-title">{{__t('ETR.chon_than_phien_chinh')}}</h3>
      </div>
      <div class="box-content text-center masonry">
        <div class="box box-solid" :key="key" :data="item" v-for="(item, key) in MASTERDATA">
          <div class="box-header with-border">
            <h3 class="box-title">{{item.ViName}}</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <ul class="list-unstyled boder-list">
              <li :key="k" :data="it"  v-for="(it, k) in item.Items">{{it.ViName}}</li>
            </ul>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import MixinMasterData from '../mixins/masterdata.js'
export default {
  name: 'TPC-VIEW',
  mixins: [MixinMasterData],
  props: ['EdId'],
  data () {
    return {
      Datas: false,
      modalWidth: '100%',
      modalHeight: window.innerHeight
    }
  },
  created () {
    this.getMasterDatas({Form: 'TPC'}, () => {})
  },
  computed: {
  },
  methods: {
    getData () {
    },
    open (value, key) {
      this.$modal.show('tpc-modal')
    }
  }
}
</script>
