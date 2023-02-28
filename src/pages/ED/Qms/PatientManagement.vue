<template>
  <div>
    <table class="standing-order-tbl">
      <tr>
        <th class="no-wrap" width="1">{{__t('STT')}}</th>
        <th class="no-wrap" width="1">{{__t('Giờ tiếp nhận')}}</th>
        <th class="no-wrap">{{__t('Phòng/Giường')}}</th>
        <th class="no-wrap">{{__t('Lý do')}}</th>
        <th class="no-wrap">{{__t('Điều dưỡng')}}</th>
        <th class="no-wrap">{{__t('Bác sĩ')}}</th>
        <th class="no-wrap">{{__t('Phân loại')}}</th>
      </tr>
      <tr :key="index + item.Id" v-for="(item, index) in DataSubmit.results">
        <td class="text-center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
        <td>{{item.AdmittedDate}}</td>
        <td class="no-wrap">{{item.Bed}}</td>
        <td><p style="margin: 0">{{item.Reason}}</p></td>
        <td><UsersSelect v-model="item.CurrentNurse" /></td>
        <td><UsersSelect v-model="item.CurrentDoctor" /></td>
        <td class="no-wrap" width="1">
          <span v-if="item.ATSScale &&item.ATSScale.Code" class="label e-label" :style="'background-color: ' +item.ATSScale.Note">{{__label(item.ATSScale)}}</span>
          <span v-else class="label e-label">{{__t('home.chua_phan_loai')}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="7">
          <paginate
          :clickHandler="getData"
          :container-class="'pagination pagination-sm no-margin v-pagination'"
          :next-text="'»'"
          :page-count="parameters.pages"
          :prev-text="'«'"
          v-if="DataSubmit.results && DataSubmit.results.length > 0"
          v-model="parameters.pageNumber">
          </paginate>
        </td>
      </tr>
    </table>
    <br/>
    <logs :EdId="null" :Type="'ED/PatientManagement'" :noDetail="true" />
    <br/>
    <div class="status-float-block">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-1 col-sm-2">
                <div class="form-group1">
                  <router-link :to="{path: '/ed/tivi'}">
                    <button type="button" class="btn v-white-btn">
                      <i class="fa fa-desktop" aria-hidden="true"></i>  {{___t('XEM MÀN HÌNH TIVI')}}
                    </button>
                  </router-link>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button type="button" @click="back()" class="btn v-white-btn btn-block">
                    <i class="fa fa-back" aria-hidden="true"></i>  {{___t('Quay lại')}}
                  </button>
                </div>
              </div>
              <div class="col-md-5 col-sm-4">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import PatientManagement from '@/services/ED/PatientManagement'
import UsersSelect from '@/components/UsersSelect.vue'
import Logs from '@/components/Logs.vue'
export default {
  name: 'EDQMSPatientManagement',
  mixins: [MixinForm],
  data () {
    return {
      DataSubmit: [],
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: 12
      }
    }
  },
  watch: {
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  components: {
    UsersSelect, Logs
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    submit () {
      this.DataSubmit.results.forEach(e => {
        if (!e.CurrentDoctor) e.CurrentDoctor = {}
        if (!e.CurrentNurse) e.CurrentNurse = {}
      })
      new PatientManagement().create(this.DataSubmit).then(response => {
        this.toastedSuccess().getData()
        this.edited = false
      })
    },
    getData () {
      new PatientManagement(this.parameters)
        .all()
        .then(response => {
          this.DataSubmit = response
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
          setTimeout(() => {
            this.edited = false
          }, 1000)
        })
    }
  }
}
</script>
