<template>
  <div>
    <div class="box box-table" v-if="value && EOCInfo && !EOCInfo.NoEOC">
      <div class="box-body">
        <div class="row">
          <div class="col-md-12">
            <div :value="item" :key="index + '-' + item.Code"  v-for="(item, index) in value.Items" class="flex-box flex-center">
              <label>{{__label(item)}}:</label>
              <CheckboxValue v-model="item.Value" v-if="readonly || (EOCInfo.AcceptBy)"/>
              <div class="flex-box flex-center" v-else>
                <div class="v-checkbox">
                  <input type="checkbox" :id="item.Code + 'radio-' + index" v-model="item.Value">
                  <label :for="item.Code + 'radio-' + index"></label>
                </div>
              </div>
            </div>
            <p class="cursor" v-if="EOCInfo.AcceptBy" @click="open">{{__t('Bệnh nhân')}} <b>{{__label(EOCInfo.Status)}}</b> {{__t('tại khu vực nội soi')}}, {{__t('Tiếp nhận bởi')}}: <AdInfo :ad="EOCInfo.AcceptBy" /> <br/><i v-if="!readonly" class="link-text">{{__t('Xem chi tiết')}}</i></p>
            <p v-else v-html="$t('Bác sĩ vui lòng chọn <b>Chờ KQ CLS</b> để khu vực nội soi có thể tiếp nhận bệnh nhân')"></p>
            <div v-if="EOCInfo.AcceptBy">
              <modal name="histoyr-modalxx" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
                <div class="box v-model-content-popup">
                  <div class="box-body padding-15" v-if="hasPopup">
                    <EOCView :VisitId="EOCInfo.VisitId" />
                  </div>
                  <div class="box-footer padding-15">
                    <div class="row">
                      <div class="col-md-12"><button type="button" class="btn btn-block" @click="close">{{__t('Quay lại')}}</button></div>
                    </div>
                  </div>
                </div>
              </modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import EOCView from '@/pages/EOC/View'
const MODAL_WIDTH = 1280
export default {
  name: 'Endoscopyyyyyyy',
  props: ['value', 'readonly', 'EOCInfo'],
  components: {
    EOCView
  },
  mixins: [],
  data () {
    return {
      isFirst: true,
      modalWidth: MODAL_WIDTH,
      hasPopup: true
    }
  },
  watch: {
    value: {
      handler (a, b) {
        if ((this.value && this.EOCInfo && !this.EOCInfo.NoEOC) && !this.EOCInfo.AcceptBy && this.value.Items[0].Value) {
          $(document).find('.status-EDWR,.status-OPDWR').click()
        }
        if (this.isFirst) {
          this.isFirst = false
        }
      },
      deep: true
    }
  },
  mounted () {
    console.log('vao day ne')
  },
  methods: {
    close () {
      this.hasPopup = false
      this.$modal.hide('histoyr-modalxx')
    },
    open () {
      if (this.readonly) return false
      this.hasPopup = true
      this.$modal.show('histoyr-modalxx')
    }
  }
}
</script>
