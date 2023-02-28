<template>
  <div v-if="dex && dex.length">
    <label class="block-title">II. {{__t2('QUẢN LÝ NGƯỜI BỆNH')}}:</label>
      <div class="ml-10" v-if="DataSubmitReadOnly">
        <div class="mb-5"><label>{{dex[12]}} {{__t2('Vào viện lúc-mdc')}}:</label> {{DataSubmitReadOnly.Twelve || 'N/A'}}</div>
        <div class="mb-5"><label>{{dex[13]}} {{__t2('Trực tiếp vào')}}:</label> <CheckboxsValue :t2="true" class="flex-span" :data="VisitTypes" :showall="true"/></div>
        <div class="mb-5"><label>{{dex[15]}} {{__t2('Vào khoa')}}:</label> {{__label(DataSubmitReadOnly.Fifteen.CurrentSpecialty)}} {{__t2('lúc')}} {{DataSubmitReadOnly.Fifteen.CurrentDate || 'N/A'}}, {{__t2('Bác sĩ điều trị chính')}}: <ad-Info v-if="DataSubmitReadOnly.Fifteen.CurrentDoctor" :ad="DataSubmitReadOnly.Fifteen.CurrentDoctor.Username" /><span v-else>N/A</span></div>
        <div class="mb-5"><label>{{dex[16]}} {{__t2('Chuyển khoa')}}:</label>
          <template v-if="DataSubmitReadOnly.Sixteen.length">
            <template v-if="DataSubmitReadOnly.Sixteen.length === 1">
              {{__label(DataSubmitReadOnly.Sixteen[0].TransferSpecialty)}} {{__t2('lúc')}} {{DataSubmitReadOnly.Sixteen[0].TransferDate || 'N/A'}}, {{__t2('Bác sĩ điều trị chính')}}: <ad-Info v-if="DataSubmitReadOnly.Sixteen[0].TransferDoctor" :ad="DataSubmitReadOnly.Sixteen[0].TransferDoctor.Username" /><span v-else>N/A</span>
            </template>
            <template v-else>
              <p :key="index" v-for="(item, index) in DataSubmitReadOnly.Sixteen">{{__label(item.TransferSpecialty)}} {{__t2('lúc')}} {{item.TransferDate || 'N/A'}}, {{__t2('Bác sĩ điều trị chính')}}: <ad-Info v-if="item.TransferDoctor" :ad="item.TransferDoctor.Username" /><span v-else>N/A</span></p>
            </template>
          </template>
        </div>
        <div class="mb-5"><label>{{dex[17]}} {{__t2('Chuyển viện-mdc')}}:</label><CheckboxsValue :t2="true" class="flex-span" :data="InterHospitalInfo" :showall="true" :DataType="'Radio'" />, {{__t2('Chuyển đến')}}: {{InterHospitalInfoTo || 'N/A'}}</div>
        <div class="mb-5"><label>{{dex[18]}} {{__t2('Ra viện lúc')}}:</label> <span v-if="DataSubmit.Status && DataSubmit.Status.EnName !== 'In hospital' && DataSubmit.Status.EnName !== 'Waiting results' && DataSubmit.Status.EnName !== 'Transfer'">{{DataSubmitReadOnly.Eighteen || 'N/A'}}</span></div>
        <div class="mb-5"><label>{{dex[19]}} {{__t2('Tổng số ngày điều trị')}}:</label> {{DataSubmitReadOnly.Nineteen || 'N/A'}}</div>
      </div>
    <label class="block-title">III. {{__t2('CHẨN ĐOÁN')}}:</label>
    <div class="ml-10">
      <div v-if="routeType === 'Gynecological'"><label>{{dex[21]}} {{__t2('Khoa khám bệnh cấp cứu-mdcGy')}}:</label></div>
      <div v-else><label>{{dex[21]}} {{__t2('Khoa khám bệnh cấp cứu')}}:</label></div>
      <div class="ml-10">
        <div class="form-group">
          <p style="margin: 0" class="fake-input disable">{{(DataSubmitReadOnly.TwentyOne && DataSubmitReadOnly.TwentyOne.CurrentDiagnosis) ? DataSubmitReadOnly.TwentyOne.CurrentDiagnosis : 'N/A'}}</p>
        </div>
        <label>{{__t2('Mã ICD10')}}:</label>
        <Icd10View v-if="DataSubmitReadOnly.TwentyOne && DataSubmitReadOnly.TwentyOne.CurrentICD" v-model="DataSubmitReadOnlyICD21"/>
      </div>
      <template v-if="routeType === 'Obstetrics'">
        <Obstetrics1 :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :DataSubmitReadOnly="DataSubmitReadOnly" :optionChild="optionChild" :ListSoSinh="ListSoSinh"/>
      </template>
      <template v-else-if="routeType === 'Gynecological' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'Eye'">
        <Gynecological1 :routeType="routeType" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :box1="true" :DataSubmitReadOnly="DataSubmitReadOnly"/>
      </template>
      <template v-else>
        <div><label>{{dex[22]}} {{__t2('Khi vào khoa điều trị')}}:</label></div>
        <div class="ml-10">
          <div class="form-group">
            <p v-if="MASTERDATA['IPDMRPTCDBC']" class="fake-input disable">{{MASTERDATA['IPDMRPTCDBC'].Items[0].Value || 'N/A'}}</p>
          </div>
          <div>
            <label>{{__t2('Mã ICD10')}}:</label>
            <Icd10View v-if="MASTERDATA['IPDMRPTICDC']" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
          </div>
          <Oncology1 class="mrt10" v-if="routeType === 'Oncology'" :MASTERDATA="MASTERDATA" :box1="true" :DataSubmit="DataSubmit" :DataSubmitReadOnly="DataSubmitReadOnly"/>
          <Oncology1 class="mrb10" v-if="routeType === 'Oncology'" :MASTERDATA="MASTERDATA" :box4="true" :DataSubmit="DataSubmit" :DataSubmitReadOnly="DataSubmitReadOnly"/>
          <hr/>
          <div class="flex-box" v-if="MASTERDATA['IPDMRPTTHPT'] && routeType !== 'A01_195_050919_V' && routeType !== 'Oncology'">
            <CheckboxsValue class="flex-span" :data="MASTERDATA['IPDMRPTTHPT'].Items" :showall="true"/>
            <div style="flex-grow: 1;" class="ml-10">
              <p class="fake-input disable">{{MASTERDATA['IPDMRPTTHPT'].Items[2].Value || 'N/A'}}</p>
            </div>
          </div>
          <!-- <div>
            <tr>
              <td>
                + Chuẩn đoán trước phẫu thuật: {{MASTERDATA['IPDMRPE888'] ? MASTERDATA['IPDMRPE888'].Items[1].Value : ''}}
              </td>
              <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPE888']" :text="getICD10Code(MASTERDATA['IPDMRPE888'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
            <tr>
              <td>
                + Chuẩn đoán sau phẫu thuật: {{MASTERDATA['IPDMRPE891'] ? MASTERDATA['IPDMRPE891'].Items[1].Value : ''}}
              </td>
              <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPE891']" :text="getICD10Code(MASTERDATA['IPDMRPE891'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
          </div> -->
        </div>
        <Oncology1 class="mrt10" v-if="routeType === 'Oncology'" :MASTERDATA="MASTERDATA" :box2="true" :DataSubmit="DataSubmit" :DataSubmitReadOnly="DataSubmitReadOnly"/>
        <template v-if="routeType === 'A01_195_050919_V'">
          <div class="flex align-center mrb10">
            <CheckboxsValue v-if="MASTERDATA['IPDMRPE898']" :data="MASTERDATA['IPDMRPE898'].Items" :showall="true" :DataType="'Radio'" />
          </div>
          <div class="flex align-center mrb10">
            <CheckboxsValue v-if="MASTERDATA['IPDMRPE901']" :showdex="true" :data="MASTERDATA['IPDMRPE901'].Items" :showall="true" :DataType="'Checkbox'" />
          </div>
          <p v-if="MASTERDATA['IPDMRPE896']"><b>23. {{__t('Tổng số ngày điều trị sau phẫu thuật')}}:</b> {{MASTERDATA['IPDMRPE896'].Items[0].Value}}</p>
          <p v-if="MASTERDATA['IPDMRPE894']"><b>24. {{__t('Tổng số lần phẫu thuật')}}:</b> {{MASTERDATA['IPDMRPE894'].Items[0].Value}}</p>
        </template>
        <div><label>{{dex[23]}} {{__t2('Ra Viện')}}:</label></div>
        <div class="ml-10">
          <div><label>{{__t2('Bệnh chính')}}:</label></div>
          <div class="form-group">
            <p v-if="MASTERDATA['IPDMRPECDBC']" class="fake-input disable">{{MASTERDATA['IPDMRPECDBC'].Items[0].Value || 'N/A'}}</p>
          </div>
          <div>
            <label>{{__t2('Mã ICD10')}}:</label>
            <Icd10View v-if="MASTERDATA['IPDMRPEICDC']" v-model="MASTERDATA['IPDMRPEICDC'].Items[0].Value"/>
          </div>
          <Oncology1 class="mrb10" v-if="routeType === 'Oncology'" :MASTERDATA="MASTERDATA" :box3="true" :DataSubmit="DataSubmit" :DataSubmitReadOnly="DataSubmitReadOnly"/>
          <hr/>
          <div><label>{{__t2('Bệnh kèm theo')}}:</label></div>
          <div class="form-group">
            <p v-if="MASTERDATA['IPDMRPECDKT']" class="fake-input disable">{{MASTERDATA['IPDMRPECDKT'].Items[0].Value || 'N/A'}}</p>
          </div>
          <div>
            <label>{{__t2('Mã ICD10')}}:</label>
            <Icd10View v-if="MASTERDATA['IPDMRPEICDP']" v-model="MASTERDATA['IPDMRPEICDP'].Items[0].Value"/>
          </div>
          <div v-if="routeType === 'A01_195_050919_V'">
            <p v-if="MASTERDATA['IPDMRPE888']"><b>{{__label(MASTERDATA['IPDMRPE888'])}}:</b></p>
            <Icd10View2 v-if="MASTERDATA['IPDMRPE888']" :mdCode="'IPDMRPE888'" :single="true" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
            <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE888']" class="mrt10 mrb10" v-model="MASTERDATA['IPDMRPE888'].Items[1].Value" />
            <!-- Chuẩn đoán sau phẫu thuật -->
            <p v-if="MASTERDATA['IPDMRPE891']"><b>{{__label(MASTERDATA['IPDMRPE891'])}}:</b></p>
            <Icd10View2 v-if="MASTERDATA['IPDMRPE891']" :mdCode="'IPDMRPE891'" :single="true" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
            <FakeInput style="margin-left: 0px" v-if="MASTERDATA['IPDMRPE891']" class="mrt10" v-model="MASTERDATA['IPDMRPE891'].Items[1].Value" />
          </div>
          <hr/>
          <BMTIMMACH1 class="mrb10" v-if="routeType === 'CardiovascularForm'" :MASTERDATA="MASTERDATA" :box2="true" :DataSubmit="DataSubmit"/>
          <div class="flex-box" v-if="MASTERDATA['IPDMRPETHPT'] && routeType !== 'A01_195_050919_V' && routeType !== 'Oncology' && routeType !== 'CardiovascularForm'">
            <CheckboxsValue :t2="true" class="flex-span" :data="MASTERDATA['IPDMRPETHPT'].Items" :showall="true" v-if="routeType"/>
            <CheckboxsValue :indexs=[1] :t2="true" class="flex-span" :data="MASTERDATA['IPDMRPETHPT'].Items" :showall="true" v-else/>
            <div style="flex-grow: 1;" class="ml-10">
              <p class="fake-input disable">{{MASTERDATA['IPDMRPETHPT'].Items[2].Value || 'N/A'}}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <label class="block-title">IV. {{__t2('TÌNH TRẠNG RA VIỆN')}}:</label>
    <div class="ml-10">
      <div><label>{{dex[24]}} {{__t2('Kết quả điều trị')}}:</label></div>
      <div class="ml-10">
        <CheckboxsValue class="flex-span" :indexs="[0, 1, 2, 3, 4]" v-if="MASTERDATA['IPDMRPEKQDT'] && routeType !== 'Obstetrics'" :data="MASTERDATA['IPDMRPEKQDT'].Items" :showall="true" :DataType="'Radio'" />
        <template v-else-if="MASTERDATA['IPDMRPEKQDT']">
          <CheckboxsValue class="flex-span" :indexs="[0, 1, 2, 3, 5]" :data="MASTERDATA['IPDMRPEKQDT'].Items" :showall="true" :DataType="'Radio'" />
          <CheckboxsValue class="flex-span" :indexs="[4]" :data="MASTERDATA['IPDMRPEKQDT'].Items" :showall="true" :DataType="'Radio'" />
        </template>
      </div>
      <div class="mt-10"><label>{{dex[25]}} {{__t2('Giải phẫu bệnh (khi có sinh thiết)')}}:</label></div>
      <div class="ml-10 mb-5" v-if="MASTERDATA['IPDMRPEBEPH']">
        <div class="flex-box"><b>{{__t2('Bệnh phẩm')}}:</b> <p style="flex-grow: 1;" class="fake-input disable mb-5 ml-5">{{MASTERDATA['IPDMRPEBEPH'].Items[0].Value || 'N/A'}}</p></div>
        <CheckboxsValue :t2="true" class="flex-span" :data="MASTERDATA['IPDMRPEGPBT'].Items" :showall="true" :DataType="'Radio'"/>
      </div>
      <div class="mt-10"><label>{{dex[26]}} {{__t2('Tình hình tử vong')}}:</label></div>
      <div class="ml-10">
        <div v-if="MASTERDATA['IPDMRPTNGTV']"><b>{{__t2('Tử vong lúc')}}:</b> {{MASTERDATA['IPDMRPTNGTV'].Items[0].Value || 'N/A'}}</div>
        <div class="flex-box" v-if="MASTERDATA['IPDMRPTLDTV']">
          <CheckboxsValue class="flex-span" :t2="true" v-if="MASTERDATA['IPDMRPTLDTV']" :data="MASTERDATA['IPDMRPTLDTV'].Items" :showall="true" :DataType="'Radio'"/>
          <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDMRPTLDTV'].Items[2].Value">
            <p class="fake-input disable mb-5">{{MASTERDATA['IPDMRPTLDTV'].Items[3].Value || 'N/A'}}</p>
          </div>
        </div>
        <CheckboxsValue :indexs="indexs" :t2="true" class="flex-span" v-if="MASTERDATA['IPDMRPTTTTV']" :data="MASTERDATA['IPDMRPTTTTV'].Items" :showall="true" :DataType="'Radio'"/>
      </div>
      <div class="mt-10"><label>{{dex[27]}} {{__t2('Nguyên nhân chính tử vong')}}:</label></div>
      <div class="ml-10">
        <div class="form-group">
          <p v-if="MASTERDATA['IPDMRPTBCTV']" class="fake-input disable">{{MASTERDATA['IPDMRPTBCTV'].Items[0].Value || 'N/A'}}</p>
        </div>
        <div>
          <label>{{__t2('Mã ICD10')}}:</label>
          <Icd10View v-if="MASTERDATA['IPDMRPTICDT']" v-model="MASTERDATA['IPDMRPTICDT'].Items[0].Value"/>
        </div>
      </div>
      <div class="mt-10"><label>{{dex[28]}} {{__t2('Khám nghiệm tử thi')}}:</label><CheckboxsValue class="flex-span" v-if="MASTERDATA['IPDMRPTKNTT']" :data="MASTERDATA['IPDMRPTKNTT'].Items"  :DataType="'Radio'"/></div>
      <div class="mt-10"><label>{{dex[29]}} {{__t2('Chẩn đoán giải phẫu tử thi')}}:</label></div>
      <div class="ml-10">
        <div class="form-group">
          <p v-if="MASTERDATA['IPDMRPTBCKN']" class="fake-input disable">{{MASTERDATA['IPDMRPTBCKN'].Items[0].Value || 'N/A'}}</p>
        </div>
        <div>
          <label>{{__t2('Mã ICD10')}}:</label>
          <Icd10View v-if="MASTERDATA['IPDMRPTICDK']" v-model="MASTERDATA['IPDMRPTICDK'].Items[0].Value"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import MasterDatas from '@/services/MasterDatas'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import Obstetrics1 from '@/pages/IPD/MedicalRecord/Page2CPN/Obstetrics1.vue'
