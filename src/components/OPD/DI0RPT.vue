<template>
  <div class="SyncPrincipalTestTable">
    <template v-if="showLab">
    <div class="ed-info box-collapse" :class="{'open': open1}" v-if="datas">
      <div class="ed-customer-title">
        <b>{{__t('Kết quả xét nghiệm')}}</b>
      </div>
      <div class="box-collapse-content v-box-collapse">
        <div class="panel-group" id="accordionXetNghiem" role="tablist" aria-multiselectable="true" v-if="datas['XetNghiem'] && datas['XetNghiem'].length">
          <template v-for="(xn, indexxn) in datas['XetNghiem']">
            <div :key="indexxn" :data="xn" class="panel panel-default" v-if="indexxn < maxKQXN">
              <div class="panel-heading" role="tab" :id="'headingOne-' + indexxn">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" :class="{'collapsed': indexxn >= numberOpen}"  :href="'#collapseboxxn-' + indexxn" aria-expanded="true" :aria-controls="'collapseboxxn-' + indexxn">
                    {{xn.Date}} <i class="fa fa-angle-double-down" aria-hidden="true"></i> <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                  </a>
                </h4>
              </div>
              <div :id="'collapseboxxn-' + indexxn" class="panel-collapse collapse" :class="{'in': indexxn < numberOpen}" role="tabpanel" aria-labelledby="headingOne">
                <table class="table mini-tablex">
                  <thead>
                    <tr class="color000">
                      <th>{{__t('Tên xét nghiệm')}}</th>
                      <th>{{__t('Kết quả')}}</th>
                      <th>{{__t('Tham chiếu')}}</th>
                      <th>{{__t('Đơn vị')}}</th>
                      <th>{{__t('Thời gian')}}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody :key="index" v-for="(item,index) in xn.Categories">
                    <tr>
                      <th colspan="6" class="bgffffff"><span class="textbgDFF9F7">{{item.Name}}</span></th>
                    </tr>
                    <template v-for="(it, ind) in item.Profiles">
                      <tr :key="ind + makeid()" v-if="it.Name" class="bgfff">
                        <td colspan="6">
                          <div><b>{{it.Name}}</b></div>
                        </td>
                      </tr>
                      <tr :key="$index + makeid()" v-for="($item, $index) in it.Datas" class="bgfff">
                        <td>{{$item.TestName}}</td>
                        <td :class="statusClass($item.Status)">{{$item.Result}}</td>
                        <td><p>{{$item.NormalRange}}</p></td>
                        <td>{{$item.Unit}}</td>
                        <td>{{$item.UpdateTime}}</td>
                        <td width="1"><button v-if="!isReadonly" :class="{'btn btn-flat btn-xs': true, 'disabled': ($item.Copyed && !copys)}" @click="copy($item, $event)">Copy</button></td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <div class="text-center" v-if="datas['XetNghiem'].length - maxKQXN > 0"><button class="btn v-green-btn v-bottom-btn" @click="maxKQXN = maxKQXN + 5"><i aria-hidden="true" class="fa fa-angle-double-down"></i> Xem thêm</button></div>
        </div>
        <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có kết quả xét nghiệm')}}</h5>
      </div>
      <div class="box-action hidden" @click="collapse()">
        <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
        <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
      </div>
    </div>
    </template>
    <template v-if="showXray">
    <div class="ed-info box-collapse" :class="{'open': open2}" v-if="datas && !onlyXn">
      <div class="ed-customer-title">
        <b>{{__t('Kết quả chẩn đoán hình ảnh')}}</b>
      </div>
      <div class="box-collapse-content v-box-collapse">
        <div class="panel-group" id="accordionCDHA" role="tablist" aria-multiselectable="true"  v-if="datas['CDHA'] && datas['CDHA'].length">
          <template v-for="(item, index) in datas['CDHA']">
            <div :key="index" :data="item" class="panel panel-default" v-if="index < maxCDHA">
              <div class="panel-heading" role="tab" :id="'headingOne-' + index">
                <h4 class="panel-title" @click="getResult(item)">
                  <a role="button" data-toggle="collapse" :class="{'collapsed': index >= numberOpen}"  :href="'#collapsebox-' + index" aria-expanded="true" :aria-controls="'collapsebox-' + index">
                    {{item.Date}} <i class="fa fa-angle-double-down" aria-hidden="true"></i> <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                  </a>
                </h4>
              </div>
              <div :id="'collapsebox-' + index" class="panel-collapse collapse" :class="{'in': index < numberOpen}" role="tabpanel" aria-labelledby="headingOne">
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
                      <td>{{it.TenDichVu}}</td>
                      <td><ad-info :ad="it.NguoiTraKQ"/></td>
                      <td><template v-if="!it.LoadingData">{{it.KetLuan}}</template><template v-else>Đang tải....</template><button v-if="it.html" class="btn btn-flat btn-xs" @click="viewMoTa(it)">{{__t('Xem mô tả chi tiết')}}</button></td>
                      <td width="1"><button v-if="!isReadonly" :class="{'btn btn-flat btn-xs': true, 'disabled': (it.Copyed && !copys)}" @click="copy(it, $event)">Copy</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <div class="text-center" v-if="datas['CDHA'].length - maxCDHA > 0"><button class="btn v-green-btn v-bottom-btn" @click="maxCDHA = maxCDHA + 5"><i aria-hidden="true" class="fa fa-angle-double-down"></i> Xem thêm</button></div>
        </div>
        <h5 class="text-center msg-no-data" v-else>{{__t('Chưa có kết quả CĐHA')}}</h5>
      </div>
      <div class="box-action hidden" @click="collapse2()">
        <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
        <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
      </div>
    </div>
    </template>
    <DiagnosticReporting v-if="datas && datas.DiagnosticReporting" :datas="datas.DiagnosticReporting" :isReadonly="isReadonly" @onCopyText="copyText"/>
    <modal name="showdetail" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="box v-model-content-popup" v-if="cdhh">
        <div class="box-header text-center">
          <h3 class="box-title">{{cdhh.TenDichVu}}</h3>
        </div>
        <div class="box-body padding-15">
          <p v-html="cdhh.html" id="PrincipalTestTable-cdha-content" class="PrincipalTestTable-cdha-content"></p>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="$modal.hide('showdetail')">{{__t('btn.huy')}}</button></div>
            <div class="col-sm-6 col-md-6" v-if="!isReadonly"><button v-if="cdhh.MoTa" type="button" class="btn btn-block v-yellow-btn" @click="copy2()">Copy</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import DiagnosticReporting from '@/components/DiagnosticReporting.vue'
