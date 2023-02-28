<template>
  <div>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active">
          <router-link :to="{name: 'DiagnosticReporting-Pending'}">
            {{__t('Hàng đợi')}} <span v-if="count" class="badge badge-noti navbar-badge animation-s">{{count}}</span>
          </router-link>
        </li>
        <li role="presentation">
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
              <td colspan="2">
                {{__t('Tìm kiếm bệnh nhân')}}
              </td>
              <td>
                <input type="text" class="form-control" v-model="parameters.Search" :placeholder="__t('Nhập PID để tìm kiếm...')">
              </td>
              <td class="vertical-align-middle">
                {{__t('Ngày chỉ định')}}
              </td>
              <td class="w1" colspan="2">
                <div class="d-flex">
                  <v-date-picker v-model="parameters.StartAt" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
                  <v-date-picker v-model="parameters.EndAt" :format="vDateTimeFormat" :placeholder="__t('Đến ngày')"/>
                </div>
              </td>
              <td rowspan="2" class="vertical-align-middle">
                <button class="btn v-yellow-btn" type="button" @click="btnGetData"><i aria-hidden="true" class="fa fa-filter"></i> {{__t('home.loc')}}</button>
                <button class="btn btn-default" type="button" @click="resetFilter"><i aria-hidden="true" class="fa fa-eraser"></i> {{__t('home.reset')}}</button>
              </td>
            </tr>
            <tr>
              <td colspan="2">{{__t('Nơi chỉ định')}}</td>
              <td>
                <input type="text" class="form-control" v-model="parameters.AreaName" :placeholder="__t('Nhập nơi chỉ định')">
              </td>
              <td class="vertical-align-middle">{{__t('Người chỉ định')}}</td>
              <td colspan="2">
                <users-ad v-model="parameters.User" ref="userAd" :field="'Username'"  :placeholder="__t('Nhập người chỉ định')"/>
              </td>
            </tr>
          </thead>
        </table>
        <table class="table table-striped table-bordered v-table bg-1375ba">
          <tbody>
            <template v-if="loading">
              <tr>
                <td colspan="7" class="text-center"><v-loading/></td>
              </tr>
            </template>
            <template v-else>
              <template v-if="results && results.length">
                <tr>
                  <th>STT</th>
                  <th>{{__t('Ngày chỉ định')}}</th>
                  <th>{{__t('Thông tin bệnh nhân')}}</th>
                  <th>{{__t('Thông tin dịch vụ')}}</th>
                  <th>{{__t('Người chỉ định')}}</th>
                  <th>{{__t('Nơi chỉ định')}}</th>
                  <th>{{__t('Tiếp nhận')}}</th>
                  <th>{{__t('Điều dưỡng')}}</th>
                </tr>
                <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.Id" v-for="(item ,index) in results">
                  <td width="40" align="center" :class="{'no-visit': !item.VisitCode, 'no-pid': !item.PID}" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                  <td>{{item.CreatedAt | formatDateWithoutSecon}}</td>
                  <td>
                    <div>PID: <b><pid :PID="item.PID" /><template v-if="item.VisitCode">({{item.VisitCode}})</template></b></div>
                    <div><b>{{item.Fullname}}</b> - {{item.Dob | formatDate2}}</div>
                  </td>
                  <td>
                    {{item.ServiceCode}} - {{item.ServiceName}}
                  </td>
                  <td><ad-Info :ad="item.CreatedBy" /></td>
                  <td>
                    {{item.AreaName}}
                  </td>
                  <td>
                    <button class="btn v-yellow-btn" type="button" @click="pick(item)"><i aria-hidden="true" class="fa fa-gavel"></i> {{__t('Trả kết quả')}}</button>
                  </td>
                  <td>
                    <ButtonAdNurse :data="item" :areas="Areas" v-if="Areas"/>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="7" class="text-center">{{__t('Không có dữ liệu')}}</td>
                </tr>
              </template>
            </template>
          </tbody>
          <tfoot v-if="!loading && results && results.length">
            <tr>
              <td colspan="7">
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
  </div>
</template>
<script>
import moment from 'moment'
import VDatePicker from '@/components/VDateTimePicker.vue'
import DiagnosticReporting from '@/services/DiagnosticReporting'
import ButtonAdNurse from './ButtonAdNurse.vue'
import MixinMasterData from '@/mixins/masterdata.js'

export default {
  name: 'LISTPENDING',
  props: ['count'],
  mixins: [MixinMasterData],
  components: {
    VDatePicker, ButtonAdNurse
  },
  data () {
    return {
      Areas: null,
      total: 0,
      results: {
      },
      parameters: {
        Search: null,
        pageNumber: 1,
        pages: 1,
        StartAt: moment().subtract(7, 'day').startOf('day'),
        EndAt: moment().endOf('day'),
        PageSize: 20
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
    if (this.$route.query.PIDNB && !this.parameters.Search) {
      this.parameters.Search = this.$route.query.PIDNB
      this.btnGetData()
    }
    this.getData()
  },
  methods: {
    pick (item) {
      this.$modal.show('dialog', {
        title: this.__t('Xác nhận trả kết quả chẩn đoán'),
        text: this.__t('Bạn có chắc chắn lựa chọn trả kết quả cho chỉ định dịch vụ') + ' <b> ' + item.ServiceName + '</b> ' + this.__t(' cho bệnh nhân ') + ' <b>' + item.Fullname + ' (' + item.PID + ')</b>',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'OK',
            class: 'btn btn-warning',
            handler: () => {
              new DiagnosticReporting().Pick(item.Id).then((it) => {
                this.$modal.hide('dialog')
                this.$router.push({path: '/DiagnosticReporting/List?ItemId=' + it.Id})
              }).catch(e => {
                this.loading = false
                console.log(e)
                this.$modal.hide('dialog')
              })
            }
          },
          {
            title: this.__t('Hủy'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        StartAt: this.parameters.StartAt === null || typeof this.parameters.StartAt === 'string' ? this.parameters.StartAt : moment((this.parameters.StartAt)).format(process.env.DATETIME_FORMAT),
        EndAt: this.parameters.EndAt === null || typeof this.parameters.EndAt === 'string' ? this.parameters.EndAt : moment((this.parameters.EndAt)).format(process.env.DATETIME_FORMAT)
      })
    },
    resetFilter () {
      this.parameters = {
        Search: null,
        pageNumber: 1,
        pages: 1,
        StartAt: null,
        EndAt: null,
        PageSize: 20
      }
      this.$refs.userAd.clear()
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
      new DiagnosticReporting(this.updateQuery()).ListPending().then(response => {
        this.loading = false
        this.results = response.items
        var bonussssss = 1
        if ((response.count % this.parameters.PageSize) === 0) {
          bonussssss = 0
        }
        this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        this.total = response.count
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    }
  }
}
</script>
