<template>
  <div>
    <modal name="PathologyPopup" transition="pop-out" id="PathologyPopup" height="auto" :width="modalWidth" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center" v-if="item.Pathology">
          <h3 class="box-title">{{item.Code}} - {{__label(item)}}</h3>
        </div>
        <!-- <div class="red italic mrb20">{{__t('Chỉ người tạo phiếu được chỉnh sửa nội dung và không được chỉnh sửa nếu dịch vụ đã thực hiện!')}}</div> -->
        <div class="box-body padding-15" v-if="item.Pathology">
          <template v-if="PathologyTypes">
            <h4 v-if="readonly"><b>{{(PathologyTypes.find(e => e.Code === item.Pathology.PathologyType) || {}).ViName}}</b></h4>
            <div class="group-radio" v-else>
              <template  v-for="(status, index) in PathologyTypes">
                <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status.Code" v-model="item.Pathology.PathologyType">
                <label :class="'status-' + status.Code" :id="'status-' + status.Id" :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
              </template>
            </div>
          </template>
          <div>
          <table class="table v-table-1 no-margin col-1-1 mt-15" v-if="item.Pathology.PathologyType !== '001'">
            <tr v-if="item.Pathology.PathologyType === '003'">
              <th width="1"><div class="w160">{{__t('Chu kỳ kinh nguyệt cuối')}}<span class="required">*</span></div></th>
              <td>
                <div class="flex-box flex-center">
                  <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="item.Pathology.LatestMenstrualPeriod"/>
                  <!-- <b class="mr-5 ml-5">{{__t('Ngày hành kinh cuối')}}:</b>
                  <div class="no-wrap">
                    <v-date-time-picker :allday="'allday'" :readonly="readonly" v-model="item.Pathology.TheLastDayOfLatestMenstrualPeriod" class=" select-boox" :format="vDateTimeFormat"/>
                  </div> -->
                </div>
              </td>
            </tr>
            <tr v-if="item.Pathology.PathologyType === '003'">
              <th width="1"><div class="w160">{{__t('Sau mãn kinh')}}</div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="item.Pathology.PostMenopause"/>
              </td>
            </tr>
            <tr v-if="['004', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Phương pháp phẫu thuật')}}</div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.SurgeryMethod"/>
              </td>
            </tr>
            <tr v-if="['002', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Vị trí lấy bệnh phẩm')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.SiteOfSpecimen"/>
              </td>
            </tr>
            <tr v-if="['002', '003', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Thời gian lấy mẫu')}}<span class="required">*</span></div></th>
              <td>
                <VDateTimePicker5
                  :readonly="readonly"
                  :max="item.Pathology.TimeOfStore"
                  v-model="item.Pathology.CollectionTime"
                  class="select-boox"
                  :format="vDateTimeFormat"
                  id="DateAndTimeOfSpecimenCollection"
                  :nobang="true"
                  :allday="'allday'"/>
                <!-- <VDateTimePickerV2 :allday="'allday'" :readonly="readonly" v-model="item.Pathology.CollectionTime" class=" select-boox" :format="vDateTimeFormat"/> -->
              </td>
            </tr>
            <tr v-if="['002', '003', '004'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Cố định bằng dung dịch')}}<span class="required">*</span></div></th>
              <td>
                <span class="fake-input disable" v-if="readonly">{{(StoreSpecimenWithSolutionOption.find(e => e.code === item.Pathology.StoreSpecimenWithSolution) || {}).label}}</span>
                <v-select v-else v-model="item.Pathology.StoreSpecimenWithSolution" :options="StoreSpecimenWithSolutionOption" />
              </td>
            </tr>
            <tr v-if="['002', '003', '004'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('TG mẫu được cố định')}}<span class="required">*</span></div></th>
              <td>
                <VDateTimePicker5
                  :readonly="readonly"
                  v-model="item.Pathology.TimeOfStore"
                  class="select-boox"
                  :format="vDateTimeFormat"
                  :allday="'allday'"
                  :nobang="true"
                  id="FixativeTime"/>
                <!-- <v-date-time-picker :allday="'allday'" :readonly="readonly" v-model="item.Pathology.TimeOfStore" class=" select-boox" :format="vDateTimeFormat"/> -->
              </td>
            </tr>
            <tr v-if="['004', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Định hướng mẫu BP')}}</div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.SpecimenOrientation"/>
              </td>
            </tr>
            <tr v-if="['002', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Tóm tắt dấu hiệu lâm sàng chính và các xét nghiệm khác')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.ClinicalHistoryAndLabTests"/>
              </td>
            </tr>
            <tr v-if="['002', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Quá trình điều trị')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.Treatment"/>
              </td>
            </tr>
            <tr v-if="['002', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Nhận xét đại thể')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.GrosDescription"/>
              </td>
            </tr>
            <tr v-if="['002', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Kết quả lần trước')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.PreviousResults"/>
              </td>
            </tr>
            <tr v-if="['003'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Tiền sử xét nghiệm tế bào cổ tử cung và điều trị trước đó')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.CervicalCytologyTestHistoryAndTreatmentBefore"/>
              </td>
            </tr>
            <tr v-if="['003'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Tiền sử ung thư tế bào biểu mô trước đó')}}</div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.HistoryOfSquamousCellCarcinoma"/>
              </td>
            </tr>
            <tr v-if="['002', '003', '004', '005', '006'].includes(item.Pathology.PathologyType)">
              <th width="1"><div class="w160">{{__t('Chẩn đoán lâm sàng')}}<span class="required">*</span></div></th>
              <td>
                <textarea-autosize :readonly="readonly" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="item.Pathology.ClinicalDiagnosis"/>
              </td>
            </tr>
            <tr v-if="['003'].includes(item.Pathology.PathologyType)">
              <td colspan="2">
                <div class="service-list d-flex x23" :class="{'disable': readonly}">
                  <div class="service-item d-flex" style="width: 33%" :key="index" :data="service" v-for="(service, index) in GynecologicalCytologyTypes">
                    <div class="v-checkbox v-checkbox-2">
                      <input type="checkbox" :id="'xntbhpk-' + index" v-model="item.Pathology[service.Key]">
                      <label :for="'xntbhpk-' + index"></label>
                    </div>
                    <span>{{__label(service)}}</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row" v-if="readonly">
            <div class="col-sm-12 col-md-12"><button type="button" class="btn btn-block v-yellow-btn" @click="close()">{{__t('Đồng ý')}}</button></div>
          </div>
          <div class="row" v-else>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': !isValidate}" class="btn btn-block v-yellow-btn" @click="ok()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VDateTimePickerV2 from '@/components/VDateTimePickerV2.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import EventBus from '@/lib/eventBus'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
