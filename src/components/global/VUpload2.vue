<template>
  <div class="v-tab mrb10" :id="code" v-if="!print && (dataImg || dataFile)">
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" :class="{'active': tab === 'tab' + index[0]}"><a href="#tab2" @click="tab = 'tab' + index[0]" role="tab" data-toggle="tab" v-if="dataImg">{{__t('Hình vẽ')}}</a></li>
      <li role="presentation" :class="{'active': !tab || tab === 'tab' + index[1]}"><a :href="'#tab' +  + index[1]" @click="tab = 'tab' + index[1]" role="tab" data-toggle="tab" v-if="dataFile">{{__t('Upload từ thiết bị')}}</a></li>
    </ul>
    <div class="tab-content">
      <div v-if="dataImg" role="tabpanel" :id="'tab' + index[0]" class="tab-pane min-height-none" :class="{'active': tab === 'tab' + index[0]}">
        <div class="text-center pomc-upload-area">
          <div class="EDARRPAMAPALO-BG">
            <img :src="bgImg ? bgImg : 'static/tivi-bg.png'" style="opacity: 0.9;width: 950px;" :style="widthImg ? `width: ${widthImg}` : ''" />
            <div class="paint-content">
              <Painting :readonly="readonly" v-model="dataImg.Value" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="dataFile" role="tabpanel" class="tab-pane min-height-none" :id="'tab' + index[1]" :class="{'active': !tab || tab === 'tab' + index[1]}">
        <div class="pomc-upload-area mb-10">
          <div class="row" v-if="readonly">
            <div class="col-md-12 col-sm-12">
              <drop-files id="mini-upload" :readonly="true" v-model="dataFile.Value"/>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-md-7 col-sm-7">
              <p><b>{{__t('Upload ảnh')}}:</b></p>
              <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
              <p>{{planUpdate ? planUpdate : __t('Bác sĩ tải hình ảnh mô tả thủ thuật tại đây (cho phép tải 1 hoặc nhiều hình ảnh).')}}</p>
            </div>
            <div class="col-md-5 col-sm-5">
              <drop-files id="mini-upload" v-model="dataFile.Value" :dataDropfile="dataDropfile"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :id="`print` + code" v-else-if="dataImg || dataFile">
    <div style="width: 100%;" v-if="dataImg">
      <div class="text-center" style="width: 100%;display: inline-block;overflow: hidden;position: relative;">
        <template v-if="PaintingData && PaintingData.length > 0">
          <img :src="bgImg ? bgImg :'static/tivi-bg.png'" style="width: 100%;opacity: 0;" />
          <div class="text-center pomc-upload-area" style="border: none!important;position: absolute;padding: 0;transform: scale(0.7) translate(-16%, -13%);top: 0px;left:0px;">
            <div class="EDARRPAMAPALO-BG" style="border: none!important;">
              <img :src="bgImg ? bgImg :'static/tivi-bg.png'" style="width: 400px;opacity: 0.9;max-width: unset;" />
              <div class="paint-content">
                <Painting
                  :readonly="true"
                  v-if="PaintingData !== null"
                  v-model="PaintingData"/>
              </div>
            </div>
          </div>
        </template>
        <div v-else>
          <img :src="bgImg ? bgImg :'static/tivi-bg.png'" style="width: 100%;opacity: 0.9;" />
        </div>
        </div>
    </div>
    <div style="width: 100%" v-if="dataFile">
      <div style="text-align: center;" class="listImages text-center" v-if="ListImages && ListImages.length > 0">
        <div style="text-align: center; margin: 10px auto;" class="text-center" :key="index" v-for="(item, index) in ListImages">
          <img style="text-align: center; margin: 10px auto;" class="text-center" :src="item" width="100%" height="auto">
        </div>
      </div>
      <div v-else style="height: 280px;"></div>
    </div>
  </div>
</template>

<script>
import DropFiles from '@/components/DropFiles.vue'
import Painting from '@/components/Painting.vue'
import $ from 'jquery'
export default {
  name: 'VUpload2',
  props: [
    'dataImg',
    'dataFile',
    'bgImg',
    'readonly',
    'widthImg',
    'print',
    'planUpdate',
    'code',
    'index',
    'dataDropfile'
  ],
  watch: {
    dataFile: {
      handler () {
        this.mapDataImg()
      },
      deep: true
    }
  },
  components: {
    DropFiles,
    Painting
  },
  data () {
    return {
      PaintingData: [],
      ListImages: [],
      tab: 'tab0'
    }
  },
  mounted () {
    this.tab = 'tab' + this.index[0]
    this.mapDataImg()
  },
  methods: {
    openFile () {
      $('#' + this.code + ' #dropzone').click()
    },
    mapDataImg () {
      if (this.dataFile) {
        let stringImagesData = this.dataFile.Value
        if (stringImagesData !== '' && stringImagesData !== undefined) {
          let imagePaths = this.JSONParse(this.dataFile.Value || [], true)
          let listImagePaths = [...imagePaths]
          listImagePaths.forEach(element => {
            let path = `${element}`
            if (path.includes('.jpg')) {
              path = path.replace('.jpg', '/jpg')
            }
            if (path.includes('.png')) {
              path = path.replace('.png', '/png')
            }
            if (path.includes('.jpeg')) {
              path = path.replace('.jpeg', '/jpeg')
            }
            if (path.includes('.jpeg')) {
              path = path.replace('.jpeg', '/jpeg')
            }
            console.log('path', path)
            this.ListImages.push(path)
            console.log('ListImages', this.ListImages)
          })
        }
        this.$emit('checkHasFile', this.ListImages)
      }
      if (this.dataImg) {
        if (this.dataImg.Value) {
          this.PaintingData = this.dataImg.Value
        }
      }
    }
  },
  computed: {
    tabActive () {
      return this.tab || 'tab1'
    }
  }
}
</script>

<style lang="stylus" scoped>
  #mini-upload {
    min-width: 218px!important;
  }
</style>
