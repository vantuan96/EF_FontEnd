<template>
  <modal name="PrimaryDoctors-modal" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
    <div class="sync-ed-box">
      <div v-if="PrimaryDoctors && PrimaryDoctors.length">
        <p><b>{{__t('Kết quả')}} ({{PrimaryDoctors.length}})</b></p>
        <table class="table header-table">
          <tr>
            <th>{{__t('Bác sĩ')}}</th>
            <th>{{__t('Khoa phòng')}}</th>
            <th>{{__t('Thời gian hẹn')}}</th>
            <th>--/--</th>
          </tr>
          <tbody>
            <tr :data="doctor" :key="index" v-for="(doctor, index) in PrimaryDoctors">
              <td width="120px">
                {{doctor.Fullname}}
                <span v-if="doctor.Username">{{doctor.Username}}</span>
                <p class="warning no-wrap" v-if="!doctor.Id">{{__t('Bác sĩ này chưa có tài khoản BADT')}} {{doctor.EHOSAccount || doctor.OHAccount}}</p>
              </td>
              <td>
                <div>{{doctor.Department}}</div>
              </td>
              <td>
                <div>{{doctor.BookingTime}}</div>
              </td>
              <td width="50" class="v-checkbox" align="center">
                <button v-if="doctor.Id" class="btn btn-block btn-warning" type="button" @click="selectDoctor(doctor)">Chọn</button>
              </td>
            </tr>
            <tr>
              <td colspan="3">
                <div class="form-inline">
                  <div class="form-group">
                    <label>{{__t('Hoặc nhập tên bác sĩ để tim kiếm')}}</label>
                    <div class="input-group">
                      <v-select :multiple="false" v-model="selected" :filterable="false" :options="Users" @search="onSearch" :placeholder="__t('Nhập tên hoặc AD bác sĩ')"
                        style="background-color: #fff; min-width: 200px;">
                        <template slot="no-options">
                          {{__t('Gõ để tìm người dùng...')}}
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <label class="hidden-text">x</label>
                <button  v-if="selected" class="btn btn-warning" @click="selectDoctor(selected)" type="button">{{__t('Chọn')}}</button>
              </td>
            </tr>
            <tr>
                <td colspan="4">
                  <div class="row">
                    <div class="col-md-4 pull-right">
                      <button class="btn btn-block" @click="$modal.hide('PrimaryDoctors-modal')" type="button">{{__t('Hủy')}}</button>
                    </div>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      <template v-else-if="PrimaryDoctors && PrimaryDoctors.length === 0">
        <div class="callout callout-warning2">
          <h4>{{__t('Không tìm thấy kết quả!')}}</h4>
          <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH.')}}</p>
          <label>{{__t('Hoặc nhập tên bác sĩ để tim kiếm')}}</label>
          <div class="form-group">
            <v-select :multiple="false" v-model="selected" :filterable="false" :options="Users" @search="onSearch" :placeholder="__t('Nhập tên hoặc AD bác sĩ')"
              style="background-color: #fff; min-width: 200px;">
              <template slot="no-options">
                {{__t('Gõ để tìm người dùng...')}}
              </template>
            </v-select>
          </div>
          <button v-if="selected" class="btn btn-warning" @click="selectDoctor(selected)" type="button">{{__t('Chọn')}}</button>
          <button class="btn pull-right" @click="$modal.hide('PrimaryDoctors-modal')" type="button">{{__t('Hủy')}}</button>
        </div>
      </template>
    </div>
  </modal>
</template>
<script>
import InitialAssessment from '@/services/EOC/InitialAssessment'
import Users from '@/services/Users'
import _ from 'lodash'
const MODAL_WIDTH = 750
export default {
  name: 'ForOnGoing',
  mixins: [],
  props: ['OpdId', 'DoctorId'],
  data () {
    return {
      PrimaryDoctors: [],
      PrimaryDoctor: {},
      modalWidth: MODAL_WIDTH,
      Users: [],
      selected: null
    }
  },
  computed: {
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  created () {
  },
  methods: {
    onSearch (search, loading) {
      if (search.length >= 3) {
        this.search(loading, search, this)
      }
    },
    search: _.debounce((loading, search, vm) => {
      new Users({search: search, SpecialtyId: vm.$store.state.account.SpecialtyId}).all().then(res => {
        vm.Users = res.map(e => {
          return {
            code: e.Id,
            label: e.Fullname,
            Fullname: e.Fullname,
            Id: e.Id
          }
        })
      })
    }, 350),
    selectDoctor (item) {
      // item.DisplayName = item.Fullname
      // this.DataSubmit.PrimaryDoctor = {
      //   Id: item.Id,
      //   DisplayName: item.Fullname,
      //   Fullname: item.Fullname,
      //   IsBooked: true,
      //   BookingTime: ''
      // }
      // item.DisplayName = item.Fullname
      // item.Fullname = item.Fullname
      // item.IsBooked = item.IsBooked ? false : true
      // item.BookingTime = item.BookingTime
      this.$emit('close', {
        Id: item.Id,
        Fullname: item.Fullname || item.Username,
        DisplayName: item.Fullname || item.Username,
        IsBooked: item.IsBooked,
        BookingTime: item.BookingTime
      })
      setTimeout(() => {
        this.$modal.hide('PrimaryDoctors-modal')
      }, 100)
    },
    open (PrimaryDoctor, isEoc) {
      this.PrimaryDoctor = PrimaryDoctor
      if (!isEoc) this.getPrimaryDoctors()
      this.selected = null
      if (PrimaryDoctor.Id) {
        this.selected = {
          Fullname: `${PrimaryDoctor.Fullname || PrimaryDoctor.Username}`,
          Id: PrimaryDoctor.Id,
          code: PrimaryDoctor.Id,
          label: `${PrimaryDoctor.Fullname || PrimaryDoctor.Username}`
        }
      }
      this.$modal.show('PrimaryDoctors-modal')
    },
    getPrimaryDoctors () {
      new InitialAssessment().find('HISDoctor/' + this.$route.params.Id).then(response => {
        response.forEach(element => {
          element.value = element.Key
          element.label = element.Fullname
          element.code = element.Key
          element.selected = this.PrimaryDoctor.Id === element.Id
        })
        this.PrimaryDoctors = response
      })
    }
  }
}
</script>
