<template>
  <div :class="MDCODE || 'IPDMRPT10002'" v-if="MASTERDATA && MASTERDATA[MDCODE || 'IPDMRPT10002']" :id="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].Code">
    <div v-if="isPrint">
      <template>
      <div v-if="onlyImage">
        <template v-if="ListImages && ListImages.length > 0">
          {{MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].ViName}}<i v-if="t3">{{__t3(MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].ViName)}}</i>:
          <div style="text-align: center;" class="listImages text-center">
            <div style="text-align: center; margin: 10px auto;" class="text-center" :key="index" v-for="(item, index) in ListImages">
              <img style="text-align: center; margin: 10px auto;" class="text-center" :src="item" width="100%" height="auto">
            </div>
          </div>
        </template>
      </div>
      <div style="" v-else>
        {{MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].ViName}}<i v-if="t3">{{__t3(MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].ViName)}}</i>:
        <div :style="setheight ? 'height: 300px;' : ''">
          <div class="text-center" style="width: 100%;display: inline-block;overflow: hidden;position: relative;" v-if="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[1]].Value && !isPainDataNull(MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[1]].Value, (MASTERDATA[MDCODE || 'IPDMRPT10002']))">
            <img src="static/tivi-bg.png" style="width: 100%;opacity: 0;" />
            <div class="text-center pomc-upload-area" style="border: none!important;position: absolute;padding: 0;transform: scale(0.5) translate(-30%, -40%);top: 0px;left:0px;" v-if="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[1]].Value">
              <div class="EDARRPAMAPALO-BG" style="border: none!important;">
                <img src="static/tivi-bg.png" style="width: auto;opacity: 0;max-width: unset;" />
                <div class="paint-content">
                  <Painting
                    :readonly="true"
                    v-if="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[1]].Value"
                    v-model="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[1]].Value"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div style="width: 50%">
          <div style="text-align: center;" class="listImages text-center" v-if="ListImages && ListImages.length > 0">
            <div style="text-align: center; margin: 10px auto;" class="text-center" :key="index" v-for="(item, index) in ListImages">
              <img style="text-align: center; margin: 10px auto;" class="text-center" :src="item" width="100%" height="auto">
            </div>
          </div>
          <div v-else style="height: 300px;"></div>
        </div> -->
      </div>
      </template>
    </div>
    <div v-else>
      <p><b>{{__label(MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]])}}:</b></p>
      <div class="v-tab mrb10">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="{'active': !tab || tab === 'tab' + index[0]}"><a :href="'#tab' +  + index[0]" @click="tab = 'tab' + index[0]" role="tab" data-toggle="tab">{{__t('Upload từ thiết bị')}}</a></li>
          <li role="presentation" :class="{'active': tab === 'tab' + index[1]}"><a href="#tab2" @click="tab = 'tab' + index[1]" role="tab" data-toggle="tab">{{__t('Hoặc vẽ mô tả tổn thương')}}</a></li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane min-height-none" :id="'tab' + index[0]" :class="{'active': !tab || tab === 'tab' + index[0]}">
            <div class="pomc-upload-area mb-10">
              <div class="row" v-if="readonly">
                <div class="col-md-12 col-sm-12">
                  <drop-files id="mini-upload" :readonly="true" v-model="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].Value"/>
                </div>
              </div>
              <div class="row" v-else>
                <div class="col-md-7 col-sm-7">
                  <p><b>{{__t('Upload ảnh')}}:</b></p>
                  <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
                  <p>{{__t('Bác sĩ tải hình ảnh mô tả tổn thương khi vào viện tại đây (cho phép tải 1 hoặc nhiều hình ảnh).')}}</p>
                </div>
                <div class="col-md-5 col-sm-5">
                  <drop-files id="mini-upload" v-if="dataDropfile" v-model="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[0]].Value" :dataDropfile="dataDropfile"/>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane min-height-none" :id="'tab' + index[1]" :class="{'active': tab === 'tab' + index[1]}">
            <div class="text-center pomc-upload-area">
              <div class="EDARRPAMAPALO-BG">
                <img src="static/tivi-bg.png" style="width: 950px;opacity: 0.4;" />
                <div class="paint-content">
                  <Painting :readonly="readonly" v-model="MASTERDATA[MDCODE || 'IPDMRPT10002'].Items[index[1]].Value" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import Painting from '@/components/Painting.vue'
import DropFiles from '@/components/DropFiles.vue'
import $ from 'jquery'
export default {
  name: 'IPDMRPT10002',
  props: ['MASTERDATA', 'readonly', 'DataSubmit', 'index', 'isPrint', 'MDCODE', 'onlyImage', 't3', 'setheight'],
  components: {
    Painting,
    DropFiles
  },
  data () {
    return {
      tab: 'tab0',
      ListImages: [],
      dataDropfile: {}
    }
  },
  mounted () {
    this.tab = 'tab' + this.index[0]
    this.dataDropfile = {
      ...this.dataDropfile,
      contentImg: '',
      titleImg: '',
      visittypeImg: this._VisitType,
      visitidImg: this._VisitId,
      formidImg: this.DataSubmit.Id || this.DataSubmit.ID
    }
    console.log('rhm', this.dataDropfile)
    this.mapDataImage()
  },
  methods: {
    openFile () {
      $('#' + this.MASTERDATA[this.MDCODE || 'IPDMRPT10002'].Items[this.index[0]].Code + ' #dropzone').click()
    },
    changeData () {
    },
    mapDataImage () {
      let stringImagesData = this.MASTERDATA[this.MDCODE || 'IPDMRPT10002'].Items[this.index[0]].Value
      if (stringImagesData !== '' && stringImagesData !== undefined) {
        let imagePaths = this.JSONParse(stringImagesData) || []
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
    }
  }
}
</script>
