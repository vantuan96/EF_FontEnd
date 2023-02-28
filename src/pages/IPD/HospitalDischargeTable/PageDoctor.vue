<template>
  <div id="PageDocter" class="mrb40">
    <div class="box-title fw600 fs14 color-white mrb10 cap">
      {{ __t("HospitalDischargeTable.title1") }}
    </div>
    <div class="box-button flex space-center" :class="!isNull ? 'none' : null">
      <button
        v-if="condition && condition === 'Doctor' && !viewOnly && !getIsLocked"
        type="button"
        class="btn btn-flat v-yellow-btn"
        @click="confirmPopup"
      >
        {{ __t("HospitalDischargeTable.textButton") }}
      </button>
      <div v-else class="">{{ __t("HospitalDischargeTable.labelNull") }}</div>
    </div>
    <div class="box-content" :class="isNull ? 'none' : null">
      <!-- box date time -->
      <div class="box1 mrb30 flex align-center">
        <div class="box-date flex align-center space-between">
          <div class="title-date">{{ __t("HospitalDischargeTable.label1") }}</div>
          <v-date-time-picker
            v-if="condition && condition === 'Doctor' && !viewOnly && !viewOnly2 && !getIsLocked"
            :hideTooltip="true"
            v-model="time"
            :format="vDateTimeFormat"
          />
          <FakeInput v-else v-model="time" />
        </div>
        <div class="name">
          {{ __t("HospitalDischargeTable.label2") }}
          <ad-Info v-if="DataDoctor.CreatedBy" :ad="DataDoctor.CreatedBy" />
        </div>
      </div>
      <div
        class="box2"
        v-if="condition && condition === 'Doctor' && !viewOnly && !viewOnly2 && !getIsLocked"
      >
        <table class="table observation-table">
          <template>
            <thead>
              <tr>
                <th width="50%">
                  {{ __t("HospitalDischargeTable.labelTable7") }}
                </th>
                <th width="50%">
                  {{ __t("HospitalDischargeTable.labelTable2") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="MASTERDATA['IPDDPCD01']">
                <td v-html="__label(MASTERDATA['IPDDPCD01'])"></td>
                <td class="box-action">
                  <template>
                    <div class="mrb10 flex align-center space-center">
                      <div class="btn-action radio-left">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[0]"
                          v-model="MASTERDATA['IPDDPCD01']"
                        />
                      </div>
                      <div class="btn-action">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[1]"
                          v-model="MASTERDATA['IPDDPCD01']"
                        />
                      </div>
                    </div>
                    <div class="box-reason">
                      <!--
                        <MDCustomTextboxs v-model="MASTERDATA['IPDDPCD01'].Items[2].Value"/>
                      -->
                      <textarea-autosize
                        :code="MASTERDATA['IPDDPCD01'].Items[2].Code"
                        class="form-control"
                        :placeholder="__t('_Note2')"
                        v-model="MASTERDATA['IPDDPCD01'].Items[2].Value"
                      />
                    </div>
                  </template>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDDPCD05']">
                <td v-html="__label(MASTERDATA['IPDDPCD05'])"></td>
                <td class="box-action">
                  <template>
                    <div class="mrb10 flex align-center space-center">
                      <div class="btn-action radio-left">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[0]"
                          v-model="MASTERDATA['IPDDPCD05']"
                        />
                      </div>
                      <div class="btn-action">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[1]"
                          v-model="MASTERDATA['IPDDPCD05']"
                        />
                      </div>
                    </div>
                    <div class="box-reason">
                      <textarea-autosize
                        :code="MASTERDATA['IPDDPCD05'].Items[2].Code"
                        class="form-control"
                        :placeholder="__t('_Note2')"
                        v-model="MASTERDATA['IPDDPCD05'].Items[2].Value"
                      />
                    </div>
                  </template>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDDPCD09']">
                <td v-html="__label(MASTERDATA['IPDDPCD09'])"></td>
                <td class="box-action">
                  <template>
                    <div class="mrb10 flex align-center space-center">
                      <div class="btn-action radio-left">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[0]"
                          v-model="MASTERDATA['IPDDPCD09']"
                        />
                      </div>
                      <div class="btn-action radio-left">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[1]"
                          v-model="MASTERDATA['IPDDPCD09']"
                        />
                      </div>
                      <div class="btn-action">
                        <MDRadio
                          :noFlex="true"
                          :indexs="[2]"
                          v-model="MASTERDATA['IPDDPCD09']"
                        />
                      </div>
                    </div>
                    <div class="box-reason">
                      <textarea-autosize
                        :code="MASTERDATA['IPDDPCD09'].Items[3].Code"
                        class="form-control"
                        :placeholder="__t('_Note2')"
                        v-model="MASTERDATA['IPDDPCD09'].Items[3].Value"
                      />
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
      <div class="box2" v-else>
        <table class="table observation-table">
          <template>
            <thead>
              <tr>
                <th width="50%">
                  {{ __t("HospitalDischargeTable.labelTable7") }}
                </th>
                <th width="50%">
                  {{ __t("HospitalDischargeTable.labelTable2") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="MASTERDATA['IPDDPCD01']">
                <td v-html="__label(MASTERDATA['IPDDPCD01'])"></td>
                <td class="box-action">
                  <template>
                    <div class="mrb10 flex align-center space-center">
                      <div>
                        <MDRadioView :data="MASTERDATA['IPDDPCD01'].Items" />
                      </div>
                    </div>
                    <div class="box-reason">
                      <FakeInput
                        v-model="MASTERDATA['IPDDPCD01'].Items[2].Value"
                      />
                    </div>
                  </template>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDDPCD05']">
                <td v-html="__label(MASTERDATA['IPDDPCD05'])"></td>
                <td class="box-action">
                  <template>
                    <div class="mrb10 flex align-center space-center">
                      <div>
                        <MDRadioView :data="MASTERDATA['IPDDPCD05'].Items" />
                      </div>
                    </div>
                    <div class="box-reason">
                      <FakeInput
                        v-model="MASTERDATA['IPDDPCD05'].Items[2].Value"
                      />
                    </div>
                  </template>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDDPCD09']">
                <td v-html="__label(MASTERDATA['IPDDPCD09'])"></td>
                <td class="box-action">
                  <template>
                    <div class="mrb10 flex align-center space-center">
                      <div>
                        <MDRadioView :data="MASTERDATA['IPDDPCD09'].Items" />
                      </div>
                    </div>
                    <div class="box-reason">
                      <FakeInput
                        v-model="MASTERDATA['IPDDPCD09'].Items[3].Value"
                      />
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
    <!-- footer -->
    <div :class="isNull ? 'none-btn-save' : null">
      <FloatBlock v-if="condition && condition == 'Doctor' && !viewOnly">
        <template slot="buttons">
          <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
          <div class="col-md-4 col-sm-4"><div class="form-group1"></div></div>
          <div class="col-md-6 col-sm-6" v-if="!getIsLocked">
            <div class="form-group1">
              <button
                class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                type="button"
                v-shortkey="['ctrl', 's']"
                @click="submit();"
              >
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                {{ __t("btn.luu") }}
              </button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import CreateChecklistDoctor from '@/services/IPD/HospitalDischargeTable/CreateChecklistDoctor'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import IPDDischargePreparationChecklist from '@/services/IPD/HospitalDischargeTable/GetProfileDoctor'
export default {
  name: 'PageDocter',
  props: {
    condition: '',
    isNull: {
      type: Boolean,
      default: true
    },
    viewOnly: {
      type: Boolean,
      default: false
    },
    viewOnly2: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  data () {
    return {
      DataSubmit: {},
      DataDoctor: {},
      loaded: false,
      time: moment().format('HH:mm DD/MM/YYYY'),
      updatedBy: ''
    }
  },
  mixins: [MixinMasterData],
  mounted () {
    // master data
    this.getMasterDatas({Form: 'A03_046_050919_VE'}, () => {
      this.getData()
      this.checkTime()
    })
  },
  created () {
  },
  computed: {
    getIsLocked: function () {
      return (
        this.DataSubmit &&
        this.DataSubmit.IsLocked
      )
    },
    isNew: function () {
      return !this.isReadonly && this.DataSubmit && this.DataSubmit.CreatedAt === this.DataSubmit.UpdatedAt
    },
    isReadonly: function () {
      return this.DataSubmit.ConfirmBy || this.readonly
    }
  },
  components: {
    VDateTimePicker
  },
  methods: {
    // master data
    getData () {
      new CreateChecklistDoctor().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.mapMdData2Data()
        this.loaded = true
      }).catch(e => {
        this.DataSubmit = {}
        if (e.data.IsLocked) {
          this.DataSubmit.IsLocked = true
        }
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    checkTime () {
      new IPDDischargePreparationChecklist()
        .hideErrorMsg()
        .find(this._VisitId)
        .then(res => {
          this.DataDoctor = res
          if (res) {
            this.updatedBy = res.UpdatedBy
            this.time = res.Time || moment().format('HH:mm DD/MM/YYYY')
          }
        })
        .catch(e => {
          if (e.status === 404) {
            this.isNullDocter = true
          }
        })
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('HospitalDischargeTable.conFirm1'),
        text: this.__t('HospitalDischargeTable.conFirm2'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('HospitalDischargeTable.conFirm3'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreateContent()
            }
          },
          {
            title: this.__t('HospitalDischargeTable.conFirm4'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },

    handleCreateContent () {
      const data = {
        Time: this.time
      }
      new CreateChecklistDoctor().update('Create/' + this._VisitId, data).then(() => {
        this.$emit('reloadIsNull')
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    setIPDIAAUITV2 () {
      console.log('data: ', this.MASTERDATA['IPDDPCD01'])
    },
    handleChange () {
      console.log('data', this.MASTERDATA['IPDDPCD01'])
    },
    submit () {
      this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      if (this.time) {
        DataSubmit.Time = this.time
      }
      new CreateChecklistDoctor().update('/Update/' + this._VisitId, DataSubmit).then(response => {
        this.toastedSuccess()
        this.reload()
      })
    }
  },
  watch: {
  }
}
</script>
<style lang="stylus" scoped>
.box-title {
  background: #1e5584;
  border-radius: 6px;
  padding: 4px 10px;
}

.box-btn-mini {
  cursor: pointer;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
  padding: 3px 5px;
  background: linear-gradient(180deg, #ffdb71 0%, #f3b600 100%);
}

.box-btn-mini:hover {
  background: #d09e0b;
}

.box-content {
  font-weight: 500;
  font-size: 14px;
}

.box1 {
  word-break: break-word;
}

.box-date {
  margin-right: 20px;
}

.title-date {
  min-width: 118px;
  margin-right: 10px;
}

.box2 {
}

th {
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
}

td {
  text-align: left;
  height: 55px;
  box-sizing: border-box;
  word-break: break-word;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

.box-action {
  padding-left: 20px;
  padding-right: 20px;
}

.radio-left {
  margin-right: 10px;
}

.copy {
  color: red !important;
}
</style>
