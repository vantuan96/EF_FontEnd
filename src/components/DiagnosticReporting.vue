<template>
  <div>
    <div class="ed-info box-collapse" :class="{'open': open}">
      <div class="ed-customer-title">
        <b>{{__t('Kết quả cận lâm sàng')}}</b>
      </div>
      <div class="box-collapse-content v-box-collapse">
        <div class="panel-group" id="accordionDiagnosticReporting" role="tablist" aria-multiselectable="true"  v-if="datas && datas.length">
          <template v-for="(item, index) in datas">
            <div :key="index" :data="item" class="panel panel-default" v-if="index < maxDiagnosticReporting">
              <div class="panel-heading" role="tab" :id="'headingOne-' + index">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" :class="{'collapsed': index >= numberOpen}"  :href="'#collapseboxxxxx-' + index" aria-expanded="true" :aria-controls="'collapseboxxxxx-' + index">
                    {{item.Date}} <i class="fa fa-angle-double-down" aria-hidden="true"></i> <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                  </a>
                </h4>
              </div>
              <div :id="'collapseboxxxxx-' + index" class="panel-collapse collapse" :class="{'in': index < numberOpen}" role="tabpanel" aria-labelledby="headingOne">
                <table class="table mini-tablex">
                  <thead>
                    <tr class="color000">
                      <th width="20%">{{__t('Tên dịch vụ')}}</th>
                      <th width="1" class="no-wrap">{{__t('Người trả kết quả')}}</th>
                      <th>{{__t('Kết luận')}}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="i" v-for="(it,i) in item.Datas" class="bgfff">
                      <td>{{it.ServiceName}}</td>
                      <td><ad-info :ad="it.NguoiTraKQ"/></td>
                      <td>{{it.Impression}} <button class="btn btn-flat btn-xs" @click="viewMoTa(it)" v-if="it.Findings">{{__t('Xem mô tả chi tiết')}}</button></td>
                      <td width="1"><button v-if="!isReadonly" :class="{'btn btn-flat btn-xs': true, 'disabled': it.Copyed}" @click="copy(it.Impression, $event)">Copy</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <div class="text-center" v-if="datas.length - maxDiagnosticReporting > 0"><button class="btn v-green-btn v-bottom-btn" @click="maxDiagnosticReporting = maxDiagnosticReporting + 5"><i aria-hidden="true" class="fa fa-angle-double-down"></i> Xem thêm</button></div>
        </div>
        <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có kết quả CLS')}}</h5>
    </div>
    <div class="box-action hidden" @click="collapse()">
      <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
      <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
    </div>
    </div>
    <modal name="ShowdetailDiagnosticReporting" transition="pop-out" height="auto" :clickToClose="true" :width="modalWidth">
      <div class="box v-model-content-popup" v-if="itemViewDetail">
        <div class="box-header text-center">
          <h3 class="box-title">{{itemViewDetail.ServiceName}}</h3>
        </div>
        <div class="box-body padding-15">
          <p><b>{{__t('Kỹ thuật')}}:</b> {{itemViewDetail.Technique}}</p>
          <p><b>{{__t('Mô tả')}}:</b> {{itemViewDetail.Findings}}</p>
          <p><b>{{__t('Kết luận')}}:</b> {{itemViewDetail.Impression}}</p>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn float-left" @click="$modal.hide('ShowdetailDiagnosticReporting')">{{__t('Đóng')}}</button></div>
            <div class="col-sm-6 col-md-6" v-if="!isReadonly"><button type="button" class="btn btn-block v-yellow-btn" @click="copyAll()">Copy</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
const MODAL_WIDTH = 980
export default {
  name: 'DiagnosticReporting',
  props: ['datas', 'isReadonly'],
  data () {
    return {
      open: true,
      maxDiagnosticReporting: 5,
      numberOpen: 0,
      itemViewDetail: null,
      modalWidth: 970
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
  },
  methods: {
    copyAll () {
      var arr = [
        'Kỹ thuật: ' + this.itemViewDetail.Technique,
        'Mô tả: ' + this.itemViewDetail.Findings,
        'Kết luận: ' + this.itemViewDetail.Impression
      ]
      this.$emit('onCopyText', arr.join('\n'))
      this.$modal.hide('ShowdetailDiagnosticReporting')
    },
    copy (txxt) {
      this.$emit('onCopyText', txxt)
    },
    viewMoTa (item) {
      this.itemViewDetail = item
      this.$modal.show('ShowdetailDiagnosticReporting')
    },
    collapse () {
      this.open = !this.open
    }
  }
}
</script>
