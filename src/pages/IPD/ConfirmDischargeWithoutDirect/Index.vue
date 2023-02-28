<template>
  <div class="main-content" v-if="DataSubmit">
    <template>
      <h2 class="text-center">{{ __t("Giấy xác nhận ra viện không theo chỉ định của bác sĩ") }}</h2>
      <h5 class="text-center">({{ __t("Áp dụng cho người bệnh nội trú") }})</h5>
      <div class="text-center" v-if="DataSubmit.DischargeType === ''">
        <b style="color: red">{{__t("Bệnh nhân không thuộc trường hợp ra viện không theo chỉ định !")}}</b>
        <FloatBlock>
          <template slot="buttons">
            <div class="col-md-2 col-sm-2">
              <div class="form-group1"></div>
            </div>
          </template>
        </FloatBlock>
      </div>
      <div v-else class="flex-box" style="justify-content: center">
        <div class="group-radio text-center">
          <span>
            <input
              v-model="WithSign"
              id="confirm"
              type="radio"
              :value="true"
              @click="confirmPopup"
              :disabled="IsLocked"
            />
            <label for="confirm">{{__t("NB/Người giám hộ ký xác nhận")}}</label>
          </span>
          <span>
            <input
              v-model="WithSign"
              id="notconfirm"
              type="radio"
              :value="false"
              @click="confirmPopup"
              :disabled="IsLocked"
            />
            <label for="notconfirm">{{__t("NB/Người giám hộ không ký xác nhận")}}</label>
          </span>
        </div>
      </div>
      <br />
      <div v-if="WithSign === true">
        <div class="flex-box">
          <b style="width: 17%; margin: auto">{{ __t("Chẩn đoán") }}:</b>
          <div style="width: 83%">
            {{ getDiagnosis(DataSubmit.Dianosis) }}
          </div>
        </div>
        <div class="flex-box">
          <b style="width: 20%; margin: auto">{{ __t("Số phòng") }}:</b>
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DataSubmit.Room"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div class="flex-box" style="padding: 10px 0px 10px 0px">
          <b style="width: 17%">{{ __t("Vào lúc") }}:</b>
          <div style="width: 83%" v-if="this.$i18n.locale === 'vi'">
            {{
              DataSubmit.TimeDischarge
                | viDisplayformatDateTimeWithMomentForDischarge
            }}
          </div>
          <div style="width: 83%" v-else>
            {{
              DataSubmit.TimeDischarge
                | enDisplayformatDateTimeWithMomentForDischarge
            }}
          </div>
        </div>
        <p style="padding-top: 10px">
          <b>{{ __t("Người bệnh/Người giám hộ người bệnh") }}</b>
        </p>
        <div class="flex-box">
          <span style="width: 20%; margin: auto">{{
            __t("Họ tên người bệnh/người nhà:")
          }}</span>
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DataSubmit.CustomerName"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div style="padding-top: 5px">
          <p>
            1. {{
              __t(
                "Tôi là người bệnh/người giám hộ, trong tình trạng tinh thần tỉnh táo và bình tĩnh, đã nghe bác sĩ/nhân viên bệnh viện giải thích và đã hiểu về tình trạng bệnh hiện tại của tôi/người nhà của tôi, mục đích, phương pháp điều trị và các rủi ro/ hậu quả có thể xảy ra của việc tự ý ra viện."
              )
            }}
            2. {{
              __t(
                "Tôi xin được ra viện/xin cho người nhà tôi ra viện, và đồng ý rằng bệnh viện không phải chịu bất kì trách nhiệm nào về quyết định này của tôi."
              )
            }}
            3. {{ __t("Lý do ra viện không theo chỉ định của Bác sĩ:") }}
          </p>
        </div>
        <div style="padding-top: 5px">
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DataSubmit.DischargeType"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div style="padding-top: 15px">
          <b>{{ __t("Bác sĩ điều trị/Bác sĩ được ủy quyền") }}</b>
        </div>
        <div>
          <p>
            1. {{
              __t(
                "Tôi xác nhận đã giải thích cho người bệnh/người giám hộ về tình trạng bệnh hiện tại, mục đích điều trị, phương pháp điều trị và các rủi ro/hậu quả có thể xảy ra của việc tự ý xin ra viện."
              )
            }}
            2. {{
              __t(
                "Tôi xác nhận rằng người bệnh/người giám hộ đang trong tình trạng tỉnh táo và bình tĩnh cũng như có đủ năng lực hành vi trong khi ra quyết định xin cho người bệnh ra viện không theo chỉ định của bác sĩ."
              )
            }}
          </p>
        </div>
        <div class="flex-box">
          <span style="width: 17%; margin: auto"
            >{{ __t("Họ và tên bác sĩ") }}:</span
          >
          <div style="width: 83%" v-if="!IsLocked">
            <user-ad
              v-model="DataSubmit.DoctorUserName"
              :field="'Username'"
              ref="userAd"
              @onSelect="onSelectDoctor"
            />
          </div>
          <div v-else style="width: 83%">{{DataSubmit.DoctorFullName}}</div>
        </div>
      </div>
      <div v-else-if="WithSign === false">
        <div class="flex-box">
          <b style="width: 17%; margin: auto">{{ __t("Chẩn đoán") }}:</b>
          <div style="width: 83%">
            {{ getDiagnosis(DataSubmit.Dianosis) }}
          </div>
        </div>
        <div class="flex-box">
          <b style="width: 20%; margin: auto">{{ __t("Số phòng") }}:</b>
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DataSubmit.Room"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div class="flex-box" style="padding: 10px 0px 10px 0px">
          <b style="width: 17%">{{ __t("Vào lúc") }}:</b>
          <div style="padding-left: 0px" v-if="this.$i18n.locale === 'vi'">
            {{ DataSubmit.TimeDischarge | viDisplayformatDateTimeWithMomentForDischarge }}
          </div>
          <div style="padding-left: 0px" v-else>
            {{ DataSubmit.TimeDischarge | enDisplayformatDateTimeWithMomentForDischarge }}
          </div>
        </div>
        <p style="padding-top: 10px">
          <b>{{ __t("Bác sĩ điều trị/Bác sĩ được ủy quyền") }}</b>
        </p>
        <div>
          <p>
            1. {{ __t( "Tôi xác nhận đã giải thích cho người bệnh/người giám hộ về tình trạng bệnh hiện tại, mục đích điều trị, phương pháp điều trị và các rủi ro/hậu quả có thể xảy ra của việc tự ý xin ra viện.")}}
            2. {{ __t( "Tôi xác nhận rằng người bệnh/người giám hộ đang trong tình trạng tỉnh táo và bình tĩnh cũng như có đủ năng lực hành vi trong khi ra quyết định xin cho người bệnh ra viện không theo chỉ định của bác sĩ.")}}
            3. {{ __t( "Tôi xác nhận về việc người bệnh/người giám hộ của người bệnh từ chối ký cam kết công nhận sự việc và chịu mọi trách nhiệm và hậu quả do việc tự ý ra viện gây ra.")}}
          </p>
          <div>
            4. {{ __t("Lý do ra viện không theo chỉ định của Bác sĩ:") }}
            <textarea-autosize
              class="form-control"
              rows="1"
              v-model="DataSubmit.DischargeType"
              :disabled="IsLocked"
            ></textarea-autosize>
          </div>
        </div>
        <div>
          <div class="flex-box" style="margin-top: 15px">
            <span style="width: 17%; margin: auto"
              >{{ __t("Họ và tên bác sĩ") }}:</span
            >
            <div style="width: 83%" v-if="!IsLocked">
              <user-ad
                v-model="DataSubmit.DoctorUserName"
                :field="'Username'"
                ref="userAd"
                @onSelect="onSelectDoctor"
              />
            </div>
            <div v-else style="width: 83%">{{DataSubmit.DoctorFullName}}</div>
          </div>
          <div class="flex-box" style="margin-top: 10px">
            <span style="width: 17%; margin: auto"
              >{{ __t("Họ tên người làm chứng") }}:</span
            >
            <div style="width: 83%">
              <textarea-autosize
                class="form-control"
                rows="1"
                :placeholder="this.$t('Nhập')"
                v-model="DataSubmit.FormData.Witness"
                :disabled="IsLocked"
              ></textarea-autosize>
            </div>
          </div>
        </div>
      </div>
      <div class="pomc-upload-area" style="margin-top: 10px" v-if="WithSign != null">
        <div class="row" v-if="!IsLocked && (DataSubmit.FormData.IsSignToConfirm === true || DataSubmit.FormData.IsSignToConfirm === false || WithSign === true || WithSign === false)">
          <div class="col-md-7 col-sm-7">
            <p>
              <b>{{ __t("Upload ảnh") }}:</b>
            </p>
            <p>
              <button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload" >
                <i class="fa fa-upload" aria-hidden="true"></i> {{ __t("UPLOAD TỪ THIẾT BỊ") }}
              </button>
            </p>
            <p>{{__t("Bác sĩ tải hình ảnh giấy xác nhận ra viện đã ký tại đây (cho phép tải 1 hoặc nhiều hình ảnh).")}}</p>
          </div>
          <div class="col-md-5 col-sm-5">
            <drop-files id="mini-upload" v-model="ListImages" :dataDropfile="dataDropfile"/>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-12 col-sm-12">
            <drop-files id="mini-upload" :readonly="true" v-model="ListImages" />
          </div>
        </div>
      </div>
    </template>
    <div id="printMe" v-show="false" v-if="DataSubmit">
      <Printer :DetailData="DataSubmit" :WithSign="WithSign" />
    </div>
    <div v-if="DataSubmit.DischargeType !== ''">
      <FloatBlock>
        <template slot="buttons">
          <div class="col-md-2 col-sm-2">
            <div class="form-group1"></div>
          </div>
          <div class="col-md-4 col-sm-4" v-if="DataSubmit.FormData.IsSignToConfirm === true || DataSubmit.FormData.IsSignToConfirm === false || WithSign === true || WithSign === false" >
            <div class="form-group1">
              <button
                class="btn btn-info pull-right"
                type="button"
                @click="print()"
                v-shortkey="['ctrl', 'p']"
                @shortkey="print()"
              >
                <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In") }}
              </button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="DataSubmit.FormData.IsSignToConfirm === true || DataSubmit.FormData.IsSignToConfirm === false || WithSign === true || WithSign === false">
            <div class="form-group1" v-if="this.isDoctor() && IsLocked === false">
              <button
                class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                type="button"
                v-shortkey="['ctrl', 's']"
                @shortkey="save()"
                @click="save()"
              >
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                {{ __t("btn.luu") }}
              </button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </div>
    <div style="margin-top: 15px">A01_149_050919_VE</div>
  </div>
  <div v-else class="text-center"><v-loading /></div>
