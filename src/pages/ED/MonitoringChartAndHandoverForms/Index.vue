<template>
  <div class="main-content" id="mca-page" v-if="DataSubmit">
    <!-- <ed :EdId="this.$route.params.Id"/> -->
    <!-- <div v-if="viewOnly">
      <div v-for="(img, index) in DataSubmit.Datas" :key="index" class="text-center">
        <img style="max-width: 100%" :src="img" />
      </div>
    </div>
    <template v-else>
      <drop-files :clickable="true" v-if="DataSubmit.Datas" v-model="DataSubmit.Datas"/>
    </template> -->
    <div class="pomc-upload-area" v-if="loaded">
      <div class="row" v-if="viewOnly">
        <div class="col-md-12 col-sm-12">
          <drop-files id="mini-upload" :readonly="true" v-if="DataSubmit.Datas" v-model="DataSubmit.Datas"/>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-7 col-sm-7">
          <p><b>{{__t('Upload ảnh')}}:</b></p>
          <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
          <p>{{__t('Bác sĩ/ điều dưỡng tải hình ảnh bàn giao vận chuyển tại đây (cho phép tải 1 hoặc nhiều hình ảnh).')}}</p>
        </div>
        <div class="col-md-5 col-sm-5">
          <drop-files id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Datas" :dataDropfile="dataDropfile"/>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <hr/>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label>{{__t('Ghi chú')}}</label>
          <textarea-autosize :readonly="viewOnly" class="form-control" v-model="DataSubmit.Note" :minHeight="180"/>
        </div>
      </div>
    </div>
    <div class="text-center div-block" v-if="!viewOnly">
      <button class="btn v-yellow-btn pull-right long-btn" type="button" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
      <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
    </div>
    <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="'MonitoringChartAndHandoverForm'" />
  </div>
  <div v-else>
    <h2 class="text-center cap mrb30 fw600">{{__t('general.ban_giao_van_chuyen')}}</h2>
    <div class="text-center">{{__t('Không có thông tin!')}}</div>
  </div>
  <!-- <div v-else class="loading-text"><v-loading/></div> -->
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import DropFiles from '@/components/DropFiles.vue'
import MonitoringChartAndHandoverForms from '@/services/ED/MonitoringChartAndHandoverForms'
import $ from 'jquery'
import Logs from '@/components/Logs.vue'
import MixinForm from '@/mixins/form.js'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  /**
   * The name of the page.
   */
  name: 'MonitoringChartAndHandoverForms',
  props: ['viewOnly', 'dataDropfile'],
  data () {
    return {
      DataSubmit: null,
      loaded: false
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
  mixins: [MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    DropFiles,
    Logs
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    openFile () {
      $('#dropzone').click()
    },
    getData () {
      this.loaded = false
      new MonitoringChartAndHandoverForms().find(this.$route.params.Id).then(response => {
        this.DataSubmit = response
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.Id || response.ID
        }
        setTimeout(() => {
          this.loaded = true
        }, 200)
      }).catch(e => {
        if (e.status) {
          this.toastedError(e.data.ViMessage)
          // this.go2Home()
        }
      })
    },
    save () {
      var arr = this.MASTERDATA['PCKPTTT66'].Items[0].Value ? this.MASTERDATA['PCKPTTT66'].Items[0].Value : []
      this.DataSubmit._Exception = []
      Object.keys(this.DataSubmit).forEach(key => {
        if (key !== '_Exception') {
          if (key === 'Datas') {
            var imgs = ''
            this.DataSubmit[key].forEach((img, index) => {
              imgs = imgs + '<img width="200px" src="' + img + '" />'
            })
            this.DataSubmit._Exception.push({
              key: 'Images',
              value: imgs
            })
          }
          if (key === 'Note') {
            this.DataSubmit._Exception.push({
              key: key,
              value: this.DataSubmit[key]
            })
          }
        }
      })
      new MonitoringChartAndHandoverForms().update(this.$route.params.Id, this.DataSubmit).then(response => {
        this.removedFile(arr)
        this.toastedSuccess().getData()
        this.edited = false
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
