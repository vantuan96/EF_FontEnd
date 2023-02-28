<template>
  <div v-if="MASTERDATA">
    <p><b>21. {{__t('Lúc vào đẻ')}}:</b></p>
    <div class="ml-10">
      <div class="form-group" v-if="MASTERDATA['IPDMRPTCDBC']">
        <p style="margin: 0" class="fake-input disable">{{MASTERDATA['IPDMRPTCDBC'].Items[0].Value || 'N/A'}}</p>
      </div>
      <label>{{__t('Mã ICD10')}}:</label>
      <Icd10View2 v-if="MASTERDATA['IPDMRPTICDC']" :mdCode="'IPDMRPTICDC'" :single="true" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
    </div>
    <p v-if="MASTERDATA['IPDMRPE803']"><b>22. {{__t('Ngày đẻ (mổ đẻ)')}}:</b> {{MASTERDATA['IPDMRPE803'].Items[0].Value}}</p>
    <p v-if="MASTERDATA['IPDMRPT874']"><b>23. {{__t('Ngôi thai')}}:</b> {{MASTERDATA['IPDMRPT874'].Items[0].Value}}</p>
    <p><b>24. {{__t('Cách thức đẻ')}}: </b>{{getCachThuc()}}</p>
    <div class="flex align-center mrb10">
      <div class="mrr10">{{__t('Kiểm soát tử cung')}}: {{MASTERDATA['IPDMRPE848'] ? MASTERDATA['IPDMRPE848'].Items[0].Value : null}}</div>
      <CheckboxsValue v-if="MASTERDATA['IPDMRPE846']" :data="MASTERDATA['IPDMRPE846'].Items" :showall="true" :DataType="'Checkbox'" />
    </div>
    <div class="flex align-center mrb10">
      <CheckboxsValue v-if="MASTERDATA['IPDMRPE898']" :data="MASTERDATA['IPDMRPE898'].Items" :showall="true" :DataType="'Radio'" />
    </div>
    <div class="flex align-center mrb10">
      <CheckboxsValue v-if="MASTERDATA['IPDMRPE901']" :showdex="true" :data="MASTERDATA['IPDMRPE901'].Items" :showall="true" :DataType="'Checkbox'" />
    </div>
    <div class="flex align-center mrb10">
      <div><b>25. {{__t('Tình hình phẫu thuật')}}:</b></div>
      <CheckboxsValue v-if="MASTERDATA['IPDMRPE885']" :data="MASTERDATA['IPDMRPE885'].Items" :showall="true" :DataType="'Radio'" />
    </div>
    <div class="mrb10">
      <!-- Chuẩn đoán trước phẫu thuật -->
        <p v-if="MASTERDATA['IPDMRPE888']">{{__label(MASTERDATA['IPDMRPE888'])}}:</p>
        <Icd10View2 v-if="MASTERDATA['IPDMRPE888']" :mdCode="'IPDMRPE888'" :single="true" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
        <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE888']" class="mrt10 mrb10" v-model="MASTERDATA['IPDMRPE888'].Items[1].Value" />
        <!-- Chuẩn đoán sau phẫu thuật -->
        <p v-if="MASTERDATA['IPDMRPE891']">{{__label(MASTERDATA['IPDMRPE891'])}}:</p>
        <Icd10View2 v-if="MASTERDATA['IPDMRPE891']" :mdCode="'IPDMRPE891'" :single="true" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
        <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE891']" class="mrt10" v-model="MASTERDATA['IPDMRPE891'].Items[1].Value" />
    </div>
    <p>{{__t('Phương pháp phẫu thuật-mdc')}}: </p>
    <p class="mrl20" v-if="MASTERDATA['IPDMRPE882'] && MASTERDATA['IPDMRPE882'].Items[1].Value">{{phuongPhap}}</p>
    <TblWithMasterData
      @getCol="getCol"
      class="none"
      :FormCode="'IPDSANTHPT1'"
      :VisitId="_VisitId"
      :VisitType="'IPD'"
      :FormID="DataSubmit.Id"
      ref="TblWithMasterData"/>
    <p><b>26. {{__t('Trẻ sơ sinh')}}:</b></p>
    <template v-if="DataSubmit.Version >= 8">
      <template v-for="(elm, index) in ListSoSinh">
        <div class="mrl10 mrb10" :key="index">
          <div class="fw600">{{getName(elm.Id)}}</div>
          <CheckboxsValue class="block" v-if="MASTERDATA[getCode('IPDMRPE812', elm.Id)]" :showdex="true" :data="MASTERDATA[getCode('IPDMRPE812', elm.Id)].Items" :showall="true" :DataType="'Radio'" />
          <CheckboxsValue class="mrr10"
            v-if="MASTERDATA[getCode('IPDMRPE919', elm.Id)] && (MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items[0].Value || MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items[1].Value)"
            :showdex="true" :pushdex="2"
            :data="MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items"
            :showall="true" :DataType="'Radio'" />
          <CheckboxsValue
            class="mrr10"
            v-if="MASTERDATA[getCode('IPDMRPE922', elm.Id)] && (MASTERDATA[getCode('IPDMRPE922', elm.Id)].Items[0].Value || MASTERDATA[getCode('IPDMRPE922', elm.Id)].Items[1].Value)"
            :showdex="true"
            :pushdex="2"
            :data="MASTERDATA[getCode('IPDMRPE922', elm.Id)].Items"
            :showall="true" :DataType="'Checkbox'" />
          <CheckboxsValue class="mrr10"
            v-if="MASTERDATA[getCode('IPDMRPE919', elm.Id)] && MASTERDATA[getCode('IPDMRPE922', elm.Id)] && (!MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items[0].Value && !MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items[1].Value && !MASTERDATA[getCode('IPDMRPE922', elm.Id)].Items[0].Value && !MASTERDATA[getCode('IPDMRPE922', elm.Id)].Items[1].Value)"
            :showdex="true" :pushdex="2"
            :data="MASTERDATA[getCode('IPDMRPE919', elm.Id)].Items"
            :showall="true" :DataType="'Radio'" />
          <CheckboxsValue v-if="MASTERDATA[getCode('IPDMRPE809', elm.Id)]" :data="MASTERDATA[getCode('IPDMRPE809', elm.Id)].Items" :showall="true" :DataType="'Radio'" />
          <div class="flex align-center" v-if="MASTERDATA[getCode('IPDMRPE915', elm.Id)]">
            <CheckboxsValue class="block" :hideLabel="true" :data="MASTERDATA[getCode('IPDMRPE915', elm.Id)].Items" :showall="true" :DataType="'Checkbox'" />
            <div style="padding-bottom: 3px;">{{__t('Dị tật')}}</div>
          </div>
          <div>{{__t('Cân nặng')}}: {{getDataCanNang(elm.Id) || 'N/A'}} gram</div>
        </div>
      </template>
    </template>
    <template v-else>
      <CheckboxsValue class="block" v-if="MASTERDATA['IPDMRPE812']" :showdex="true" :data="MASTERDATA['IPDMRPE812'].Items" :showall="true" :DataType="'Radio'" />
      <CheckboxsValue class="mrr10"
        v-if="MASTERDATA['IPDMRPE919'] && (MASTERDATA['IPDMRPE919'].Items[0].Value || MASTERDATA['IPDMRPE919'].Items[1].Value)"
        :showdex="true" :pushdex="2"
        :data="MASTERDATA['IPDMRPE919'].Items"
        :showall="true" :DataType="'Radio'" />
      <CheckboxsValue
        class="mrr10"
        v-if="MASTERDATA['IPDMRPE922'] && (MASTERDATA['IPDMRPE922'].Items[0].Value || MASTERDATA['IPDMRPE922'].Items[1].Value)"
        :showdex="true"
        :pushdex="2"
        :data="MASTERDATA['IPDMRPE922'].Items"
        :showall="true" :DataType="'Checkbox'" />
      <CheckboxsValue class="mrr10"
        v-if="MASTERDATA['IPDMRPE919'] && MASTERDATA['IPDMRPE922'] && (!MASTERDATA['IPDMRPE919'].Items[0].Value && !MASTERDATA['IPDMRPE919'].Items[1].Value && !MASTERDATA['IPDMRPE922'].Items[0].Value && !MASTERDATA['IPDMRPE922'].Items[1].Value)"
        :showdex="true" :pushdex="2"
        :data="MASTERDATA['IPDMRPE919'].Items"
        :showall="true" :DataType="'Radio'" />
      <CheckboxsValue v-if="MASTERDATA['IPDMRPE809']" :data="MASTERDATA['IPDMRPE809'].Items" :showall="true" :DataType="'Radio'" />
      <div class="mrb10 flex align-center" v-if="MASTERDATA['IPDMRPE915']">
        <CheckboxsValue class="block" :hideLabel="true" :data="MASTERDATA['IPDMRPE915'].Items" :showall="true" :DataType="'Checkbox'" />
        <div style="padding-bottom: 3px;">{{__t('Dị tật')}}</div>
      </div>
      <p v-if="DataInfor">{{__t('Cân nặng')}}: {{DataInfor[0].Value || 'N/A'}} gram</p>
    </template>
    <p v-if="MASTERDATA['IPDMRPE896']"><b>27. {{__t('Tổng số ngày điều trị sau phẫu thuật')}}:</b> {{MASTERDATA['IPDMRPE896'].Items[0].Value}}</p>
    <p v-if="MASTERDATA['IPDMRPE894']"><b>28. {{__t('Tổng số lần phẫu thuật')}}:</b> {{MASTERDATA['IPDMRPE894'].Items[0].Value}}</p>
  </div>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
