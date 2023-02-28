<template>
  <div class="tbl-with-master-data" v-if="loaded && !noneForm">
    <table class="standing-order-tbl" style="width: 100%">
      <tr v-if="MASTERDATA['PRFOURE105']">
        <!-- Luot kham -->
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[0])}}</th>
        <!-- Ngay kham -->
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[1])}}</th>
        <!-- Nguoi thuc hien -->
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[2])}}</th>
        <!-- Tuoi thai -->
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[3])}}</th>
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[4])}}</th>
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[5])}}</th>
        <!-- Protein nieu -->
        <th class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[6])}}</th>
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[7])}}</th>
        <th rowspan="2" class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[8])}}</th>
      </tr>
      <tr v-if="MASTERDATA['PRFOURE105']">
        <th class="text-center">{{__label(MASTERDATA['PRFOURE105'].Items[6].Items[0])}}</th>
      </tr>
      <template v-if="data">
        <template v-for="(item, index) in data.Forms">
          <TblPregnancyCheckupProcessItem
            :dontGetDate="dontGetDate"
            :checkUserEdit="checkUserEdit"
            :indexs="indexs"
            :ontop="ontop"
            :formatTime="formatTime"
            :readonly="readonly"
            :key="index"
            :indexRow="index"
            :MASTERDATA="mddata"
            v-model="item.Datas"
            v-if="!item.IsDeleted"
            @input="checkTableChanged"
            @onDelete="onDelete(index)"/>
        </template>
        <tr v-if="data.Forms && !data.Forms.length">
          <td colspan="9999" class="text-center">
            {{__t('Không có dữ liệu')}}
          </td>
        </tr>
        <tr v-if="!readonly" class="text-center">
          <td colspan="9999" class="text-center">
            <button v-if="hasRole('APIUDOPDA01_067_050919_VE')" class="btn v-green-btn v-bottom-btn" @click="add">
              <i aria-hidden="true" class="fa fa-plus"></i> {{ __t('Thêm mới') }}
            </button>
          </td>
        </tr>
      </template>
      <tbody v-else>
        <tr>
          <td colspan="9999" class="text-center"><v-loading/></td>
        </tr>
      </tbody>
    </table>
    <pre hidden>
      {{data}}
    </pre>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import FormData from '@/services/FormData'
import TblPregnancyCheckupProcessItem from '@/components/OPD/PregnancyFollowUpRecord/TblPregnancyCheckupProcessItem.vue'
import NProgress from 'nprogress'
import moment from 'moment'

export default {
  name: 'TblPregnancyCheckupProcess',
  props: [
    'FormID',
    'FormCode',
    'readonly',
    'headerStyle',
    'top',
    'VisitId',
    'VisitType',
    'print',
    'AutoIncrease',
    'checkShow',
    'formatTime',
    'thead',
    'ontop',
    'textBtnAdd',
    'indexs',
    'checkUserEdit',
    'centerHeader',
    'dontGetDate',
    'isNew',
    'hidethead',
    'MASTERDATA'
  ],
  mixins: [MixinMasterData],
  data () {
    return {
      loaded: false,
      data: [],
      mddata: {},
      noneForm: false,
      autoIncrease: false,
      DataFormUserCreate: [],
      submitSuccess: false
    }
  },
  components: {
    TblPregnancyCheckupProcessItem
  },
  created () {
  },
  mounted () {
    this.getRawMasterDatas({ Form: 'A01_067_050919_VE' }, (md) => {
      md.map(item => {
        if (item.Code === 'PRFOURE105') {
          item.Items.map(e => Object.assign(e, {VisitId: ''}))
          this.$set(this.mddata, 'Items', item.Items)
        }
      })
      this.getData()
    })
  },
  methods: {
    async submit () {
      NProgress.start()
      if (this.checkUserEdit && !this.isNew) {
        this.withAuther()
      } else {
        if (this.isNew) {
          await this.mapDataTable2()
        }
        this.loaded = false
        await new FormData()
          .update('/' + this.VisitType + '/' + this.FormCode + '/' + this.VisitId + '?hidemsg=' + true, {
            VisitId: this.VisitId,
            FormId: this.FormID,
            FormCode: this.FormCode,
            Forms: this.data.Forms
          })
          .then(async (response) => {
            if (response.ViMessage) {
              this.submitSuccess = true
              this.loaded = true
              this.reload()
            }
          })
          .catch((e) => {
            this.loaded = true
          })
      }
    },
    async withAuther () {
      this.DataFormUserCreate = []
      this.data.Forms.forEach(e => {
        if (e.Datas && e.Datas.find(elm => elm.Value === this.$store.state.account.Username)) {
          this.DataFormUserCreate.push(e)
        }
      })
      this.loaded = false
      await new FormData().update('/' + this.VisitType + '/' + this.FormCode + '/' + this.VisitId + '?hidemsg=' + true, {
        VisitId: this.VisitId,
        FormId: this.FormID,
        FormCode: this.FormCode,
        Forms: this.DataFormUserCreate
      }).then((response) => {
        if (response.ViMessage) {
          this.submitSuccess = true
          this.loaded = true
          this.reload()
        }
        this.loaded = true
      }).catch((e) => {
        this.loaded = true
      })
    },
    add () {
      this.data.Forms.push({Datas: [], IsDeleted: false})
    },
    onDelete (index) {
      this.data.Forms[index].IsDeleted = true
    },
    getData () {
      new FormData()
        .find('/' + this.VisitType + '/' + this.FormCode + '/' + this.VisitId + '?hidemsg=' + true)
        .then(async response => {
          this.loaded = true
          if (this.data && !this.data.Forms) {
            this.data = response
            if (this.data && this.data.Forms && this.data.Forms.length) {
              // Assign VisitId
              this.data.Forms.map(item => {
                item.Datas.map(e => {
                  Object.assign(e, {VisitId: item.VisitId})
                })
              })
              // Sort by date
              this.data.Forms = this.data.Forms.sort((a, b) => {
                const item1 = a.Datas.find((item) => item.Code === 'PRFOURE107')
                const item2 = b.Datas.find((item) => item.Code === 'PRFOURE107')
                if (moment(item1.Value, 'DD/MM/YYYY').format() > moment(item2.Value, 'DD/MM/YYYY').format()) return 1
                return -1
              })
            }
          }
        })
        .catch((e) => {
          if (this.data && !this.data.Forms) {
            if (this.checkShow) {
              this.noneForm = true
            }
            this.data = {
              Forms: [],
              VisitId: this.VisitId,
              FormId: this.FormID,
              FormCode: this.FormCode
            }
          }
          this.loaded = true
        })
    },
    mapDataTable (data) {
      if (data) {
        this.data = data
      }
    },
    mapDataTable2 () {
      if (this.data) {
        this.data.Forms.map(e => {
          if (e.Id) {
            e.Id = ''
          }
        })
      }
    },
    checkTableChanged () {
      this.$emit('dataChanged')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .th-top {
    vertical-align: top;
  }
  .tbl-setup {
    th {
      border: 1px solid #c0c0c0;
      border-top: 1px solid #c0c0c0!important;
    }
  }
</style>
