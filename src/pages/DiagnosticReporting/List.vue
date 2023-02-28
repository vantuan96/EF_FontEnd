<template>
  <div>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation">
          <router-link :to="{name: 'DiagnosticReporting-Pending'}">
            {{__t('Hàng đợi')}} <span v-if="count" class="badge badge-noti navbar-badge animation-s">{{count}}</span>
          </router-link>
        </li>
        <li role="presentation" class="active">
          <router-link :to="{name: 'DiagnosticReporting-List'}">
            {{__t('Xem kết quả')}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <div class="filter-block">
        <table class="table table-striped table-bordered v-table" id="customer-tbl">
          <thead>
            <tr>
              <td>
                {{__t('Tìm kiếm bệnh nhân')}}
              </td>
              <td>
                <input type="text" class="form-control" v-model="parameters.Search" :placeholder="__t('Nhập PID để tìm kiếm...')">
              </td>
              <td class="vertical-align-middle">
                {{__t('Trạng thái')}}
              </td>
              <td>
                <div v-if="Status.length">
                  <v-select :multi="true" v-model="parameters.Status" :items="Status" :placeholder="__t('home.trang_thai')"/>
                </div>
              </td>
              <td class="vertical-align-middle">
                <button class="btn v-yellow-btn" type="button" @click="btnGetData"><i aria-hidden="true" class="fa fa-filter"></i> {{__t('home.loc')}}</button>
                <button class="btn btn-default" type="button" @click="resetFilter"><i aria-hidden="true" class="fa fa-eraser"></i> {{__t('home.reset')}}</button>
              </td>
            </tr>
          </thead>
        </table>
        <table class="table table-striped table-bordered v-table bg-1375ba">
          <tbody>
            <template v-if="loading">
              <tr>
                <td colspan="9" class="text-center"><v-loading/></td>
              </tr>
            </template>
            <template v-else>
              <template v-if="results && results.length">
                <tr>
                  <th>STT</th>
                  <th>{{__t('Thông tin bệnh nhân')}}</th>
                  <th>{{__t('Thông tin dịch vụ')}}</th>
                  <th>{{__t('Ngày chỉ định')}}</th>
                  <th>{{__t('Người chỉ định')}}</th>
                  <th>{{__t('Ngày trả kết quả')}}</th>
                  <th>{{__t('Người trả kết quả')}}</th>
                  <th>{{__t('Trạng thái')}}</th>
                  <th>{{__t('Chi tiết')}}</th>
                  <th>{{__t('Điều dưỡng')}}</th>
                </tr>
                <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.Id" v-for="(item ,index) in results">
                  <td width="40" align="center" :class="{'no-visit': !item.VisitCode, 'no-pid': !item.PID}" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                  <td>
                    <div>PID: <b><pid :PID="item.PID" /><template v-if="item.VisitCode">({{item.VisitCode}})</template></b></div>
                    <div><b>{{item.Fullname}}</b> - {{item.Dob | formatDate2}}
                      <button v-if="item.Status === 2" v-permissions="'DR000006'" title="Mở khóa" class="btn v-green-btn btn-xs" @click="unlock(item)"><i aria-hidden="true" class="fa fa-edit"></i></button>
                      <button v-if="item.Status >= 1" v-permissions="'DR000006'" title="Xoá" class="btn btn-xs" style="background-color: #f39c12;" @click="confirmPopup(item.Id)"><i aria-hidden="true" class="fa fa-trash"></i></button>
                    </div>
                  </td>
                  <td>
                    {{item.ServiceCode}} - {{item.ServiceName}}
                  </td>
                  <td>{{item.CreatedAt | formatDateWithoutSecon}}</td>
                  <td><ad-Info :ad="item.CreatedBy" /></td>
                  <td v-if="item.ExamCompleted">{{item.ExamCompleted | formatDateWithoutSecon}}</td><td v-else>N/A</td>
                  <td><ad-Info :ad="item.UpdatedBy" /></td>
                  <td class="no-wrap"><i v-if="item.Status === 2" aria-hidden="true" class="fa fa-check v-green"></i> {{item.Status ? __t(Status[item.Status - 1].label) : ''}}</td>
                  <td>
                    <button v-if="item.Status === 1" class="btn v-yellow-btn" type="button" @click="view(item)"><i aria-hidden="true" class="fa fa-hand-o-right"></i> {{__t('Trả kết quả')}}</button>
                    <button v-if="item.Status === 2" class="btn" type="button" @click="view(item)"><i aria-hidden="true" class="fa fa-pencil-square-o"></i> {{__t('Chi tiết')}}</button>
                  </td>
                  <td>
                    <ButtonAdNurse :data="item" :areas="Areas" v-if="Areas"/>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="9" class="text-center">{{__t('Không có dữ liệu')}}</td>
                </tr>
              </template>
            </template>
          </tbody>
          <tfoot v-if="!loading && results && results.length">
            <tr>
              <td colspan="9">
                <div class="d-flex align-items-center flex-between">
                  <paginate
                  :clickHandler="getData"
                  :container-class="'pagination pagination-sm no-margin v-pagination'"
                  :next-text="'»'"
                  :page-count="parameters.pages"
                  :prev-text="'«'"
                  v-if="results && results.length > 0"
                  v-model="parameters.pageNumber">
                  </paginate>
                  <div>{{__t('Hiển thị')}}: {{results.length}}/{{total}} {{__t('dịch vụ')}}</div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <modal name="ViewDetail" transition="pop-out" id="ViewDetail" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="box v-model-content-popup" v-if="item">
        <div class="box-header text-center">
          <h3 class="box-title" v-if="item.Id">{{__t('Kết quả chẩn đoán')}} {{__t(item.VisitType === 'VIHC' ? '*' : '')}}</h3>
        </div>
        <div class="box-body padding-15">
          <table class="table v-table table-p-10">
            <tr>
              <td width="200px"><b>PID:</b></td>
              <td width="200px"><pid :PID="item.PID" /></td>
              <td width="150px"><b>{{__t('Họ tên bệnh nhân')}}:</b></td>
              <td>{{item.Fullname}}</td>
            </tr>
            <tr>
              <td><b>{{__t('Giới tính')}}:</b></td>
              <td>{{__t(GENDER[item.Gender])}}</td>
              <td><b>{{__t('Ngày sinh')}}:</b></td>
              <td>{{item.Dob | formatDate2}}</td>
            </tr>
            <tr>
              <td><b>{{__t('Loại khám')}}:</b></td>
              <td colspan="3">{{__t(item.VisitType === 'VIHC' ? 'VMHC' : item.VisitType)}}/ {{item.VisitCode}}</td>
            </tr>
            <tr>
              <td><b>{{__t('Ngày chỉ định')}}:</b></td>
              <td>{{item.CreatedAt | formatDateWithoutSecon}}</td>
              <td><b>{{__t('Bác sĩ chỉ định')}}:</b></td>
              <td><ad-Info :ad="item.CreatedBy" /></td>
            </tr>
            <tr>
              <td><b>{{__t('Tên chỉ định')}}:</b></td>
              <td colspan="3">{{item.ServiceCode}} - {{item.ServiceName}}</td>
            </tr>
            <tr>
              <td><b>{{__t('Ngày hoàn thành chỉ định')}}:</b></td>
              <td><v-date-time-picker :noclearable="true" :readonly="item.IsReadony" v-model="item.ExamCompleted" class=" select-boox" :format="vDateTimeFormat"/></td>
              <td><b>{{__t('Người hoàn thành')}}:</b></td>
              <td><ad-Info :ad="item.UpdatedBy" /></td>
            </tr>
            <tr>
              <td><b>{{__t('Chẩn đoán')}}:</b></td>
              <td colspan="3">{{item.InitialDiagnosis}}</td>
            </tr>
            <tr>
              <td><b>{{__t('Kỹ thuật')}}:</b></td>
              <td colspan="3"><textarea-autosize :readonly="item.IsReadony" class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="item.Technique"/></td>
            </tr>
            <tr>
              <td><b>{{__t('Mô tả')}}:</b></td>
              <td colspan="3"><textarea-autosize :readonly="item.IsReadony" class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="item.Findings"/></td>
            </tr>
            <tr>
              <td><b>{{__t('Kết luận')}}:</b></td>
              <td colspan="3"><textarea-autosize :readonly="item.IsReadony" class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="item.Impression"/></td>
            </tr>
          </table>
        </div>
        <div class="box-footer padding-15">
          <div class="row" v-if="item.IsReadony">
            <div class="col-sm-2 col-md-2"><button type="button"  class="btn btn-block" @click="close()"><i aria-hidden="true" class="fa fa-times-circle-o"></i> {{__t('Đóng')}}</button></div>
            <div class="col-sm-4 col-md-4"></div>
            <div class="col-sm-6 col-md-6" v-if="item.Status === 2"><button type="button" :class="{'disabled': !isValidate}" class="btn btn-block v-yellow-btn" @click="print()"><i aria-hidden="true" class="fa fa-print"></i> {{__t('In kết quả')}}</button></div>
          </div>
          <div class="row" v-else>
            <div class="col-sm-2 col-md-2"><button type="button"  class="btn btn-block" @click="close()"><i aria-hidden="true" class="fa fa-times-circle-o"></i> {{__t('Đóng')}}</button></div>
            <div class="col-sm-4 col-md-4" v-if="item.Status === 1"></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': !isValidate}" class="btn btn-block v-yellow-btn" @click="submit()"><i aria-hidden="true" class="fa fa-check-circle-o"></i> {{__t('Xác nhận trả kết quả')}}</button></div>
            <div class="col-sm-4 col-md-4" v-if="item.Status === 2"><button type="button" :class="{'disabled': !isValidate}" class="btn btn-block v-yellow-btn" @click="print()"><i aria-hidden="true" class="fa fa-print"></i> {{__t('In kết quả')}}</button></div>
          </div>
        </div>
        <Printer :Item="item" :Site="Site" v-if="PrintIsOpen"/>
      </div>
    </modal>
  </div>
</template>
<script>
import DiagnosticReporting from '@/services/DiagnosticReporting'
import SiteService from '@/services/Site'
import VSelect from '@/components/VSelect.vue'
import constants from '@/constants'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import MixinMasterData from '@/mixins/masterdata.js'
import Printer from './Print.vue'
import ButtonAdNurse from './ButtonAdNurse.vue'
const MODAL_WIDTH = 1280
export default {
  name: 'LIST',
  props: ['count'],
  mixins: [MixinMasterData],
  components: {
    VSelect, VDateTimePicker, Printer, ButtonAdNurse
  },
  data () {
    return {
      Areas: null,
      PrintIsOpen: false,
      Site: {},
      total: 0,
      VisitGroupTypes: {
        IPD: 'Nội trú',
        OPD: 'Khám ngoại trú',
        ED: 'Cấp cứu'
      },
      GENDER: constants.GENDER,
      modalWidth: MODAL_WIDTH,
      item: {},
      results: {
      },
      Status: [
        {label: 'Chưa trả kết quả', value: 1},
        {label: 'Đã trả kết quả', value: 2}
      ],
      parameters: {
        Search: null,
        Status: [],
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE
      },
      loading: true
    }
  },
  created () {
    this.getRawMasterDatas({Form: 'OHAREA'}, (data) => {
      data.forEach(item => {
        this.Areas = (this.Areas || []).concat(item.Items)
      })
    })
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
    if (this.$route.query.ItemId) {
      this.view({Id: this.$route.query.ItemId})
      setTimeout(() => {
        // this.$router.replace({'query': {ItemId: null}})
      }, 500)
    }
  },
  computed: {
    isValidate: function () {
      return this.item.Technique && this.item.Findings && this.item.Impression
    }
  },
  methods: {
    unlock (item) {
      this.$modal.show('dialog', {
        title: 'Mở khóa PHIẾU KẾT QUẢ CHẨN ĐOÁN',
        text: 'Thao tác này sẽ mở khóa PHIẾU KẾT QUẢ CHẨN ĐOÁN 24h tiếp theo cho bác sĩ ' + item.UpdatedBy,
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'OK',
            class: 'btn btn-warning',
            handler: () => {
              new DiagnosticReporting().update('/Unlock/' + item.Id).then(() => {
                this.toastedSuccess('Mở khóa thành công')
                this.reload()
              })
            }
          },
          {
            title: 'Hủy',
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    print () {
      this.PrintIsOpen = false
      new SiteService().all().then(sites => {
        this.PrintIsOpen = true
        this.Site = sites.find(e => e.ApiCode === this.item.SiteCode)
        setTimeout(() => {
          this.$htmlToPaper('print-me', false, '')
        }, 500)
      })
    },
    close () {
      this.$modal.hide('ViewDetail')
      if (this.$route.query.ItemId) {
        setTimeout(() => {
          this.$router.replace({'query': {ItemId: null}})
        }, 500)
      }
      this.getData()
    },
    submit () {
      new DiagnosticReporting().update('/Update/' + this.item.Id, {...this.item, ExamCompletedStr: this.item.ExamCompleted}).then(() => {
        // if (this.$route.query.ItemId) {
        //   setTimeout(() => {
        //     this.$router.replace({'query': {ItemId: null}})
        //   }, 500)
        // }
        this.toastedSuccess()
        // this.reload()
        this.item.Status = 2
      })
    },
    view (item) {
      new DiagnosticReporting().find(item.Id).then(({item}) => {
        if (!item.ExamCompleted) {
          item.ExamCompleted = moment(item.CreatedAt).format(process.env.DATETIME_FORMAT)
        } else {
          item.ExamCompleted = moment(item.ExamCompleted).format(process.env.DATETIME_FORMAT)
        }
        if (!item.Technique && item.Status === 1) {
          item.Technique = item.ServiceName
        }
        this.item = item
        this.item.IsReadonly = false
        this.$modal.show('ViewDetail')
      })
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        Status: (this.parameters.Status || []).map(e => { return e.value })
      })
    },
    resetFilter () {
      this.parameters = {
        Search: null,
        pageNumber: 1,
        pages: 1,
        StartAt: null,
        EndAt: null,
        PageSize: process.env.PAGE_SIZE
      }
      this.getData()
    },
    btnGetData () {
      this.parameters.pages = 1
      this.parameters.search = ''
      this.parameters.pageNumber = 1
      this.getData()
    },
    getData () {
      this.loading = true
      new DiagnosticReporting(this.updateQuery()).ByDoctor().then(response => {
        this.loading = false
        this.results = response.items
        var bonussssss = 1
        this.total = response.count
        if ((response.count % this.parameters.PageSize) === 0) {
          bonussssss = 0
        }
        this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    },
    // xác nhận xoá
    confirmPopup (Id) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Xác nhận huỷ trả kết quả!'),
        text: this.$t('Bạn có muốn huỷ kết quả đã trả này không?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn',
            handler: () => {
              new DiagnosticReporting().update('/Cancel/' + Id).then(() => {
                this.toastedSuccess('Xoá thành công')
                this.reload()
              })
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
