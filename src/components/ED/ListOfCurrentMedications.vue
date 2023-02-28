<template>
  <table class="table observation-table no-margin">
    <template v-if="DataSubmit.Datas && DataSubmit.Datas.length">
    <thead>
      <tr>
        <th width="30%" class="text-left">{{__t('Tên thuốc')}}</th>
        <th width="15%" class="text-left">{{__t('Liều/ số ngày')}}</th>
        <th class="text-left">{{__t('Đường dùng')}}</th>
        <th width="200px" class="text-left">{{__t('Ngày dùng gần nhất')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(item,index) in DataSubmit.Datas" v-if="!item.Hide">
        <template>
          <td style="position: relative"><button v-if="!item.Id" class="btn-pos-left" @click="remove(index)"><i class="fa fa-trash" aria-hidden="true"></i></button><medication v-model="item.Drug" /></td>
          <td>
            <v-autosuggest v-model="item.Dosage" :options="[]" :placeholder="__t('Liều/ số ngày')"/>
          </td>
          <td><medication-route v-model="item.Route"/></td>
          <td><masked-input mask="11/11/1111" v-model="item.LastDoseDate" :placeholder="vDateFormat" class="form-control" /></td>
        </template>
        <!-- <template v-else>
          <td>{{item.Drug}}</td>
          <td>{{item.Dosage}}</td>
          <td>{{item.Route}}</td>
          <td>{{item.LastDoseDate}}</td>
        </template> -->
      </tr>
    </tbody>
    </template>
    <template v-else>
      <tr>
        <td colspan="4" class="text-center">
          <div class="no-data-msg">{{__t('Không có thông tin thuốc đã dùng')}}</div>
          <p v-if="!RealOnly"><button @click="sync" class="btn btn-warning">{{__t('Lấy dữ liệu trong 24h từ các chuyên khoa khác')}}</button></p>
        </td>
      </tr>
    </template>
    <tfoot v-if="!RealOnly">
      <tr>
        <td colspan="4" class="text-center"><button @click="add" class="btn btn-info"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm thuốc')}}</button></td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
import MaskedInput from 'vue-masked-input'
import PatientMedicationList from '@/services/ED/PatientMedicationList'
export default {
  name: 'ListOfCurrentMedications',
  mixins: [],
  props: ['EdId', 'RealOnly'],
  components: {MaskedInput},
  data () {
    return {
      DataSubmit: {
        Data: []
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.getData()
  },
  methods: {
    add () {
      this.DataSubmit.Datas.push({
        Drug: '',
        Dosage: '',
        Route: '',
        LastDoseDate: '',
        Hide: false
      })
    },
    sync () {
      new PatientMedicationList().update('Sync/' + this.$route.params.Id, this.DataSubmit).then(response => {
        response.Datas.map(e => {
          e.Id = null
          e.Hide = false
          return e
        })
        this.DataSubmit = response
        if (!this.DataSubmit.Datas || this.DataSubmit.Datas.length === 0) {
          this.alert('Không có dữ liệu thuốc trong 24h', 'Vui lòng nhập thuốc mới phía dưới')
        }
      })
    },
    submit () {
      var data = this.DataSubmit.Datas.filter(e => {
        return e.Drug
      })
      data.forEach(e => {
        if (e.LastDoseDate === null) {
          e.LastDoseDate = ''
        }
      })
      this.DataSubmit.Datas = data.filter(e => !e.Hide)
      new PatientMedicationList().update(this.$route.params.Id, this.DataSubmit).then(response => {
        this.DataSubmit = response
      })
    },
    getData () {
      new PatientMedicationList().find(this.EdId).then(response => {
        this.DataSubmit = response
      })
    },
    remove (index) {
      this.DataSubmit.Datas[index].Hide = true
    }
  }
}
</script>