export default {
  name: 'Obstetrics1',
  props: ['MASTERDATA', 'DataSubmitReadOnly', 'DataSubmit', 'VisitId', 'VisitIdDrop', 'optionChild', 'ListSoSinh'],
  components: {
    TblWithMasterData
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.MASTERDATA['IPDMRPE882'] && !this.MASTERDATA['IPDMRPE882'].Items[1].Value) {
          let group = ['IPDMRPE885', 'IPDMRPE888', 'IPDMRPE891', 'IPDMRPE894', 'IPDMRPE896', 'IPDMRPE898', 'IPDMRPE901']
          group.forEach(elm => {
            if (this.MASTERDATA[elm]) {
              this.MASTERDATA[elm].Items.forEach(e => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                } else if (e.DataType === 'Checkbox') {
                  e.Value = false
                } else {
                  e.Value = ''
                }
              })
            }
          })
        }
      },
      deep: true
    }
  },
  data () {
    return {
      phuongPhap: '',
      DataInfor: null
    }
  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      this.handleClear5()
    }, 500)
    if (this.DataSubmit.DataInfor) {
      this.DataSubmit.DataInfor.sort((a, b) => a.Order - b.Order)
      this.DataInfor = this.DataSubmit.DataInfor
    }
  },
  methods: {
    getCachThuc () {
      let str = ''
      if (this.MASTERDATA['IPDMRPE861']) {
        if (this.MASTERDATA['IPDMRPE861'].Items[5].Value) {
          str = this.MASTERDATA['IPDMRPE861'].Items[6].Value
        } else {
          this.MASTERDATA['IPDMRPE861'].Items.find(e => {
            if (e.Value) {
              str = e.ViName
            }
          })
        }
      }
      return str
    },
    getCol (col) {
      this.phuongPhap = ''
      if (col && col.length) {
        col.forEach(e => {
          if (e.Datas && e.Datas.length) {
            e.Datas.find(elm => {
              if (elm.Code === 'IPDSANTHPT3' && elm.Value) {
                this.phuongPhap += elm.Value + '\n'
              }
            })
          }
        })
      }
    },
    handleClear5 () {
      if (this.MASTERDATA['IPDMRPE882'] && !this.MASTERDATA['IPDMRPE882'].Items[1].Value) {
        let group = ['IPDMRPE885', 'IPDMRPE888', 'IPDMRPE891', 'IPDMRPE894', 'IPDMRPE896', 'IPDMRPE898', 'IPDMRPE901']
        group.forEach(elm => {
          if (this.MASTERDATA[elm]) {
            this.MASTERDATA[elm].Items.forEach(e => {
              if (e.DataType === 'Radio') {
                e.Value = false
              } else if (e.DataType === 'Checkbox') {
                e.Value = false
              } else {
                e.Value = ''
              }
            })
          }
        })
      }
    },
    getName (Id) {
      let str = ''
      if (this.optionChild && this.optionChild.length) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id && e.Newborn.Id === Id) {
            str = e.Newborn.FullNameNewborn
          }
        })
      }
      return str
    },
    getCode (code, Id) {
      // return code
      return code + '_' + Id
    },
    getDataCanNang (Id) {
      let cannang = ''
      if (this.optionChild && this.optionChild.length && Id) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id === Id) {
            cannang = e.Datas.CanNang
          }
        })
      }
      return cannang
    }
  }
}
</script>