import Gynecological1 from '@/pages/IPD/MedicalRecord/Page2CPN/Gynecological1.vue'
import Oncology1 from '@/pages/IPD/MedicalRecord/Page2CPN/Oncology1.vue'
import BMTIMMACH1 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH1.vue'
import _ from 'lodash'
export default {
  name: 'PatientStatusAndDiagnose',
  props: ['DataSubmitReadOnly', 'dex', 'typeForm', 'routeType', 'DataSubmit', 'VisitId', 'VisitIdDrop', 'optionChild', 'ListSoSinh'],
  mixins: [MixinForm],
  data () {
    return {
      InterHospitalInfoTo: '',
      InterHospitalInfo: [
        {
          ViName: '1. Tuyến trên',
          EnName: '1. Tuyến trên',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITTR',
          Value: ''
        },
        {
          ViName: '2. Tuyến dưới',
          EnName: '2. Tuyến dưới',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITDU',
          Value: ''
        },
        {
          ViName: '3. Chuyên khoa',
          EnName: '3. Chuyên khoa',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVICKH',
          Value: ''
        }
      ],
      VisitTypes: [
        {
          ViName: '1. Cấp cứu',
          EnName: '1. Cấp cứu',
          DataType: 'Checkbox',
          Value: 'ED'
        },
        {
          ViName: '2. Khoa khám bệnh',
          EnName: '2. Khoa khám bệnh',
          DataType: 'Checkbox',
          Value: 'OPD'
        },
        {
          ViName: '3. Khoa điều trị',
          EnName: '3. Khoa điều trị',
          DataType: 'Checkbox',
          Value: 'IPD'
        }
      ],
      MASTERDATA: {
      },
      icd10Code: ['IPDMRPTICDTANS', 'IPDMRPTICDKANS', 'IPDMRPTICDCANS', 'IPDMRPTICDPANS', 'IPDMRPTICDTANS', 'IPDMRPTICDKANS', 'IPDMRPEICDCANS', 'IPDMRPEICDPANS', 'IPDMRPE889', 'IPDMRPE892'],
      DataSubmitReadOnlyICD21: [],
      indexs: [],
      GroupCodeMasterData: [
        'IPDMRPE803',
        'IPDMRPE807',
        'IPDMRPE907',
        'IPDMRPE909',
        'IPDMRPE911',
        'IPDMRPE914',
        'IPDMRPE916',
        'IPDMRPE917',
        'IPDMRPE819',
        'IPDMRPE821',
        'IPDMRPE812',
        'IPDMRPE919',
        'IPDMRPE922',
        'IPDMRPE913',
        'IPDMRPE915',
        'IPDMRPE809'
      ]
    }
  },
  components: {
    Obstetrics1,
    Gynecological1,
    Oncology1,
    BMTIMMACH1
  },
  computed: {
    // DataSubmitReadOnlyICD21 () {
    //   if (this.Customer.DateOfBirth) {
    //     // return moment().diff(moment(this.DataSubmit.Customer.DateOfBirth, this.vDateFormat), 'years')
    //     var now = new Date()
    //     var y = now.getFullYear()
    //     var dob = this.Customer.DateOfBirth.split('/')
    //     return y - parseInt(dob[2])
    //   }
    //   return 'N/A'
    // }
  },
  created () {
    this.getData()
    if (this.DataSubmitReadOnly.TwentyOne && this.DataSubmitReadOnly.TwentyOne.CurrentICD) {
      var CurrentICD = this.JSONParse(this.DataSubmitReadOnly.TwentyOne.CurrentICD)
      this.DataSubmitReadOnlyICD21 = CurrentICD ? [CurrentICD[0]] : []
    }
    this.VisitTypes.forEach(e => {
      e.Value = e.Value === this.DataSubmitReadOnly.Thirteen
    })
  },
  methods: {
    async getData (part) {
      await this.getMasterDatas({Form: 'IPDMRPT'})
      await this.getMasterDatas({Form: 'IPDMRPE'})
      await this.getMasterDatas({Form: 'IPDMRPG'})
      if (this.MASTERDATA && this.ListSoSinh && this.ListSoSinh.length) {
        this.ListSoSinh.forEach(elm => {
          this.GroupCodeMasterData.forEach(code => {
            if (this.MASTERDATA[code]) {
              let md = this.cloneObj(this.MASTERDATA[code])
              md.Code = code + '_' + elm.Id
              if (md.Items && md.Items.length) {
                md.Items.forEach(e => {
                  if (!e.Code.includes('_') && md.Code.includes(elm.Id)) {
                    e.Code = e.Code + '_' + elm.Id
                  }
                })
              }
              this.$set(this.MASTERDATA, md.Code, md)
            }
          })
        })
      }
      this.getDatas('part2')
      this.getDatas('part3')
      if (this.routeType === 'Neonatal') {
        if (this.MASTERDATA['IPDMRPTTHPT']) {
          this.MASTERDATA['IPDMRPTTHPT'].Items[0].ViName = 'Thủ thuật sau sinh'
          this.MASTERDATA['IPDMRPTTHPT'].Items[0].EnName = 'Procedure after birth'
          this.MASTERDATA['IPDMRPTTHPT'].Items[1].ViName = 'Phẫu thuật sau sinh'
          this.MASTERDATA['IPDMRPTTHPT'].Items[1].EnName = 'Surgery after birth'
        }
      }
      if (this.routeType === 'Obstetrics' || this.routeType === 'Gynecological' || this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V') {
        if (this.MASTERDATA['IPDMRPE898']) {
          this.MASTERDATA['IPDMRPE898'].Items[0].ViName = 'Tai biến'
          this.MASTERDATA['IPDMRPE898'].Items[0].EnName = 'Accident'
        }
      }
      // 1. Trong 24h vào viện
      // 2. Sau 24 giờ vào viện
      // 2. Trong 48 giờ vào viện
      // 3. Trong 72 giờ vào viện
      if (this.MASTERDATA['IPDMRPTTTTV']) {
        this.MASTERDATA['IPDMRPTTTTV'].Items.map((e, index) => {
          if (index === 0) {
            e.ViName = '1. Trong 24 giờ vào viện'
            e.EnName = '1. Within 24 hours of admission'
          }
          if (index === 1) {
            e.ViName = '2. Sau 24 giờ vào viện'
            e.EnName = '2. After 24 hours of admission'
          }
          if (index >= 2) {
            if (this.routeType === 'Gynecological' || this.routeType === 'Eye') {
              e.ViName = '2. Sau 48 giờ vào viện'
            } else {
              e.ViName = '2. Trong 48 giờ vào viện'
            }
            e.EnName = '2. After 48 hours of admission'
          }
          if (index === 3) {
            e.ViName = '3. Trong 72 giờ vào viện'
            e.EnName = '3. Within 72 hours of admission'
          }
        })
        if (this.routeType === 'Gynecological' ||
          this.routeType === 'A01_195_050919_V' ||
          this.routeType === 'A01_039_050919_V' ||
          this.routeType === 'A01_040_050919_V' ||
          this.routeType === 'Eye') {
          this.indexs = [0, 2, 3]
        } else if (this.routeType === 'Neonatal' || this.routeType === 'Pediatric') {
          this.indexs = [0, 1]
        } else {
          this.indexs = [0, 1]
        }
      }
      if (this.MASTERDATA['IPDMRPEKQDT'] && this.routeType === 'Obstetrics') {
        this.MASTERDATA['IPDMRPEKQDT'].Items[4].ViName = '6. Tử vong'
        this.MASTERDATA['IPDMRPEKQDT'].Items[4].EnName = '6. Deceased'
      }
    },
    getDatas (type) {
      new MedicalRecord().find(type + '/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.mapData(response.Datas)
        if (type === 'part3') {
          this.mapData(response.GeneralDatas)
        }
        if (response.MoveIn) {
          this.InterHospitalInfoTo = response.MoveIn
        }
        if (response.GeneralDatas) {
          this.InterHospitalInfo.forEach(e => {
            e.Value = response.GeneralDatas.find(f => f.Code === e.Code && (f.Value === 'True'))
          })
        }
      })
    },
    async getMasterDatas (query, callback) {
      await new MasterDatas(query)
        .all()
        .then(response => {
          response.forEach(item => {
            this.$set(this.MASTERDATA, item.Code, item)
          })
          callback(response)
        })
    },
    mapData (datas) {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
              }
            } else {
            }
          })
        }
      }
    }
  }
}
</script>
