<template>
  <div v-if="loaded">
    <div v-if="NeedNew">
      <div class="text-center">
        <p v-if="!IsLocked">{{__t('Chưa có PROM bệnh nhân mạch vành')}}</p>
        <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked && hasRole(`${_VisitType}PROMFCD2`)">{{__t('Tạo mới')}}</button>
        <!-- <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
      </div>
    </div>
    <div v-else class="content">
      <h3 class="text-center text-bold font16 textUppercase mb-5" v-html="$t('Bộ câu hỏi đánh giá về đau ngực của seattle')"></h3>
      <h3 class="text-center font16 italic mt-5">({{__t('Dành cho người bệnh được chẩn đoán bệnh động mạch vành')}})</h3>
      <div class="title mt-20">
        <div class="row">
          <div class="col-md-4">
            <div v-if="DataSubmit" class="flex-box flex-center" style="transform: translateY(5px)">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold; margin-bottom: 0">{{__t('PROM.nguoi_danh_gia')}}:</label>
              <div class="search-name">
                <ad-Info :ad="DataSubmit.CreatedBy"/>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div v-if="DataSubmit" class="flex-box flex-center mb-10">
              <label class="display-inline ml-5 mr-5 my-0" style="font-weight: bold">{{__t('PROM.tao_luc')}}:</label>
              <div class="search-name">
                <VDateTimePicker :readonly="true" :hideTooltip="false" class="display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="CreatedAt"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Block-1 -->
      <div class="tbl-title">I. {{__t('PROM.danh_gia')}}</div>
      <table class="table v-table-1 no-margin col-1-1" id="block1">
        <tr>
          <td v-if="MASTERDATA['PROMFCD1']">
            <div>
              <p v-html="$t('Trong vòng 4 tuần vừa qua, do cơn đau thắt ngực, anh/chị đã gặp khó khăn như thế nào khi thực hiện các công việc sau đây')"></p>
              <table class="table-bg">
                <thead>
                  <tr>
                    <td width="30%">{{__t('Hoạt động')}}</td>
                    <td width="10%">{{__t('Hạn chế rất nhiều')}}</td>
                    <td width="10%">{{__t('Hạn chế nhiều')}}</td>
                    <td width="10%">{{__t('Hạn chế vừa')}}</td>
                    <td width="10%">{{__t('Hạn chế một chút')}}</td>
                    <td width="10%">{{__t('Không hạn chế')}}</td>
                    <td width="10%">{{__t('Hạn chế vì lý do khác hoặc là tôi không làm hoạt động này')}}</td>
                  </tr>
                </thead>
                <tr v-if="MASTERDATA['PROMFCD2']">
                  <td>{{__t('Đi bộ trong nhà hoặc trên mặt đất bằng')}}</td>
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD2'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD2-' + index" v-model="MASTERDATA['PROMFCD2'].Items[index].Value">
                        <label :for="'PROMFCD2-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD2'].Items, MASTERDATA['PROMFCD2'].Items[index])">{{__label(MASTERDATA['PROMFCD2'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD2'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['PROMFCD10']">
                  <td>{{__t('Làm các công việc thông thường ở nhà: làm vườn, hút bụi hoặc mang vác đồ')}}</td>
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD10'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD10-' + index" v-model="MASTERDATA['PROMFCD10'].Items[index].Value">
                        <label :for="'PROMFCD10-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD10'].Items, MASTERDATA['PROMFCD10'].Items[index])">{{__label(MASTERDATA['PROMFCD10'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD10'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['PROMFCD18']">
                  <td>{{__t('Nâng hoặc di chuyển những đồ vật nặng (VD:đồ nội thất, bế trẻ em)')}}</td>
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD18'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD18-' + index" v-model="MASTERDATA['PROMFCD18'].Items[index].Value">
                        <label :for="'PROMFCD18-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD18'].Items, MASTERDATA['PROMFCD18'].Items[index])">{{__label(MASTERDATA['PROMFCD18'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD18'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
              </table>
            </div>
            <div class="mt-10">
              <p v-html="$t('Trong vòng 4 tuần qua, trung bình anh/chị có bao nhiêu lần')"></p>
              <table class="table-bg">
                <thead>
                  <tr>
                    <td width="30%">{{__t('')}}</td>
                    <td width="10%">{{__t('Nhiều hơn 4 lần')}}</td>
                    <td width="10%">{{__t('1 đến 3 lần/ngày')}}</td>
                    <td width="10%">{{__t('Nhiều hơn 3 lần /tuần nhưng không phải hàng ngày')}}</td>
                    <td width="10%">{{__t('1 đến 2 lần/tuần')}}</td>
                    <td width="10%">{{__t('Ít hơn 1 lần/tuần')}}</td>
                    <td width="10%">{{__t('Không có cơn đau nào trong 4 tuần')}}</td>
                  </tr>
                </thead>
                <tr v-if="MASTERDATA['PROMFCD27']">
                  <td>{{__t('Bị đau ngực, cảm giác tức nặng hoặc đau thắt ngực')}}?</td>
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD27'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD27-' + index" v-model="MASTERDATA['PROMFCD27'].Items[index].Value">
                        <label :for="'PROMFCD27-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD27'].Items, MASTERDATA['PROMFCD27'].Items[index])">{{__label(MASTERDATA['PROMFCD27'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD27'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['PROMFCD35']">
                  <td>{{__t('Đã phải sử dụng NitroGlycerin cho tình trạng đau thắt ngực, cảm giác tức nặng ngực')}}?</td>
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD35'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD35-' + index" v-model="MASTERDATA['PROMFCD35'].Items[index].Value">
                        <label :for="'PROMFCD35-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD35'].Items, MASTERDATA['PROMFCD35'].Items[index])">{{__label(MASTERDATA['PROMFCD35'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD35'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
              </table>
            </div>
            <div class="mt-10">
              <p v-html="$t('Trong vòng 4 tuần qua, tình trạng tức nặng ngực hoặc đau thắt ngực đã hạn chế việc tận hưởng cuộc sống của anh/chị ở mức độ nào')"></p>
              <table class="table-bg table__width">
                <thead>
                  <tr>
                    <td v-html="$t('Hạn chế rất nhiều ')"></td>
                    <td v-html="$t('Hạn chế nhiều ')"></td>
                    <td v-html="$t('Hạn chế vừa ')"></td>
                    <td v-html="$t('Hạn chế một chút ')"></td>
                    <td v-html="$t('Không hạn chế ')"></td>
                  </tr>
                </thead>
                <tr v-if="MASTERDATA['PROMFCD43']">
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD43'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD43-' + index" v-model="MASTERDATA['PROMFCD43'].Items[index].Value">
                        <label :for="'PROMFCD43-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD43'].Items, MASTERDATA['PROMFCD43'].Items[index])">{{__label(MASTERDATA['PROMFCD43'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD43'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
              </table>
            </div>
            <div class="mt-10">
              <p v-html="$t('Nếu cứ phải sống cả đời với đau thắt ngực như tình trạng hiện nay thì anh/chị sẽ cảm thấy như thế nào')"></p>
              <table class="v-table-1 no-margin col-1-1 table-bg table__width">
                <thead>
                  <tr>
                    <td>{{__t('Hoàn toàn thất vọng')}}</td>
                    <td>{{__t('Khá thất vọng')}}</td>
                    <td>{{__t('Khá hài lòng')}}</td>
                    <td>{{__t('Rất hài lòng')}}</td>
                    <td>{{__t('Hoàn toàn hài lòng')}}</td>
                  </tr>
                </thead>
                <tr v-if="MASTERDATA['PROMFCD50']">
                  <td v-if="index > 0 && !isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD50'].Items" :key="index">
                    <div class="group-radio full-width">
                      <span>
                        <input type="checkbox" :id="'PROMFCD50-' + index" v-model="MASTERDATA['PROMFCD50'].Items[index].Value">
                        <label :for="'PROMFCD50-' + index" @click="checkbox2Radio(MASTERDATA['PROMFCD50'].Items, MASTERDATA['PROMFCD50'].Items[index])">{{__label(MASTERDATA['PROMFCD50'].Items[index])}}</label>
                      </span>
                    </div>
                  </td>
                  <td class="text-center" v-if="index > 0 && isReadOnly" v-for="(item, index) in MASTERDATA['PROMFCD50'].Items" :key="index">
                    <b class="el-radio-view" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                      <span>{{__t(item.ViName)}}</span>
                    </b>
                    <b v-else></b>
                  </td>
                </tr>
              </table>
            </div>
            <div class="mt-10">
              <p v-html="$t('Bộ câu hỏi về khó thở của ROSE: Trong vòng 4 tuần vừa qua, anh/chị có cảm thấy khó thở khi')"></p>
              <div class="d-flex flex-center">
                <div class="no-wrap" style="width: 400px;">{{ __label(MASTERDATA["PROMFCD58"]) }}</div>
                <MDRadio v-if="MASTERDATA['PROMFCD58'] && !isReadOnly" v-model="MASTERDATA['PROMFCD58']"/>
                <MDRadioView v-else :data="MASTERDATA['PROMFCD58'].Items"/>
              </div>
              <div class="d-flex flex-center mt-5">
                <div class="no-wrap" style="width: 400px;">{{ __label(MASTERDATA["PROMFCD61"]) }}</div>
                <MDRadio v-if="MASTERDATA['PROMFCD61'] && !isReadOnly" v-model="MASTERDATA['PROMFCD61']"/>
                <MDRadioView v-else :data="MASTERDATA['PROMFCD61'].Items"/>
              </div>
              <div class="d-flex flex-center mt-5">
                <div class="no-wrap" style="width: 400px;">{{ __label(MASTERDATA["PROMFCD64"]) }}</div>
                <MDRadio v-if="MASTERDATA['PROMFCD64'] && !isReadOnly" v-model="MASTERDATA['PROMFCD64']"/>
                <MDRadioView v-else :data="MASTERDATA['PROMFCD64'].Items"/>
              </div>
              <div class="d-flex flex-center mt-5">
                <div class="no-wrap" style="width: 400px;">{{ __label(MASTERDATA["PROMFCD67"]) }}</div>
                <MDRadio v-if="MASTERDATA['PROMFCD67'] && !isReadOnly" v-model="MASTERDATA['PROMFCD67']"/>
                <MDRadioView v-else :data="MASTERDATA['PROMFCD67'].Items"/>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- Block-2 -->
      <div class="tbl-title">II. {{__t('PROM.ket_luan')}}</div>
      <table class="table v-table-1 no-margin col-1-1" id="block2">
        <tr>
          <td>
            <div>
              <div class="d-flex flex-center">
                <p class="my-0 w400">1. {{__t('Điểm đánh giá khả năng hạn chế thể lực (SAQ-PL)')}}:</p>
                <FakeInput style="margin-left: 0;" v-model="totalQuestion1" />
              </div>
              <div class="d-flex flex-center mt-5">
                <p>&rArr;<b> {{__t('Đề xuất hành động can thiệp')}}</b>:</p>
                <p class="ml-5 italic" v-if="totalQuestion1 < 30 && totalQuestion1 !== 'N/A'">{{__t('Tập phục hồi chức năng để tăng khả năng gắng sức')}}</p>
                <p class="ml-5 italic" v-else-if="totalQuestion1 >= 30 && totalQuestion1 !== 'N/A'">{{__t('Kết quả bình thường')}}</p>
                <p class="ml-5" v-else>{{__t('N/A')}}</p>
              </div>
            </div>
            <div>
              <div class="d-flex flex-center">
                <p class="my-0 w400">2. {{__t('Điểm đánh giá tần suất xuất hiện triệu chứng (SAQ-SF)')}}:</p>
                <FakeInput style="margin-left: 0;" v-model="totalQuestion2" />
              </div>
              <div class="d-flex mt-5">
                <p>&rArr;<b> {{__t('Đề xuất hành động can thiệp')}}</b>:</p>
                <ul class="ml-5 italic" v-if="totalQuestion2 < 30 && totalQuestion2 !== 'N/A'">
                  <li>{{__t('BS đánh giá lại điều trị')}}</li>
                  <li>{{__t('Tối ưu hóa phác đồ chống đau thắt ngực')}}</li>
                  <li>{{__t('Bổ sung thuốc chống đau thắt ngực theo hướng dẫn')}}</li>
                </ul>
                <p class="ml-5 italic" v-else-if="totalQuestion2 >= 30 && totalQuestion2 !== 'N/A'">{{__t('Kết quả bình thường')}}</p>
                <p class="ml-5" v-else>{{__t('N/A')}}</p>
              </div>
            </div>
            <div>
              <div class="d-flex flex-center">
                <p class="my-0 w400">3. {{__t('Điểm đánh giá Chất lượng sống (SAQ-QL)')}}:</p>
                <FakeInput style="margin-left: 0;" v-model="totalQuestion3_4" />
              </div>
              <div class="d-flex flex-center mt-5">
                <p>&rArr;<b> {{__t('Đề xuất hành động can thiệp')}}</b>:</p>
                <p class="ml-5 italic" v-if="totalQuestion3_4 < 30 && totalQuestion3_4 !== 'N/A'">{{__t('BN nên khám chuyên khoa sức khỏe tâm thần')}}</p>
                <p class="ml-5 italic" v-else-if="totalQuestion3_4 >= 30 && totalQuestion3_4 !== 'N/A'">{{__t('Kết quả bình thường')}}</p>
                <p class="ml-5" v-else>{{__t('N/A')}}</p>
              </div>
            </div>
            <div>
              <div class="d-flex flex-center">
                <p class="my-0 w400">4. {{__t('Số câu chọn “Có” trong bộ câu hỏi khó thở của ROSE')}}:</p>
                <FakeInput v-if="totalQuestion5IsTrue || totalQuestion5 > 0" style="margin-left: 0;" v-model="totalQuestion5" />
                <p style="margin-left: 0;" class="fake-input disable" v-else>0</p>
              </div>
              <div class="d-flex flex-center mt-5">
                <p>&rArr;<b> {{__t('Đề xuất hành động BS cần can thiệp')}}</b>:</p>
                <p class="ml-5 italic" v-if="totalQuestion1 > 30 && totalQuestion1 !== 'N/A' && totalQuestion5 >= 2">{{__t('BN nên khám chuyên khoa Hô hấp')}}</p>
                <p class="ml-5" v-else-if="totalQuestion5 === 0 && totalQuestion5IsTrue">{{__t('N/A')}}</p>
                <p class="ml-5 italic" v-else>{{__t('Kết quả bình thường')}}</p>
              </div>
            </div>
          </td>
        </tr>
        <!-- Chân ký -->
        <div v-if="DataSubmit.UserConfirm" class="row text-center mt-10">
          <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.UserConfirm.UserName">
            <div style="font-weight: normal">{{ DataSubmit.UserConfirm.ConfirmAt | formatDateWithoutSecon}}</div>
            <eform-signature
              :ad="DataSubmit.UserConfirm.UserName"
              :title="__t('Bác sĩ/ Điều dưỡng')"
            />
          </div>
          <div class="col-md-6 col-md-offset-6" v-else>
            <p class="mb-10">
              <b>{{ __t('Bác sĩ/ Điều dưỡng') }}</b>
            </p>
            <i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i>
            <button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ/ Điều dưỡng')" class="btn v-white-btn">
              {{ __t('Xác nhận') }}
            </button>
          </div>
        </div>
      </table>
      <!-- footer -->
      <FloatBlock @handleBack='handleBack()' :openBack="true">
        <template slot='buttons'>
          <div v-if="!isReadOnly" class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="!isReadOnly">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
    </div>
    <p v-if="DataSubmit.Datas">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt | formatDateWithoutSecon }}</p>
  </div>
  <!-- eslint-disable-next-line vue/valid-template-root -->
  <div v-else class="loading-text"><v-loading/></div>
</template>

<script>
import PromForCoronaryDisease from '@/services/IPD/PromForCoronaryDisease'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import * as Code from './MdCode.js'
import moment from 'moment'
import _ from 'lodash'

export default {
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    DoctorConfirm,
    VDateTimePicker
  },
  data () {
    return {
      DataSubmit: {},
      MASTERDATA: {},
      dataMaster: {},
      popupTitle: '',
      CreatedAt: '',
      TypeConfirm: '',
      DataType: 'Radio',
      NeedNew: false,
      IsLocked: false,
      checkEdited: false,
      loaded: false,
      totalQuestion5IsTrue: true,
      dataQuestion5: []
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'PROMFCD'}, () => {
      this.getInfo()
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        this.dataQuestion5 = []
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
        [Code.MDCODES8, Code.MDCODES9, Code.MDCODES10, Code.MDCODES11].map(items => {
          items.map(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.map(item => {
                if (item.EnName === 'No' && item.Value === true) {
                  this.dataQuestion5.push(item)
                }
              })
            }
          })
        })
        this.dataQuestion5.length > 0 ? this.totalQuestion5IsTrue = false : this.totalQuestion5IsTrue = true
      },
      deep: true
    }
  },
  computed: {
    isReadOnly: function () {
      if (this.DataSubmit.IsUnlockedConfirm) {
        return this.viewOnly || this.DataSubmit.UserConfirm.UserName || !this.hasRole(`${this._VisitType}PROMFCD3`)
      } else {
        return this.viewOnly || this.IsLocked || this.getCurrentUsername() !== this.DataSubmit.CreatedBy || this.DataSubmit.UserConfirm.UserName || !this.hasRole(`${this._VisitType}PROMFCD3`)
      }
      // return false
    },
    totalQuestion1: function () {
      let totals = [Code.MDCODES1, Code.MDCODES2, Code.MDCODES3].map(items => {
        return _.max(items.map(code => {
          if (this.MASTERDATA[code]) {
            return _.max(this.MASTERDATA[code].Items.map(item => {
              if (item.DataType === 'Radio' && item.Data && item.Value) {
                if (item.Data === '6') {
                  return 0
                }
                return this.parseInt(item.Data)
              } else {
                return 0
              }
            }))
          } else {
            return 0
          }
        }))
      })
      if (_.sum(totals)) {
        if (100 * ((_.sum(totals) / 3) - 1) / 4 === 0 && _.sum(totals)) {
          return '0'
        } else {
          let num = 100 * ((_.sum(totals) / 3) - 1) / 4
          return +(Math.round(num + 'e+2') + 'e-2')
        }
      }
    },
    totalQuestion2: function () {
      let totals = [Code.MDCODES4, Code.MDCODES5].map(items => {
        return _.max(items.map(code => {
          if (this.MASTERDATA[code]) {
            return _.max(this.MASTERDATA[code].Items.map(item => {
              return (item.DataType === 'Radio' && item.Data && item.Value) ? this.parseInt(item.Data) : 0
            }))
          } else {
            return 0
          }
        }))
      })
      if (_.sum(totals)) {
        if (100 * ((_.sum(totals) / 2) - 1) / 5 === 0 && _.sum(totals)) {
          return '0'
        } else {
          return 100 * ((_.sum(totals) / 2) - 1) / 5
        }
      }
    },
    totalQuestion3_4: function () {
      let totals = [Code.MDCODES6, Code.MDCODES7].map(items => {
        return _.max(items.map(code => {
          if (this.MASTERDATA[code]) {
            return _.max(this.MASTERDATA[code].Items.map(item => {
              return (item.DataType === 'Radio' && item.Data && item.Value) ? this.parseInt(item.Data) : 0
            }))
          } else {
            return 0
          }
        }))
      })
      if (_.sum(totals)) {
        if (100 * ((_.sum(totals) / 2) - 1) / 4 === 0 && _.sum(totals)) {
          return '0'
        } else {
          return 100 * ((_.sum(totals) / 2) - 1) / 4
        }
      }
    },
    totalQuestion5: function () {
      let totals = [Code.MDCODES8, Code.MDCODES9, Code.MDCODES10, Code.MDCODES11].map(items => {
        return _.max(items.map(code => {
          if (this.MASTERDATA[code]) {
            return _.max(this.MASTERDATA[code].Items.map(item => {
              return (item.DataType === 'Radio' && item.Value && item.EnName === 'Yes') ? 1 : 0
            }))
          } else {
            return 0
          }
        }))
      })
      return _.sum(totals)
    }
  },
  methods: {
    getInfo () {
      new PromForCoronaryDisease({VisitType: this._VisitType, hidemsg: true}).find('Info/' + this._VisitId).then(response => {
        this.IsLocked = response.IsLocked
      })
    },
    getData () {
      this.hasData = false
      new PromForCoronaryDisease({VisitType: this._VisitType, hidemsg: true}).find('GetFormByVisitId/' + this._VisitId).then(response => {
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.DataSubmit = response
        this.CreatedAt = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 500)
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this.NeedNew = e.data.NeedNew
      })
    },
    handleSubmit () {
      this.DataSubmit.Datas = []
      this.sendSumaryData()
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
          })
        }
      }
      new PromForCoronaryDisease({VisitType: this._VisitType}).update('/Update/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.getData()
        // this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    create () {
      new PromForCoronaryDisease({VisitType: this._VisitType}).update('/Create/' + this._VisitId, {}).then(response => {
        this.reload()
      })
    },
    sendSumaryData () {
      // 1.
      if (this.totalQuestion1 < 30) {
        this.MASTERDATA['PROMFCD70'].Items[0].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[4].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[4].EnName,
          Point: this.totalQuestion1 ? this.totalQuestion1.toString() : '',
          Summary: 'Tập phục hồi chức năng để tăng khả năng gắng sức',
          Order: 1
        })
      } else if (this.totalQuestion1 >= 30) {
        this.MASTERDATA['PROMFCD70'].Items[0].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[4].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[4].EnName,
          Point: this.totalQuestion1 ? this.totalQuestion1.toString() : '',
          Summary: 'Kết quả bình thường',
          Order: 1
        })
      } else {
        this.MASTERDATA['PROMFCD70'].Items[0].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[4].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[4].EnName,
          Point: this.totalQuestion1 ? this.totalQuestion1.toString() : 'N/A',
          Summary: 'N/A',
          Order: 1
        })
      }
      // 2.
      if (this.totalQuestion2 < 30) {
        this.MASTERDATA['PROMFCD70'].Items[1].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[5].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[5].EnName,
          Point: this.totalQuestion2 ? this.totalQuestion2.toString() : '',
          Summary: 'BS đánh giá lại điều trị - Tối ưu hóa phác đồ chống đau thắt ngực - Bổ sung thuốc chống đau thắt ngực theo hướng dẫn',
          Order: 2
        })
      } else if (this.totalQuestion2 >= 30) {
        this.MASTERDATA['PROMFCD70'].Items[1].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[5].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[5].EnName,
          Point: this.totalQuestion2 ? this.totalQuestion2.toString() : '',
          Summary: 'Kết quả bình thường',
          Order: 2
        })
      } else {
        this.MASTERDATA['PROMFCD70'].Items[1].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[5].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[5].EnName,
          Point: this.totalQuestion2 ? this.totalQuestion2.toString() : 'N/A',
          Summary: 'N/A',
          Order: 2
        })
      }
      // 3.
      if (this.totalQuestion3_4 < 30) {
        this.MASTERDATA['PROMFCD70'].Items[2].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[6].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[6].EnName,
          Point: this.totalQuestion3_4 ? this.totalQuestion3_4.toString() : '',
          Summary: 'BN nên khám chuyên khoa sức khỏe tâm thần',
          Order: 3
        })
      } else if (this.totalQuestion3_4 >= 30) {
        this.MASTERDATA['PROMFCD70'].Items[2].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[6].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[6].EnName,
          Point: this.totalQuestion3_4 ? this.totalQuestion3_4.toString() : '',
          Summary: 'Kết quả bình thường',
          Order: 3
        })
      } else {
        this.MASTERDATA['PROMFCD70'].Items[2].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[6].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[6].EnName,
          Point: this.totalQuestion3_4 ? this.totalQuestion3_4.toString() : 'N/A',
          Summary: 'N/A',
          Order: 3
        })
      }
      // 4.
      if (this.totalQuestion1 > 30 && this.totalQuestion5 >= 2 && this.totalQuestion1 !== 'N/A') {
        this.MASTERDATA['PROMFCD70'].Items[3].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[7].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[7].EnName,
          Point: this.totalQuestion5 ? this.totalQuestion5.toString() : '',
          Summary: 'BN nên khám chuyên khoa Hô hấp',
          Order: 4
        })
      } else if (this.totalQuestion5 === 0 && this.totalQuestion5IsTrue) {
        this.MASTERDATA['PROMFCD70'].Items[3].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[7].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[7].EnName,
          Point: 'N/A',
          Summary: 'N/A',
          Order: 4
        })
      } else {
        this.MASTERDATA['PROMFCD70'].Items[3].Value = JSON.stringify({
          ViTitle: this.MASTERDATA['PROMFCD70'].Items[7].ViName,
          EnTitle: this.MASTERDATA['PROMFCD70'].Items[7].EnName,
          Point: this.totalQuestion5 ? this.totalQuestion5.toString() : '0',
          Summary: 'Kết quả bình thường',
          Order: 4
        })
      }
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      if (this.checkEdited) {
        await this.handleSubmit()
      }
      new PromForCoronaryDisease({VisitType: this._VisitType}).update('/Confirm/' + this._VisitId, data).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.reload()
      }).catch(e => {
        this.toastedError(this.$t('Bạn không có quyền xác nhận'))
        this.$modal.hide('doctorConfirm')
      })
    },
    handleBack () {
      if (this.checkEdited) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn tạo PROM bệnh nhân mạch vành'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.w400 {
  width: 400px;
}
.table-bg {
  thead {
    tr {
      td {
        text-align: center;
        background-color: #f5f5f5 !important;
      }
    }
  }
}
.table__width {
  width: 100%;
  thead {
    tr {
      td {
        width: calc(100% / 5);
      }
    }
  }
}
</style>
