<template>
  <div v-if="DataSubmitClone.PrimaryDoctor && DataSubmitClone.PrimaryDoctor.Username">
    <div class="box-body">
      <div class="row" v-if="DataSubmitClone.PrimaryDoctor && DataSubmitClone.PrimaryDoctor.Username">
        <div class="col-md-12">
          <div class="form-group">
            <label>{{__t('Bác sĩ chính')}}: <ad-Info :ad="DataSubmitClone.PrimaryDoctor.Username" /></label>
          </div>
        </div>
      </div>
      <template v-if="allowEdit">
        <div class="row" >
          <div class="col-md-12">
            <label>{{__t('Bác sĩ được ủy quyền khám')}}:
              <ad-Info v-if="DataSubmitClone.AuthorizedDoctor && DataSubmitClone.AuthorizedDoctor.Username" :ad="DataSubmitClone.AuthorizedDoctor.Username" />
              <span v-else>N/A</span>
            </label>
            <button :readonly="checkReadOnly" class="btn btn-sync-data" @click="syncGetAction()">{{__t('Chỉnh sửa ủy quyền khám')}}</button>
            <button :readonly="checkReadOnly" v-if="DataSubmitClone.AuthorizedDoctor && DataSubmitClone.AuthorizedDoctor.Username"  class="btn btn-sync-data" @click="cancel()">{{__t('Hủy ủy quyền khám')}}</button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row" v-if="DataSubmitClone.AuthorizedDoctor && DataSubmitClone.AuthorizedDoctor.Username">
          <div class="col-md-12">
            <label>{{__t('Bác sĩ được ủy quyền khám')}}: <ad-Info :ad="DataSubmitClone.AuthorizedDoctor.Username" /> </label>
          </div>
        </div>
      </template>
    </div>
    <modal name="PrimaryDoctors-modal" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth">
      <div class="sync-ed-box">
        <div class="callout callout-warning2">
          <label>{{__t('Nhập tên bác sĩ để tim kiếm')}}</label>
          <div class="form-group">
            <v-select :multiple="false" v-model="selected" :filterable="false" :options="Users" @search="onSearch" :placeholder="__t('Nhập tên hoặc AD bác sĩ')"
              style="background-color: #fff; min-width: 200px;">
              <template slot="no-options">
                {{__t('Chỉnh sửa uỷ quyền khám')}}
              </template>
            </v-select>
          </div>
          <button v-if="selected" class="btn btn-warning" @click="selectDoctor()">{{__t('Chọn và lưu')}}</button>
          <button class="btn pull-right" @click="$modal.hide('PrimaryDoctors-modal')">{{__t('Hủy')}}</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Users from '@/services/Users'
import _ from 'lodash'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'

const MODAL_WIDTH = 750
export default {
  name: 'PreAnesthesiaConsultationDoctorInfo',
  mixins: [],
  props: ['DataSubmit', 'allowEdit', 'checkReadOnly'],
  components: {
  },
  data () {
    return {
      PrimaryDoctors: [],
      PrimaryDoctor: {},
      modalWidth: MODAL_WIDTH,
      Users: [],
      selected: null,
      DataSubmitClone: {}
    }
  },
  watch: {
    DataSubmit () {
      this.DataSubmitClone = {...this.DataSubmit}
    }
  },
  computed: {
  },
  mounted () {
    this.DataSubmitClone = {...this.DataSubmit}
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  created () {
  },
  methods: {
    cancel () {
      this.$modal.show('dialog', {
        title: 'Thông báo',
        text: this.__t('Bạn muốn xóa bác sĩ được ủy quyền này ra khỏi hồ sơ?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn',
            handler: () => {
              this.okLetGo()
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Hủy bỏ',
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    okLetGo () {
      this.selected = {Id: null}
      this.selectDoctor()
    },
    syncGetAction () {
      this.$modal.show('PrimaryDoctors-modal')
    },
    onSearch (search, loading) {
      if (search.length >= 3) {
        this.search(loading, search, this)
      }
    },
    search: _.debounce((loading, search, vm) => {
      new Users({search: search, SpecialtyId: vm.$store.state.account.SpecialtyId, Position: 'Doctor'}).all().then(res => {
        vm.Users = res.map(e => {
          return {
            code: e.Id,
            label: e.Fullname,
            Fullname: e.Fullname,
            Id: e.Id,
            Username: e.Username
          }
        })
      })
    }, 350),
    selectDoctor () {
      new OutpatientExaminationNote().update('AuthorizeDoctor', {
        AuthorizedDoctor: this.selected,
        Id: this.DataSubmit.OPDId
      }).then(e => {
        this.DataSubmitClone.AuthorizedDoctor = this.selected
        setTimeout(() => {
          this.$modal.hide('PrimaryDoctors-modal')
        }, 100)
      })
    }
  }
}
</script>
