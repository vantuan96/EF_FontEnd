 <template>
  <div class="v-drop-box">
    <div v-if="readonly">
      <div class="row">
        <div :key="index" v-for="(image, index) in images" class="col-md-3 col-sm-3">
          <img class="click-enable" @click="clickThumb({url: convertFileUrl(image)})" :src="convertFileUrl(image)" style="max-width: 100%;" />
        </div>
      </div>
    </div>
    <div v-else>
    <vue-dropzone
      ref="vVueDropzone"
      id="dropzone-new"
      :options="dropzoneOptions"
      v-on:vdropzone-success="success"
      v-on:vdropzone-removed-file="removed"
      v-on:vdropzone-file-added-manually="manually"
      v-on:vdropzone-file-added="attachListener"
      v-on:vdropzone-sending="sendingEvent"
      />
    </div>
    <!-- <div class="image-viewer" v-if="selected">
      <div class="image-viewer-content">
        <img :src="selected.url" />
        <button class="btn v-close-btn" @click="close()"><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
    </div> -->
  </div>
</template>

<script>
// import _ from 'lodash'
// import utils from '../utils'
import $ from 'jquery'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import EventBus from '@/lib/eventBus'
var urlApi = process.env.API_URL
export default {
  name: 'UpLoadFile',
  props: ['value', 'clickable', 'readonly', 'formid'],
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      fileName: '',
      fileSize: 0,
      files: [],
      dropzoneOptions: {
        destroyDropzone: true,
        clickable: true,
        url: urlApi + 'api/UploadFile/File',
        thumbnailWidth: null,
        thumbnailHeight: null,
        // maxFilesize: 0.5,
        // acceptedFiles: 'image/*',
        addRemoveLinks: true,
        dictRemoveFileConfirmation: this.__t('Bạn có chắc không? Bạn muốn xóa hình ảnh này?'),
        dictDefaultMessage: '<i class="full-w fa fa-cloud-upload"></i>' + this.__t('Kéo thả hoặc chọn file để upload'),
        headers: {'RequestVerificationToken': document.getElementsByName('__RequestVerificationToken')[0] ? document.getElementsByName('__RequestVerificationToken')[0].value : null}
      },
      selected: null
    }
  },
  watch: {
    value: function (value) {
      // this.removed()
      console.log('watch', value)
    }
  },
  mounted () {
    this.files = []
    if (this.value) {
      this.value.filter(e => e).map(e => {
        return this.convertFileUrl(e)
      }).forEach(file => {
        if (file) {
          this.add(file)
        }
      })
    }
  },
  computed: {
    images: function () {
      return Array.isArray(this.value) ? this.value : []
    }
  },
  methods: {
    convertFileUrl (url) {
      var arr = [
        'png', 'jpg', 'jpeg',
        'PNG', 'JPG', 'JPEG', 'text', 'TEXT', 'pdf', 'PDF'
      ]
      arr.forEach(ext => {
        url = url.replace(`.${ext}`, `/${ext}`)
      })
      return url
    },
    failed (file, message, xhr) {
      const fileTypeSupport = [
        'png', 'jpg', 'jpeg',
        'PNG', 'JPG', 'JPEG', 'pdf', 'PDF'
      ]
      const fileType = file.type.split('/')[1]
      let errorMessage = ''
      if (file.size > 5242880) {
        errorMessage = 'Kích thước file quá lớn'
      } else if (!fileTypeSupport.includes(fileType)) {
        errorMessage = 'Không hỗ trợ định dạng file'
      } else {
        errorMessage = 'Có lỗi xảy ra'
      }
      if (xhr && xhr.status === 401) {
        EventBus.$emit('401Event', 'thangdc in here')
      }
      if (xhr && xhr.status === 403) {
        EventBus.$emit('403Event', message.ViMessage || 'Có lỗi xảy ra')
      }
      $(file.previewElement).find('.dz-error-message span').text(errorMessage || 'Có lỗi xảy ra')
      this.$toasted.error(errorMessage, {
        duration: 3000,
        position: 'bottom-right'
      })
    },
    add (url) {
      var file = { size: 123, name: url, type: 'image/png', url: url }
      if (this.$refs.vVueDropzone) this.$refs.vVueDropzone.manuallyAddFile(file, url)
    },
    manually (file) {
      this.files.push(file)
      this.getAcceptedFiles()
    },
    success (file, response) {
      file.url = response[0]
      this.getAcceptedFiles()
    },
    removed (file, error, xhr, formData) {
      this.getAcceptedFiles()
    },
    sendingEvent (file, xhr, formData) {
      this.fileName = file.name
      this.fileSize = file.size
      formData.append('visitId', this._VisitId)
      formData.append('formid', this.formid)
    },
    getAcceptedFiles (file, error, xhr, formData) {
      this.files = []
      var files = this.$refs.vVueDropzone.dropzone.files
      files.forEach(file => {
        this.files.push(this.convertFileUrl(file.url))
      })
      var arr = []
      console.log('this.$refs.vVueDropzone.dropzone', this.$refs.vVueDropzone.dropzone)
      for (let i = 0; i < this.$refs.vVueDropzone.dropzone.files.length; i++) {
        const item = {
          url: this.$refs.vVueDropzone.dropzone.files[i].url,
          name: this.$refs.vVueDropzone.dropzone.files[i].name.substring(0, 50),
          size: (parseInt(this.$refs.vVueDropzone.dropzone.files[i].size) / 1024).toFixed(2)
        }
        arr.push(item)
      }
      console.log('arr', arr)
      this.$emit('emitData', arr)
      this.$emit('input', (this.files || []).filter(e => e))
    },
    attachListener (file) {
      file.previewElement.addEventListener('click', () => {
        this.clickThumb(file)
      })
    },
    clickThumb (file) {
      if (file.url) {
        this.selected = file
      }
    },
    close () {
      this.selected = null
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