const MODAL_WIDTH = 970

export default {
  name: 'PathologyPopup',
  props: ['readonly'],
  mixins: [MixinPlaceDiagnostics],
  components: {
    VDateTimePicker, VDateTimePickerV2, VDateTimePicker5
  },
  data () {
    return {
      rawObj: {},
      item: {},
      modalWidth: MODAL_WIDTH,
      GynecologicalCytologyTypes: [
        {
          ViName: 'Dụng cụ tránh thai',
          EnName: 'I.U.D',
          Value: 1,
          Key: 'IsBirthControlMethod'
        },
        {
          ViName: 'Điều trị xạ trị',
          EnName: 'Irradiationa therapy',
          Value: 2,
          Key: 'IsRadiationTheorapy'
        },
        {
          ViName: 'Hậu sản',
          EnName: 'Postpartum',
          Value: 3,
          Key: 'IsPostpartum'
        },
        {
          ViName: 'Điều trị hormone',
          EnName: 'Hormone therapy',
          Value: 4,
          Key: 'IsHormoneTreatment'
        },
        {
          ViName: 'Chảy máu sau mãn kinh',
          EnName: 'Postmenopausal bleeding',
          Value: 5,
          Key: 'IsPostMenopauseBleeding'
        },
        {
          ViName: 'Dùng thuốc tránh thai',
          EnName: 'Birth control pills',
          Value: 6,
          Key: 'IsBirthControlPills'
        },
        {
          ViName: 'Cắt tử cung',
          EnName: 'Hyst',
          Value: 7,
          Key: 'IsUterusremoval'
        },
        {
          ViName: 'Mang thai',
          EnName: 'Pregnant',
          Value: 8,
          Key: 'IsPregnant'
        },
        {
          ViName: 'Đang cho con bú',
          EnName: 'Breastfeeding',
          Value: 9,
          Key: 'IsBreastfeeding'
        }
      ],
      StoreSpecimenWithSolutionOption: [
        {
          label: 'Không',
          code: '0'
        }, {
          label: 'NBF 10%',
          code: '1'
        }, {
          label: 'Cellfix',
          code: '2'
        }, {
          label: 'Cồn 95',
          code: '3'
        }, {
          label: 'Khác',
          code: '4'
        }
      ],
      PathologyTypes: [{
        ViName: 'Không dùng',
        EnName: 'Not use',
        Code: '001',
        Id: '001'
      }, {
        ViName: 'PXN Tế bào',
        EnName: 'Cytopathology',
        Code: '002',
        Id: '002'
      }, {
        ViName: 'XN tế bào học phụ khoa',
        EnName: 'Gyn cytopathology',
        Code: '003',
        Id: '003'
      }, {
        ViName: 'PXN mô bệnh học',
        EnName: 'Histopathology',
        Code: '004',
        Id: '004'
      }, {
        ViName: 'PXN khối tế bào',
        EnName: 'Cell block',
        Code: '005',
        Id: '005'
      }, {
        ViName: 'PXN sinh thiết lạnh',
        EnName: 'Frosen section',
        Code: '006',
        Id: '006'
      }],
      edited: false,
      isFirst: true
    }
  },
  computed: {
    ...mapGetters({
      editItem: 'PlaceDiagnostics/getEditItem'
    }),
    isValidate: function () {
      return this.item.Pathology && (
        this.item.Pathology.PathologyType === '001' ||
        (this.item.Pathology.PathologyType === '002' && this.is002()) ||
        (this.item.Pathology.PathologyType === '003' && this.is003()) ||
        (this.item.Pathology.PathologyType === '004' && this.is004()) ||
        (this.item.Pathology.PathologyType === '005' && this.is005()) ||
        (this.item.Pathology.PathologyType === '006' && this.is006())
      )
    }
  },
  watch: {
    editItem: {
      handler (a, b) {
        if (a) this.open(a)
      },
      deep: true
    },
    item: {
      handler (a, b) {
        if (this.isFirst) {
          this.isFirst = false
        } else {
          this.edited = true
        }
      },
      deep: true
    }
  },
  created () {
    if (this.readonly) {
      EventBus.$on('openPathologyPopup', this.open)
    }
  },
  beforeDestroy () {
    if (this.readonly) {
      EventBus.$off('openPathologyPopup')
    }
  },
  methods: {
    is006 () {
      // SiteOfSpecimen, ClinicalHistoryAndLabTests, Treatment,GrosDescription,PreviousResults,Diagnosis
      return this.item.Pathology.SiteOfSpecimen &&
        this.item.Pathology.CollectionTime &&
        this.item.Pathology.ClinicalHistoryAndLabTests &&
        this.item.Pathology.Treatment &&
        this.item.Pathology.GrosDescription &&
        this.item.Pathology.ClinicalDiagnosis &&
        this.item.Pathology.PreviousResults
    },
    is005 () {
      // SurgeryMethod, SiteOfSpecimen,ClinicalHistoryAndLabTests,Treatment,GrosDescription,PreviousResults,Diagnosis
      // SurgeryMethod, SpecimenOrientation
      return this.item.Pathology.SiteOfSpecimen &&
        this.item.Pathology.CollectionTime &&
        this.item.Pathology.ClinicalHistoryAndLabTests &&
        this.item.Pathology.Treatment &&
        this.item.Pathology.GrosDescription &&
        this.item.Pathology.ClinicalDiagnosis &&
        this.item.Pathology.PreviousResults
    },
    is004 () {
      // SiteOfSpecimen, StoreSpecimenWithSolution, ClinicalHistoryAndLabTests, Treatment, GrosDescription, PreviousResults,Diagnosis
      return this.item.Pathology.SiteOfSpecimen &&
        this.item.Pathology.CollectionTime &&
        this.item.Pathology.TimeOfStore &&
        this.item.Pathology.StoreSpecimenWithSolution &&
        this.item.Pathology.ClinicalHistoryAndLabTests &&
        this.item.Pathology.Treatment &&
        this.item.Pathology.GrosDescription &&
        this.item.Pathology.ClinicalDiagnosis &&
        this.item.Pathology.PreviousResults
    },
    is003 () {
      // LatestMenstrualPeriod, StoreSpecimenWithSolution, CervicalCytologyTestHistoryAndTreatmentBefore, Diagnosis
      // TheLastDayOfLatestMenstrualPeriod, SurgeryMethod, SiteOfSpecimen
      return this.item.Pathology.LatestMenstrualPeriod &&
        this.item.Pathology.CollectionTime &&
        this.item.Pathology.TimeOfStore &&
        this.item.Pathology.StoreSpecimenWithSolution &&
        this.item.Pathology.CervicalCytologyTestHistoryAndTreatmentBefore &&
        this.item.Pathology.ClinicalDiagnosis
    },
    is002 () {
      // SiteOfSpecimen, StoreSpecimenWithSolution, ClinicalHistoryAndLabTests, Treatment, GrosDescription, PreviousResults, Diagnosis
      // SurgeryMethod, SpecimenOrientation
      return this.item.Pathology.SiteOfSpecimen &&
        this.item.Pathology.CollectionTime &&
        this.item.Pathology.TimeOfStore &&
        this.item.Pathology.StoreSpecimenWithSolution &&
        this.item.Pathology.ClinicalHistoryAndLabTests &&
        this.item.Pathology.Treatment &&
        this.item.Pathology.GrosDescription &&
        this.item.Pathology.PreviousResults &&
        this.item.Pathology.ClinicalDiagnosis
    },
    close () {
      if (this.edited) {
        this.$modal.show('dialog', {
          clickToClose: false,
          title: this.__t('Thông báo'),
          text: this.__t('Bạn có chắc chắn hủy các thông tin đã nhập?'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Tôi xác nhận'),
              class: 'btn btn-warning',
              handler: () => {
                this.emit()
                this.$modal.hide('dialog')
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
      } else {
        this.emit()
      }
    },
    emit () {
      if (!this.readonly) {
        if (!this.item.IsOk) {
          this.remove({Id: this.item.Id, type: this.item.type})
        } else {
          this.update({form: this.rawObj, type: this.rawObj.type})
        }
      }
      this.$modal.hide('PathologyPopup')
    },
    ok () {
      this.item.IsOk = true
      this.update({form: this.item, type: this.item.type})
      this.$modal.hide('PathologyPopup')
      this.showGuild = false
    },
    open (item) {
      var newItem = this.cloneObj(item)
      if (this.getServiceType(newItem) === 1) {
        this.isFirst = true
        this.edited = false
        if (!newItem.Pathology) {
          var item005 = localStorage.getItem('AUTO_FOCUS_PXN_005')
          var item002 = localStorage.getItem('AUTO_FOCUS_PXN_002')
          var item003 = localStorage.getItem('AUTO_FOCUS_PXN_003')
          var item004 = localStorage.getItem('AUTO_FOCUS_PXN_004')
          var item006 = localStorage.getItem('AUTO_FOCUS_PXN_006')
          var mapData = {
            '002': (item002 ? item002.split(',') : []).includes(newItem.Code),
            '003': (item003 ? item003.split(',') : []).includes(newItem.Code),
            '004': (item004 ? item004.split(',') : []).includes(newItem.Code),
            '005': (item005 ? item005.split(',') : []).includes(newItem.Code),
            '006': (item006 ? item006.split(',') : []).includes(newItem.Code)
          }
          console.log(mapData)
          var PathologyType = '001'
          for (var key of Object.keys(mapData)) {
            if (mapData[key]) PathologyType = key
          }
          this.$set(newItem, 'Pathology', {
            PathologyType: PathologyType,
            ClinicalDiagnosis: null,
            ClinicalHistoryAndLabTests: null,
            CollectionTime: null,
            GrosDescription: null,
            PreviousResults: null,
            SiteOfSpecimen: null,
            SpecimenOrientation: null,
            StoreSpecimenWithSolution: null,
            SurgeryMethod: null,
            TimeOfStore: null,
            Treatment: null
          })
        }
        this.rawObj = this.cloneObj(newItem)
        this.item = newItem
        this.$modal.show('PathologyPopup')
      }
    }
  }
}
</script>
