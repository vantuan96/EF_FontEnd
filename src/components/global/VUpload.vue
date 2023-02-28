<template>
  <div class="v-tab mrb10" :id="code" v-if="!print && (dataImg || dataFile)">
    <ul class="nav nav-tabs" role="tablist" v-if="!hidelabelLi">
      <li role="presentation" :class="{'active': !tab || tab === 'tab' + index[0]}"><a :href="'#tab' +  + index[0]" @click="tab = 'tab' + index[0]" role="tab" data-toggle="tab" v-if="dataFile">{{__label(dataFile)}}</a></li>
      <li role="presentation" :class="{'active': tab === 'tab' + index[1]}"><a href="#tab2" @click="tab = 'tab' + index[1]" role="tab" data-toggle="tab" v-if="dataImg">{{__label(dataImg)}}</a></li>
    </ul>
    <div class="tab-content">
      <div v-if="dataFile" role="tabpanel" class="tab-pane min-height-none" :id="'tab' + index[0]" :class="{'active': !tab || tab === 'tab' + index[0]}">
        <div class="pomc-upload-area mb-10">
          <div class="row" v-if="readonly">
            <div class="col-md-12 col-sm-12">
              <drop-files id="mini-upload" :readonly="true" v-model="dataFile.Value" :dataDropfile="dataDropfile"/>
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
      <div v-if="dataImg" role="tabpanel" :id="'tab' + index[1]" class="tab-pane min-height-none" :class="{'active': tab === 'tab' + index[1]}">
        <div class="text-center pomc-upload-area">
          <div class="EDARRPAMAPALO-BG">
            <img :src="bgImg ? bgImg : 'static/tivi-bg.png'" style="opacity: 0.4;width: 950px;" :style="widthImg ? `width: ${widthImg}` : ''" />
            <div class="paint-content">
              <Painting :readonly="readonly" v-model="dataImg.Value" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex" style="min-height: 269px;" :id="`print` + code" v-else-if="dataImg || dataFile">
    <div style="width: 50%;">
      <div class="text-center" style="width: 100%;display: inline-block;overflow: hidden;position: relative;">
        <img :src="bgImg ? bgImg :'static/tivi-bg.png'" style="width: 100%;opacity: 0;" />
        <div class="text-center pomc-upload-area" style="border: none!important;position: absolute;padding: 0;transform: scale(0.3) translate(-100%, -100%);top: 0px;left:0px;" v-if="PaintingData && PaintingData.length > 0">
          <div class="EDARRPAMAPALO-BG" style="border: none!important;">
            <img :src="bgImg ? bgImg :'static/tivi-bg.png'" style="width: auto;opacity: 0;max-width: unset;" />
            <div class="paint-content">
              <Painting
                :readonly="true"
                v-if="PaintingData !== null"
                v-model="PaintingData"/>
            </div>
          </div>
        </div>
        <div v-else style="height: 300px;"></div>
        </div>
    </div>
    <div style="width: 50%">
      <div style="text-align: center;" class="listImages text-center" v-if="ListImages && ListImages.length > 0">
        <div style="text-align: center; margin: 10px auto;" class="text-center" :key="index" v-for="(item, index) in ListImages">
          <img style="text-align: center; margin: 10px auto;" class="text-center" :src="item" width="100%" height="auto">
        </div>
      </div>
      <div v-else style="height: 300px;"></div>
    </div>
  </div>
</template>

<script>
import DropFiles from '@/components/DropFiles.vue'
import Painting from '@/components/Painting.vue'
import $ from 'jquery'
export default {
  name: 'VUpload',
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
    'hidelabelLi',
    'dataDropfile'
  ],
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
  watch: {
  },
  mounted () {
    console.log('file', this.dataDropfile, this.dataFile)
    this.tab = 'tab' + this.index[0]
    this.mapDataImg()
  },
  methods: {
    openFile () {
      $('#' + this.code + ' #dropzone').click()
    },
    mapDataImg () {
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
          this.ListImages.push(path)
        })
      }
      if (this.dataImg) {
        if (this.dataImg.Value) {
          this.PaintingData = this.dataImg.Value
        }
      }
    },
    getId () {
      let id = ''
      if (this.dataImg && this.dataImg.Code) {
        id = this.dataImg.Code
      }
      if (this.dataFile && this.dataFile.Code) {
        id = this.dataFile.Code
      }
      return id
    }
  },
  computed: {
    tabActive () {
      return this.tab || 'tab1'
    }
  }
}
</script>