const MODAL_WIDTH = 980
export default {
  name: 'DI0RPT-VIEW',
  props: ['dataJson', 'hasFormat', 'isReadonly', 'value', 'onlyXn', 'copyAllData', 'Results', 'copys'],
  components: {
    DiagnosticReporting
  },
  data () {
    return {
      datas: null,
      open1: true,
      open2: true,
      maxKQXN: 5,
      maxCDHA: 5,
      numberOpen: 0,
      text: null,
      cdhh: {},
      clipboard: {
        XetNghiem: [
          {
            name: 'HÓA SINH/BIOCHEMISTRY',
            value: 'Glucose*: 4.1 - 5.9'
          }
        ],
        CDHA: []
      }
    }
  },
  computed: {
    showLab: function () {
      return !this.Results || this.Results.includes('lab')
    },
    showXray: function () {
      return !this.Results || this.Results.includes('xray')
    }
  },
  watch: {
    dataJson: function (val) {
      this.datas = this.JSONParse(this.dataJson)
    }
  },
  created () {
    this.datas = this.JSONParse(this.dataJson)
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
  },
  methods: {
    viewMoTa (item) {
      this.cdhh = item
      this.$modal.show('showdetail')
    },
    collapse () {
      this.open1 = !this.open1
    },
    collapse2 () {
      this.open2 = !this.open2
    },
    copy2 () {
      this.selectText()
    },
    // copyDivToClipboard() {
    //     var range = document.createRange();
    //     range.selectNode(document.getElementById("a"));
    //     window.getSelection().removeAllRanges(); // clear current selection
    //     window.getSelection().addRange(range); // to select text
    //     document.execCommand("copy");
    //     window.getSelection().removeAllRanges();// to deselect
    // },
    selectText () {
      var sel, range
      var el = document.getElementById('PrincipalTestTable-cdha-content')
      if (window.getSelection && document.createRange) {
        sel = window.getSelection()
        if (sel.toString() === '') {
          window.setTimeout(() => {
            range = document.createRange()
            range.selectNodeContents(el)
            sel.removeAllRanges()
            sel.addRange(range)
            var text = window.getSelection().toString()
            if (text) {
              this.$emit('copy', (text.replace(/\n\s*\n\s*\n/g, '\n\n')))
            }
            setTimeout(() => {
              this.$modal.hide('showdetail')
            }, 500)
          }, 1)
        }
      } else if (document.selection) {
        sel = document.selection.createRange()
        if (sel.text === '') {
          range = document.body.createTextRange()
          range.moveToElementText(el)
          range.select()
          this.$emit('copy', (window.getSelection().toString()))
          setTimeout(() => {
            this.$modal.hide('showdetail')
          }, 500)
        }
      }
    },
    copyText (t) {
      this.$emit('copy', t)
    },
    getResult (item) {
      item.loading = !item.loading
      var ReportIds = []
      item.Datas.forEach(e => {
        if (e.ReportId && item.loading) {
          ReportIds.push(e.ReportId)
          e.LoadingData = true
        }
      })
      setTimeout(() => {
        if (ReportIds.length) {
          this.autoLoadOPDOENPT0(ReportIds, item)
        }
      }, 100)
    },
    autoLoadOPDOENPT0 (reportIds, item) {
      new OutpatientExaminationNote().create({report_ids: reportIds}, 'SyncRISReport').then(response => {
        this.datas['CDHA'].forEach(e => {
          if (e.Id === item.Id) {
            e.Datas.forEach(e => {
              let report = response.find(re => re.report_id === e.ReportId) || {}
              e.KetLuan = report.ket_luan || 'N/A'
              e.MoTa = report.MoTa
              var html = report.html
              if (html) {
                html = html.replace(/<template/ig, '<div')
                html = html.replace(/<\/template/ig, '</div')
                html = html.replace(/<Template/ig, '<div')
                html = html.replace(/<\/Template/ig, '</div')
                html = html.replace(/<TEMPLATE/ig, '<div')
                html = html.replace(/<\/TEMPLATE/ig, '</div')
              } else {
                html = report.MoTa
              }
              e.html = html
              e.LoadingData = false
            })
          }
        })
        setTimeout(() => {
          this.$emit('input', JSON.stringify(this.datas))
        }, 200)
      })
    },
    copy (item, $event) {
      if (item.Copyed && !this.copys) return false
      item.Copyed = true
      var itemClone = this.cloneObj(item)
      if (this.copyAllData) {
        this.$emit('copy', itemClone, itemClone.TenDichVu ? 1 : 2)
        return
      }
      if (!itemClone.KetLuan) {
        itemClone.KetLuan = 'N/A'
      }
      var str = ''
      if (itemClone.TenDichVu) {
        str = this.trim(itemClone.TenDichVu + ': ' + itemClone.KetLuan.replace(/\r\n\r\n/g, ''))
        this.$emit('copy', str, 1)
      } else {
        str = this.trim(itemClone.TestName + ': ' + (itemClone.Result || 'N/A') + ' ' + (itemClone.Unit || ''))
        this.$emit('copy', str, 2)
      }
    },
    statusClass (status) {
      if (status === -1) {
        return null
      }
      return ['warning', 'default', 'danger', 'info'][status]
    }
  }
}
</script>
