<template>
  <div class="main-content disablecopy">
    <template v-if="loaded" >
      <div v-if="DataSubmit">
        <customer-info v-if="DataSubmit.Customer" :data="DataSubmit.Customer"/>
          <div class="v-tab">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation">
                <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-Search', query: this.$route.params}">
                  {{__t('Chỉ định')}}<br/>
                </router-link>
              </li>
              <li role="presentation">
                <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-History', params: this.$route.params}">
                  {{__t('Lịch sử chỉ định')}}<br/>
                </router-link>
              </li>
              <li role="presentation" class="active">
                <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-ViHC', params: this.$route.params}">
                  {{__t('ViHC')}}<br/>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="tab-content mt-10">
            <div class="box form-content mb-10">
              <div class="flex align-center space-between mrb10" v-if="parameters">
                <div class="flex align-center">
                  <div class="fw600 mrr5 white-space" style="width: 99px;">{{__t('Tên dịch vụ')}}</div>
                  <VText style="width: 21vw;" class="mrr10" :placeholder="__t('Nhập')" :rows="'1'" v-model="parameters.Search"/>
                  <div class="fw600 mrr5 white-space">{{__t('Ngày tiếp nhận ')}}</div>
                  <VDateTimePicker5 :max="parameters.EndAt" :placeholder="__t('Từ ngày')" class="mrr10" :format="vDateTimeFormat" v-model="parameters.StartAt"/>
                  <VDateTimePicker5 :placeholder="__t('Đến ngày')" :format="vDateTimeFormat" v-model="parameters.EndAt"/>
                  <!-- <v-date-picker :max="parameters.EndAt" :placeholder="__t('Từ ngày')" class="mrr10" :format="vDateTimeFormat" v-model="parameters.StartAt"/> -->
                  <!-- <v-date-picker :placeholder="__t('Đến ngày')" :format="vDateTimeFormat" v-model="parameters.EndAt"/> -->
                </div>
                <div class="flex align-center">
                  <button class="mrl10 btn v-yellow-btn mrr5" type="button" @click="getData">{{__t('home.loc')}}</button>
                  <button class="btn btn-default" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
                </div>
              </div>
              <div class="flex align-center mrb10">
                <div class="fw600 mrr5 white-space" style="width: 99px;">{{__t('Lượt tiếp nhận ')}}</div>
                <VText style="width: 205px;" :type="'number'" :maxlength="10" :placeholder="__t('Nhập')" :rows="'1'" class="mrr10" v-model="parameters.VisitCode"/>
              </div>
              <table class="table table-striped table-bordered v-table none-row-curso" id="customer-tbl">
                <thead class="bg-1375ba">
                  <tr>
                    <th width="1px" class="text-center">{{__t('STT')}}</th>
                    <th class="text-center">{{__t('Thông tin dịch vụ')}}</th>
                    <th width="1" class="no-wrap">{{__t('Lượt tiếp nhận ')}}</th>
                    <th>{{__t('Khoa ')}}</th>
                    <th width="1" class="no-wrap">{{__t('Ngày tiếp nhận ')}}</th>
                    <th width="1" class="no-wrap">{{__t('Ngày tạo phiếu')}}</th>
                    <th width="1" class="no-wrap">{{__t('Người tạo phiếu')}}</th>
                    <th width="100px">{{__t('-/-')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="DataTable && DataTable.length === 0">
                  <tr>
                    <td colspan="8" class="text-center">{{ __t("Không có thông tin! ") }}</td>
                  </tr>
                  </template>
                  <template v-else v-for="(item, index) in DataTable">
                  <tr :key="index">
                    <td class="text-center">
                      {{ (parameters.PageNumber - 1) * parameters.PageSize + (index + 1) }}
                    </td>
                    <td>
                      <div>{{item.ServiceCode + ( (item.ServiceCode && item.ServiceViName) ? ' - ' : '') + __label({ViName: item.ServiceViName, EnName: item.ServiceEnName})}} <div v-if="item.ItemType === 0 || item.ItemType" class="box-type italic fs12" :class="item.ItemType === 1 ? 'box-type-2' : ''">{{__label(getNameType(item.ItemType))}}</div></div>
                    </td>
                    <td>{{item.VisitCode}}</td>
                    <td>{{item.Area}}</td>
                    <td>{{getFTime(item.CreatedAt)}}</td>
                    <td>{{getNgayTaoPhieu(item)}}</td>
                    <td><ad-info :ad="getNguoiTaoPhieu(item)"/></td>
                    <td class="text-center">
                      <div v-if="(item.ItemType === 0 && !item.Microbiology) || (item.ItemType === 1 && !item.Pathology)" class="btn v-white-btn full-width" type="button" @click="confirmCreate(item)">{{__t('Tạo phiếu')}}</div>
                      <div v-else class="btn v-yellow-btn full-width" type="button" @click="showPopupDetail(item)">{{__t('Chi tiết')}}</div>
                    </td>
                  </tr>
                  </template>
                </tbody>
                <tfoot v-if="DataTable && DataTable.length > 0">
                  <tr>
                    <td colspan="9">
                    <template>
                      <div class="flex space-between">
                      <div>
                        <paginate
                        :clickHandler="getData"
                        :container-class="'pagination pagination-sm no-margin v-pagination'"
                        :next-text="'»'"
                        :page-count="parameters.Pages"
                        :prev-text="'«'"
                        v-if="DataTable.length > 0"
                        v-model="parameters.PageNumber"
                        >
                        </paginate>
                      </div>
                      <div class="box-record">
                        <p>{{__t('Show')}}: {{ DataTable.length + "/" + count }} {{__t('dịch vụ')}}</p>
                      </div>
                      </div>
                    </template>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
      </div>
      <vi-khuan-nhuom-soi-popup :IsNew="IsNew" :readonly="readonly" :titlePopup="titlePopup" :ServiceCode="ServiceCode" :Id="Id" :Type="Type" :dataRow="dataRow" @handleUpdate="handleUpdate"/>
      <giai-phau-benh-popup :IsNew="IsNew" :readonly="readonly" :titlePopup="titlePopup" :ServiceCode="ServiceCode" :Id="Id" :Type="Type" :dataRow="dataRow" @handleUpdate="handleUpdate"/>
    </template>
    <div v-else class="text-center">
      <v-loading/>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import constants from '@/constants'
// import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import ViKhuanNhuomSoiPopup from './popup/ViKhuanNhuomSoiPopup.vue'
import GiaiPhauBenhPopup from './popup/GiaiPhauBenhPopup.vue'
import PathologyMicrobiology from '@/services/PathologyMicrobiology'
import MicrobiologyPopup from './MicrobiologyPopup.vue'
import moment from 'moment'
import CustomerInfo from './CustomerInfo.vue'
import VText from '@/components/Form/Input/VText.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
export default {
  name: 'ViHC',
  mixins: [MixinPlaceDiagnostics],
  props: ['VisitId'],
  data () {
    return {
      DataSubmit: {
        Charge: {
          Priority: 'R'
        }
      },
      DataTable: [],
      loaded: false,
      RickGroup: constants.RISKGROUP,
      Id: '',
      Type: null,
      count: '',
      parameters: {
        hidemsg: true,
        notRedirect: true,
        PageNumber: 1,
        Pages: 1,
        Type: '2',
        StartAt: moment(moment().subtract(7, 'day').startOf('day')).format(process.env.DATETIME_FORMAT),
        EndAt: new Date(),
        Search: '',
        PageSize: 20,
        VisitCode: ''
      },
      dataRow: null,
      readonly: false,
      titlePopup: '',
      ServiceCode: '',
      IsNew: false
    }
  },
  components: {
    VSelect, VDatePicker, ViKhuanNhuomSoiPopup, MicrobiologyPopup, GiaiPhauBenhPopup, CustomerInfo, VText, VDateTimePicker5
  },
  watch: {
  },
  mounted () {
    // console.log('disablecopy', $('.disablecopy'))
    $('.disablecopy' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      console.log('e', e)
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    this.getData()
  },
  computed: {
  },
  methods: {
    getData (Id) {
      if (this.parameters.StartAt) {
        this.parameters.StartAt = `${this.parameters.StartAt}`
        if (this.parameters.StartAt.includes('Invalid')) {
          this.parameters.StartAt = ''
        }
        if (this.parameters.StartAt.includes('(')) {
          this.parameters.StartAt = this.$options.filters.formatDateWithoutSecon(this.parameters.StartAt)
        }
      }
      if (this.parameters.EndAt) {
        this.parameters.EndAt = `${this.parameters.EndAt}`
        if (this.parameters.EndAt.includes('Invalid')) {
          this.parameters.EndAt = ''
        }
        if (this.parameters.EndAt.includes('(')) {
          this.parameters.EndAt = this.$options.filters.formatDateWithoutSecon(this.parameters.EndAt)
        }
      }
      new PathologyMicrobiology(this.parameters)
        .find(this.$route.params.PID)
        .then(response => {
          this.DataSubmit = response
          this.DataTable = response.items
          this.count = response.count
          console.log('response', response)
          localStorage.setItem('AUTO_FOCUS_PXN_005', (response.AUTO_FOCUS_PXN_KHOI_TE_BAO))
          localStorage.setItem('AUTO_FOCUS_PXN_004', (response.AUTO_FOCUS_PXN_MO_BENH_HOC))
          localStorage.setItem('AUTO_FOCUS_PXN_006', (response.AUTO_FOCUS_PXN_SINH_THIET_LANH))
          localStorage.setItem('AUTO_FOCUS_PXN_002', (response.AUTO_FOCUS_PXN_TE_BAO))
          localStorage.setItem('AUTO_FOCUS_PXN_003', (response.AUTO_FOCUS_PXN_PHU_KHOA))
          localStorage.setItem('MICROBIOLOGY_SERVICE_01', (response.MicrobiologyService01.join(',')))
          localStorage.setItem('MICROBIOLOGY_SERVICE_02', (response.MicrobiologyService02.join(',')))
          console.log('localStorage', localStorage)
          if (Id) {
            response.items.find(e => {
              if (e.Id === Id) {
                console.log('eee: ', e)
                this.showPopupDetail(e)
              }
            })
          }
          this.loaded = true
        }).catch(e => {
          console.log(e)
          this.loaded = true
        })
    },
    resetFilter () {
      this.parameters = {
        hidemsg: true,
        notRedirect: true,
        PageNumber: 1,
        Pages: 1,
        Type: '2',
        StartAt: '',
        EndAt: '',
        Search: '',
        PageSize: 20,
        VisitCode: ''
      }
      this.getData()
    },
    showPopupDetail (item) {
      this.Id = ''
      this.titlePopup = ''
      this.ServiceCode = item.ServiceCode
      this.IsNew = false
      if (item.ServiceCode) {
        this.titlePopup = item.ServiceCode
      }
      if (item.ServiceViName) {
        if (this.titlePopup) {
          this.titlePopup += ' - '
        }
        this.titlePopup += this.__label({ViName: item.ServiceViName, EnName: item.ServiceEnName})
      }
      this.Type = item.ItemType
      if (item.Microbiology) {
        this.Id = item.Microbiology.Id
      }
      if (item.Pathology) {
        this.Id = item.Pathology.Id
      }
      new PathologyMicrobiology()
        .find('Detail/' + item.ItemType + '/' + item.Id).then(res => {
          this.dataRow = res
          this.readonly = res.IsReadonly
          if (item.ItemType === 0) {
            if (res.IsReadonly && res.MicrobiologyDto && res.MicrobiologyDto.CreatedAt === res.MicrobiologyDto.UpdatedAt) {
              console.log('isNew1')
              this.IsNew = true
            }
            this.$modal.show('ViKhuanNhuomSoi')
          }
          if (item.ItemType === 1) {
            if (res.IsReadonly && res.PathologyDto && res.PathologyDto.CreatedAt === res.PathologyDto.UpdatedAt) {
              console.log('isNew2')
              this.IsNew = true
            }
            this.$modal.show('GiaiPhauBenh')
          }
        })
    },
    getNameType (num) {
      let name = {
        ViName: '',
        EnName: ''
      }
      if (num === 0) {
        name = {
          ViName: 'Vi sinh',
          EnName: 'Vi sinh'
        }
      }
      if (num === 1) {
        name = {
          ViName: 'GPB',
          EnName: 'GPB'
        }
      }
      return name
    },
    getNgayTaoPhieu (item) {
      if (item.Microbiology) {
        return this.getFTime(item.Microbiology.CreatedAt)
      }
      if (item.Pathology) {
        return this.getFTime(item.Pathology.CreatedAt)
      }
      return ''
    },
    getNguoiTaoPhieu (item) {
      if (item.Microbiology) {
        return this.getFTime(item.Microbiology.CreatedBy)
      }
      if (item.Pathology) {
        return this.getFTime(item.Pathology.CreatedBy)
      }
      return ''
    },
    confirmCreate (item) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Bạn đồng ý tạo phiếu?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create(item)
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    create (item) {
      new PathologyMicrobiology()
        .update('/Create/' + item.ItemType + '/' + item.Id)
        .then(res => {
          this.toastedSuccess()
          this.getData(item.Id)
        })
    },
    handleUpdate (data) {
      if (data) {
        new PathologyMicrobiology()
          .update('/Update/' + data.Type + '/' + data.Id, data.form).then(res => {
            this.toastedSuccess()
            this.$modal.hide('ViKhuanNhuomSoi')
            this.reload()
          }).catch(e => {
            console.log(e)
          })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .box-type {
    background: #28A745;
    color: #fff;
    border-radius: 4px;
    height: 22px;
    padding: 5px;
    display: inline-block;
    line-height: 12px;
    font-weight: 600;
  }
  .box-type-2 {
    background: #DC07FF;
  }
  .none-row-curso tbody tr {
    cursor: context-menu!important;
  }
</style>