</template>
<script>
import ConfirmDischargeWithoutDirect from '@/services/IPD/ConfirmDischargeWithoutDirect'
import DropFiles from '@/components/DropFiles.vue'
import Printer from './Print'
import MixinForm from '@/mixins/form.js'
import $ from 'jquery'
import UploadFileService from '@/services/IPD/UploadFileService'

export default {
  name: 'ConfirmDischargeWithoutDirectIndex',
  mixins: [MixinForm],
  props: ['VisitId', 'VisitType', 'viewOnly'],
  data () {
    return {
      dataDropfile: {},
      DataSubmit: null,
      IsLocked: true,
      WithSign: null,
      ListImages: []
    }
  },
  components: {
    DropFiles,
    Printer
  },
  watch: {
  },
  mounted () {
    this.getData()
  },
  methods: {
    print () {
      this.save()
      this.$htmlToPaperWithFooter('printMe', '', 'A01_149_050919_VE')
    },
    removedFile (arr) {
      if (this.DataSubmit.FormData.Id) {
        console.log('bình thường')
        new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.FormData.Id, {Urls: arr.toString()}).then(response => {
        }).catch()
      } else {
        let params = {
          Urls: arr.toString(),
          VisitId: this._VisitId
        }
        new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/5e3006e2-2276-4953-8825-d8efd0840588', params).then(response => {
        }).catch()
      }
    },
    getData () {
      new ConfirmDischargeWithoutDirect()
        .find(this.$route.params.Id)
        .then(response => {
          if (!response.FormData) {
            response.FormData = {}
          }
          this.DataSubmit = response
          this.WithSign = this.DataSubmit.FormData.IsSignToConfirm
          this.IsLocked = response.IsLocked
          if (response.IsLocked) {
            this.viewOnly = true
          }

          if (this.isNurse()) {
            this.IsLocked = true
          }
          if (this.DataSubmit.FormData.ImageUrl != null) {
            this.ListImages = this.DataSubmit.FormData.ImageUrl.split(',')
          }
          if (this.DataSubmit.FormData.Id) {
            this.dataDropfile = {
              ...this.dataDropfile,
              contentImg: '',
              titleImg: '',
              visittypeImg: this._VisitType,
              visitidImg: this._VisitId,
              formidImg: this.DataSubmit.FormData.Id
            }
          } else {
            this.dataDropfile = {
              ...this.dataDropfile,
              contentImg: '',
              titleImg: '',
              visittypeImg: this._VisitType,
              visitidImg: this._VisitId,
              formidImg: '5e3006e2-2276-4953-8825-d8efd0840588'
            }
          }
        })
    },
    save () {
      if (this.isDoctor()) {
        if (this.DataSubmit.FormData.IsSignToConfirm === null || this.DataSubmit.FormData.IsSignToConfirm === undefined) {
          this.DataSubmit.FormData.IsSignToConfirm = this.WithSign
        }
        if (this.ListImages.length > 0) {
          let stringImagePaths = this.ListImages.join(',')
          this.DataSubmit.FormData.ImageUrl = stringImagePaths
        } else if (this.ListImages.length === 0) {
          this.DataSubmit.FormData.ImageUrl = ''
        }
        var arr = this.ListImages.length > 0 ? this.ListImages : []
        new ConfirmDischargeWithoutDirect()
          .update('/Update/' + this.$route.params.Id, this.DataSubmit)
          .then(response => {
            this.removedFile(arr)
            if (response.ViMessage === 'Thành công') {
              this.toastedSuccess()
            }
          })
      }
    },
    onSelectDoctor (doctor) {
      if (doctor.Fullname) {
        if (doctor.Fullname.toString().indexOf('(') > 0) {
          this.DataSubmit.DoctorFullName = doctor.Fullname.substr(0, doctor.Fullname.indexOf('('))
        } else {
          this.DataSubmit.DoctorFullName = doctor.Fullname
        }
      }
    },
    confirmPopup () {
      if (
        this.WithSign === true ||
        this.WithSign === false
      ) {
        this.$modal.show('dialog', {
          clickToClose: false,
          title: this.$t('Thông báo'),
          text:
            this.$t('Bạn có chắc chắn thực hiện thao tác này?') +
            '<br>' +
            '<b style="color: red;">' +
            this.$t('Lưu ý: Toàn bộ thông tin sẽ bị xóa!') +
            '</b>',
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.$t('Tôi xác nhận'),
              class: 'btn btn-warning',
              handler: () => {
                this.$modal.hide('dialog')
                if (this.DataSubmit.FormData.IsSignToConfirm === true) {
                  if (this.WithSign === false) {
                    this.DataSubmit.FormData.IsSignToConfirm = false
                  }
                } else if (this.DataSubmit.FormData.IsSignToConfirm === false) {
                  if (this.WithSign === true) {
                    this.WithSign = true
                    this.DataSubmit.FormData.IsSignToConfirm = true
                  }
                } else {
                  this.DataSubmit.FormData.IsSignToConfirm = this.WithSign
                }
              }
            },
            {
              title: this.$t('Bỏ qua'),
              class: 'btn',
              handler: () => {
                this.$modal.hide('dialog')
                if (this.DataSubmit.FormData.IsSignToConfirm === true) {
                  if (this.WithSign === false) {
                    this.WithSign = true
                  }
                } else if (this.DataSubmit.FormData.IsSignToConfirm === false) {
                  if (this.WithSign === true) {
                    this.WithSign = false
                  }
                } else {
                  this.DataSubmit.FormData.IsSignToConfirm = this.WithSign
                }
              }
            }
          ]
        })
      } else {
        this.DataSubmit.FormData.IsSignToConfirm = this.WithSign
      }
    },
    openFile () {
      $('#dropzone').click()
    }
  }
}
</script>
