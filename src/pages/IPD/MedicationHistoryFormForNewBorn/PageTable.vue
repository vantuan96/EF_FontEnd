<template>
 <div>
   <p class="fw600 fs16 text-center mrb20">{{__t('MedicationHistoryForm.label11')}}</p>
  <!-- table 1 -->
   <table class="table observation-table" v-if="!nullTable">
     <thead>
       <tr><th colspan="7" style="background-color: #1375ba;color: #fff;">{{__t('MedicationHistoryForm.textTable1')}}</th></tr>
       <tr>
         <th width="1" class="text-center">{{__t('MedicationHistoryForm.label4')}}</th>
         <th class="text-center">{{__t('MedicationHistoryForm.label12')}}</th>
         <th width="150px">{{__t('MedicationHistoryForm.label6')}}</th>
         <th width="130px">{{__t('MedicationHistoryForm.label7')}}</th>
         <th width="170px">
           {{__t('MedicationHistoryForm.label8')}}
           <!-- y nghia -->
            <div class="dropdown">
              <div class="dropdow-y-nghia" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
                <p><span class="fw600">√:</span> {{__t('MedicationHistoryForm.dropLabel1')}}</p>
                <p><span class="fw600">~:</span> {{__t('MedicationHistoryForm.dropLabel2')}}</p>
                <p><span class="fw600">O:</span> {{__t('MedicationHistoryForm.dropLabel3')}}</p>
                <p><span class="fw600">↕:</span> {{__t('MedicationHistoryForm.dropLabel4')}}</p>
              </div>
            </div>
          </th>
         <th width="120px" class="text-center">{{__t('MedicationHistoryForm.label9')}}</th>
         <th width="50px" class="text-center">
           {{__t('MedicationHistoryForm.label10')}}
            <!-- y nghia -->
              <div class="dropdown">
                <div class="dropdow-y-nghia" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                <div class="dropdown-menu dropdown-menu2" aria-labelledby="dropdownMenu3">
                  <p><span class="fw600">1:</span> {{__t('MedicationHistoryForm.dropLabel5')}}</p>
                  <p><span class="fw600">2:</span> {{__t('MedicationHistoryForm.dropLabel6')}}</p>
                  <p><span class="fw600">3:</span> {{__t('MedicationHistoryForm.dropLabel7')}}</p>
                  <p><span class="fw600">4:</span> {{__t('MedicationHistoryForm.dropLabel8')}}</p>
                </div>
              </div>
          </th>
       </tr>
     </thead>
     <tbody>
      <template v-if="!dataTable.length">
        <tr>
        <td colspan="7" class="text-center">{{ __t("Không có dữ liệu") }}</td>
        </tr>
      </template>
      <template v-else v-for="(item, index) in dataTable">
        <tr :key="index" v-if="item.Id && !isConfirmed">
          <td class="text-center" style="vertical-align:top">
            {{ (index + 1) }}
          </td>
          <td><medication v-model="item.Drug" /></td>
          <td><v-autosuggest v-model="item.Dosage" :options="[]" :placeholder="__t('Liều/ số ngày')"/></td>
          <td><VDatePicker class="wmg2" :placeholder="__t('Nhập')"  :hideTooltip="true" style="display: inline-block;" v-model="item.LastDoseDate" :format="vDateFormat"/></td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.MedicationPlan" :placeholder="__t('Chọn')" :items="option1"/>
          </td>
          <td><MDTextInput v-model="item.Note" :placeholder="__t('Nhập')"/></td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.Route" :placeholder="__t('Chọn')" :items="option2"/>
          </td>
        </tr>
        <tr :key="index" v-if="item.Id && isConfirmed">
          <td class="text-center" style="vertical-align:top">
            {{ (index + 1) }}
          </td>
          <td>{{item.Drug}}</td>
          <td>{{item.Dosage}}</td>
          <td>{{item.LastDoseDate}}</td>
          <td>
            <template v-if="item.MedicationPlan">
              <v-select :unsetWidth="true" :readonly="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.MedicationPlan" :placeholder="__t('Chọn')" :items="option1"/>
            </template>
          </td>
          <td>{{item.Note}}</td>
          <td>
            <template v-if="item.Route">
              <v-select :unsetWidth="true" :readonly="true" :disabeleclear="true" class='box-select box-select-vein' v-model="item.Route" :placeholder="__t('Chọn')" :items="option2"/>
            </template>
          </td>
        </tr>
        <tr :key="index" v-if="!item.Id">
          <td class="text-center row-index" style="vertical-align:top">
            <div class="delete" @click="handleDelete(index)">
              <div><i class="fa fa-trash" aria-hidden="true"></i></div>
            </div>
            {{ (index + 1) }}
          </td>
          <td><medication v-model="item.Drug" /></td>
          <td>
            <v-autosuggest v-model="item.Dosage" :options="[]" :placeholder="__t('Liều/ số ngày')"/>
          </td>
          <td>
            <VDatePicker class="wmg2" :placeholder="__t('Nhập')"  :hideTooltip="true" style="display: inline-block;" v-model="item.LastDoseDate" :format="vDateFormat"/>
          </td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.MedicationPlan" :placeholder="__t('Chọn')" :items="option1"/>
          </td>
          <td><MDTextInput v-model="item.Note" :placeholder="__t('Nhập')"/></td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.Route" :placeholder="__t('Chọn')" :items="option2"/>
          </td>
        </tr>
      </template>
     </tbody>
   </table>
   <p v-else class="text-center">Chưa có tiền sử dụng thuốc</p>
   <div class="text-center">
     <div class="btn v-green-btn v-bottom-btn" @click="handleAdd" v-if="!isConfirmed">{{__t('MedicationHistoryForm.label18')}}</div>
   </div>
  <!-- table 2 -->
   <table class="table observation-table mrt20" v-if="!nullTable">
     <thead>
       <tr><th colspan="7" style="background-color: #1375ba;color: #fff;">{{__t('MedicationHistoryForm.textTable2')}}</th></tr>
       <tr>
         <th class="text-center" width="1">{{__t('MedicationHistoryForm.label4')}}</th>
         <th class="text-center">{{__t('MedicationHistoryForm.label5')}}</th>
         <th width="150px">{{__t('MedicationHistoryForm.label6')}}</th>
         <th width="130px">{{__t('MedicationHistoryForm.label7')}}</th>
         <th width="170px">
           {{__t('MedicationHistoryForm.label8')}}
           <!-- y nghia -->
            <div class="dropdown">
              <div class="dropdow-y-nghia" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu3">
                <p><span class="fw600">√:</span> {{__t('MedicationHistoryForm.dropLabel1')}}</p>
                <p><span class="fw600">~:</span> {{__t('MedicationHistoryForm.dropLabel2')}}</p>
                <p><span class="fw600">O:</span> {{__t('MedicationHistoryForm.dropLabel3')}}</p>
                <p><span class="fw600">↕:</span> {{__t('MedicationHistoryForm.dropLabel4')}}</p>
              </div>
            </div>
          </th>
         <th width="120px" class="text-center">{{__t('MedicationHistoryForm.label9')}}</th>
         <th width="50px" class="text-center">
           {{__t('MedicationHistoryForm.label10')}}
            <!-- y nghia -->
              <div class="dropdown">
                <div class="dropdow-y-nghia" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> {{__t('AdultVitalSigns.y_nghia')}}</div>
                <div class="dropdown-menu dropdown-menu2" aria-labelledby="dropdownMenu3">
                  <p><span class="fw600">1:</span> {{__t('MedicationHistoryForm.dropLabel5')}}</p>
                  <p><span class="fw600">2:</span> {{__t('MedicationHistoryForm.dropLabel6')}}</p>
                  <p><span class="fw600">3:</span> {{__t('MedicationHistoryForm.dropLabel7')}}</p>
                  <p><span class="fw600">4:</span> {{__t('MedicationHistoryForm.dropLabel8')}}</p>
                </div>
              </div>
          </th>
       </tr>
     </thead>
     <tbody>
      <template v-if="!dataTableTPCN.length">
        <tr>
        <td colspan="7" class="text-center">{{ __t("Không có dữ liệu") }}</td>
        </tr>
      </template>
      <template v-else v-for="(item, index) in dataTableTPCN">
        <tr :key="index" v-if="item.Id && !isConfirmed">
          <td class="text-center" style="vertical-align:top">
            {{ (index + 1) }}
          </td>
          <td><medication v-model="item.Drug" /></td>
          <td><v-autosuggest v-model="item.Dosage" :options="[]" :placeholder="__t('Liều/ số ngày')"/></td>
          <td><VDatePicker class="wmg2" :placeholder="__t('Nhập')"  :hideTooltip="true" style="display: inline-block;" v-model="item.LastDoseDate" :format="vDateFormat"/></td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.MedicationPlan" :placeholder="__t('Chọn')" :items="option1"/>
          </td>
          <td><MDTextInput v-model="item.Note" :placeholder="__t('Nhập')"/></td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.Route" :placeholder="__t('Chọn')" :items="option2"/>
          </td>
        </tr>
        <tr :key="index" v-if="item.Id && isConfirmed">
          <td class="text-center" style="vertical-align:top">
            {{ (index + 1) }}
          </td>
          <td>{{item.Drug}}</td>
          <td>{{item.Dosage}}</td>
          <td>{{item.LastDoseDate}}</td>
          <td>
            <template v-if="item.MedicationPlan">
              <v-select :unsetWidth="true" :readonly="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.MedicationPlan" :placeholder="__t('Chọn')" :items="option1"/>
            </template>
          </td>
          <td>{{item.Note}}</td>
          <td>
            <template v-if="item.Route">
              <v-select :unsetWidth="true" :readonly="true" :disabeleclear="true" class='box-select box-select-vein' v-model="item.Route" :placeholder="__t('Chọn')" :items="option2"/>
            </template>
          </td>
        </tr>
        <tr :key="index" v-if="!item.Id">
          <td class="text-center row-index" style="vertical-align:top">
            <div class="delete" @click="handleDeleteTPCN(index)">
              <div><i class="fa fa-trash" aria-hidden="true"></i></div>
            </div>
            {{ (index + 1) }}
          </td>
          <td><medication v-model="item.Drug" /></td>
          <td>
            <!-- <MDTextInput v-model="item.Dosage"/> -->
            <v-autosuggest v-model="item.Dosage" :options="[]" :placeholder="__t('Liều/ số ngày')"/>
          </td>
          <td>
            <VDatePicker class="wmg2" :placeholder="__t('Nhập')"  :hideTooltip="true" style="display: inline-block;" v-model="item.LastDoseDate" :format="vDateFormat"/>
          </td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.MedicationPlan" :placeholder="__t('Chọn')" :items="option1"/>
          </td>
          <td><MDTextInput v-model="item.Note" :placeholder="__t('Nhập')"/></td>
          <td>
            <v-select :unsetWidth="true" :disabeleclear="true" class='select-full-w box-select box-select-vein' v-model="item.Route" :placeholder="__t('Chọn')" :items="option2"/>
          </td>
        </tr>
      </template>
     </tbody>
   </table>
   <p v-else class="text-center">Chưa có tiền sử dụng TPCN</p>
   <div class="text-center">
     <div class="btn v-green-btn v-bottom-btn" @click="handleAddTPCN" v-if="!isConfirmed">{{__t('MedicationHistoryForm.label19')}}</div>
   </div>
   <!-- footer -->
    <FloatBlock  v-if="!isConfirmed" :showForm="true" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!isConfirmed">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
 </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
