<template>
  <span>
    <a v-if="!readonly" @click="openPopup(true)" class="italic" style="cursor: pointer; text-decoration: underline;">{{__t('Xem chi tiết')}}</a>
    <modal :name="popupname" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
      <div class="box v-model-content-popup">
      <div class="box-body padding-15" v-if="isOpen">
        <!-- {{visitId}} -->
        <template v-if="isEOC">
          <!-- aaaa -->
          <eoc-viewer :VisitId="visitId"/>
        </template>
        <template v-else>
          <opd-viewer :VisitId="visitId"/>
        </template>
      </div>
      <div class="box-footer padding-15">
        <div class="row">
        <div class="col-md-12"><button type="button" class="btn btn-block" @click="openPopup()">{{__t('Quay lại')}}</button></div>
        </div>
      </div>
      </div>
    </modal>
  </span>
</template>

<script>
import OPDView from '@/pages/OPD/ViewPreAnesthesiaConsultation'
import EOCView from '@/pages/EOC/ViewOutpatientExaminationNote'
// import EventBus from '@/lib/eventBus'
// import _ from 'lodash'
const MODAL_WIDTH = 1280

export default {
  name: 'DetailInfo',
  props: ['visitId', 'isEOC', 'readonly'],
  components: {
    'opd-viewer': OPDView,
    'eoc-viewer': EOCView
  },
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      isOpen: false,
      popupname: ''
    }
  },
  mounted () {
    // EventBus.$on('sendDataTM', this.handler)
    // EventBus.$on('sendDataHH', this.handler)
    // EventBus.$on('sendDataK', this.handler)
    console.log(this.receiveVisitId, 'join mounted')
    // this.receiveVisitId = ''
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  watch: {
    receiveVisitId: { // watch it
      immediate: true,
      handler (val, oldval) {
        console.log(val, oldval, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      }
    }
  },
  created () {
    this.popupname = 'histoyr-' + this.visitId
  },
  destroyed () {
    // EventBus.$off('sendDataTM', this.handler)
  },
  computed: {
  },
  methods: {
    openPopup (isOpen) {
      if (isOpen) {
        setTimeout(() => {
          this.$modal.show(this.popupname)
        }, 500)
      } else {
        this.$modal.hide(this.popupname)
      }
      this.isOpen = isOpen
    }
  }
}
</script>