export default {
  name: 'FormForNewBorn-table',
  data () {
    return {
      option1: [
        {
          value: 'Tiếp tục',
          label: '√'
        },
        {
          value: 'Đổi thuốc/ liều',
          label: '~'
        },
        {
          value: 'Tạm dừng',
          label: 'O'
        },
        {
          value: 'Dừng thuốc',
          label: '↕'
        }
      ],
      option2: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        }
      ],
      nullTable: false,
      dataTable: [],
      dataTableTPCN: [],
      firstDataTable: [],
      firstDataTableTPCN: []
    }
  },
  props: ['isConfirmed', 'dataTable1', 'dataTableTPCN1'],
  components: {
    VDateTimePicker,
    VSelect
  },
  //   created () {
  //   this.getDataTable()
  //   EventBus.$on('handleAddMedicationHistoryFormTable', this.handleAdd2)
  //   EventBus.$on('SaveMedicationHistoryForm', this.handleSubmit)
  // },
  // beforeDestroy () {
  //   EventBus.$off('handleAddMedicationHistoryFormTable')
  //   EventBus.$off('SaveMedicationHistoryForm')
  // },
  created () {
    this.getDataTable()
    EventBus.$on('handleAddMedicationHistoryFormTable', this.handleAdd2)
    EventBus.$on('SaveMedicationHistoryFormNewBorn', this.handleSubmit)
  },
  beforeDestroy () {
    EventBus.$off('handleAddMedicationHistoryFormTable')
    EventBus.$off('SaveMedicationHistoryFormNewBorn')
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    }
  },
  methods: {
    handleAdd () {
      const row = {
        Drug: '',
        Dosage: '',
        LastDoseDate: moment().format('DD/MM/YYYY'),
        MedicationPlan: '',
        Note: '',
        Route: ''
      }
      this.dataTable.push(row)
    },
    handleAdd2 (data) {
      let trung = false
      if (data.Dosage || data.LastDoseDate || data.Drug) {
        if (this.dataTable.length) {
          if (!data.LastDoseDate) {
            this.dataTable.find((e) => {
              if (e.Drug === data.Drug && e.Dosage === data.Dosage) {
                trung = true
              }
            })
          } else {
            this.dataTable.find((e) => {
              if (e.Drug === data.Drug && e.Dosage === data.Dosage && e.LastDoseDate === this.$options.filters.formatDate2(data.LastDoseDate)) {
                trung = true
              }
            })
          }
        }
        if (!trung || !this.dataTable.length) {
          if (data.LastDoseDate) {
            data.LastDoseDate = this.$options.filters.formatDate2(data.LastDoseDate)
          }
          this.dataTable.push(data)
        }
      }
    },
    handleAddTPCN () {
      const row = {
        Drug: '',
        Dosage: '',
        LastDoseDate: moment().format('DD/MM/YYYY'),
        MedicationPlan: '',
        Note: '',
        Route: ''
      }
      this.dataTableTPCN.push(row)
    },
    handleBack () {
      let check = this.checkTable()
      this.$emit('handleBack', check)
    },
    handleSubmit () {
      const data = []
      data.push(this.dataTable)
      data.push(this.dataTableTPCN)
      this.$emit('handleSubmit', data)
    },
    handleDelete (index) {
      this.dataTable.splice(index, 1)
    },
    handleDeleteTPCN (index) {
      this.dataTableTPCN.splice(index, 1)
    },
    getDataTable () {
      if (this.dataTable1) {
        this.dataTable = this.JSONParse(this.dataTable1)
      }
      if (this.dataTableTPCN1) {
        this.dataTableTPCN = this.JSONParse(this.dataTableTPCN1)
      }
      this.firstDataTable = JSON.stringify(this.dataTable)
      this.firstDataTableTPCN = JSON.stringify(this.dataTableTPCN)
    },
    checkTable () {
      let thayDoi = false
      if (this.firstDataTable !== JSON.stringify(this.dataTable) || this.firstDataTableTPCN !== JSON.stringify(this.dataTableTPCN)) {
        thayDoi = true
      }
      return thayDoi
    }
  }
}
</script>

<style lang="stylus" scoped>
.table {
  margin-bottom: 0px;
}
.row-index {
  position relative;
  .delete {
    position absolute;
    background-color: #f39c12;
    border: none;
    height: 100%;
    width: 30px;
    cursor: pointer;
    left: -31px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.dropdown {
  margin-top: 5px;
}
.dropdow-y-nghia {
  cursor: pointer;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  font-weight: 100;
  &:hover {
    background: #f1f1f1;
  }
}
.dropdown-menu {
  width: 150px;
  padding-left: 10px;
  p {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 100;
    span {
      font-weight: 600;
    }
  }
}
.dropdown-menu2 {
  width: 220px;
}
</style>
