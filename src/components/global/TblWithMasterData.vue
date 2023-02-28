<template>
  <div class="tbl-with-master-data" v-if="loaded && !noneForm">
    <table v-if="!print" class="table table-striped table-bordered v-table tbl-setup" :class="autoIncrease ? 'ftable' : null">
      <slot name="head" v-if="$slots.head"></slot>
      <thead v-else>
        <tr>
          <th :colspan="colSpan ? colSpan[index] : ''" :class="top ? 'th-top' : null" :style="headerStyle ? headerStyle[index] : {}" :key="index" v-for="(item, index) in mddata.Items" v-if="!indexs || indexs.includes(index)">
            <div>{{__label(item)}}</div>
          </th>
        </tr>
      </thead>
      <tbody v-if="data">
        <template v-for="(item, index) in data.Forms">
          <TblWithMasterDataItem
            :dontGetDate="dontGetDate"
            :checkUserEdit="checkUserEdit"
            :indexs="indexs"
            :readonly="readonly"
            :formatTime="formatTime"
            :key="index"
            :indexRow="index"
            :MASTERDATA="mddata"
            v-model="item.Datas"
            v-if="!item.IsDeleted"
            :widthTD="widthTD"
            @onDelete="onDelete(index)"/>
        </template>
        <tr v-if="data.Forms && !data.Forms.length">
          <td colspan="9999" class="text-center">
            {{__t('Không có dữ liệu')}}
          </td>
        </tr>
        <tr v-if="!readonly"><td colspan="9999" class="text-center"><button class="btn btn-info" @click="add">{{textBtnAdd ? textBtnAdd : __t('THÊM')}}</button></td></tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="9999" class="text-center"><v-loading/></td>
        </tr>
      </tbody>
    </table>
    <table v-else class="tbl-b tbl-c" style="width: 100%">
      <tr v-if="FormCode === 'IPDSANTBL1'">
        <th width="46px">Số lần<span class="italic"><br>có thai<br>Numb<br>er of<br>pregn<br>ancy</span></th>
        <th width="46px">Năm<br><span class="italic">Year</span></th>
        <th width="46px">Đẻ đủ<br>tháng<br><span class="italic">Full-<br>term</span></th>
        <th width="46px">Đẻ thiếu<br>tháng<br><span class="italic">Pre-term</span></th>
        <th width="46px">Sẩy<br><span class="italic">Misca<br>rriage</span></th>
        <th width="46px">Hút<br><span class="italic">Suc<br>tion</span></th>
        <th width="46px">Nạo<br><span class="italic">D&<br>E</span></th>
        <th width="46px">Co-<br>vac</th>
        <th width="46px">Chửa<br>ngoài<br>TC<br><span class="italic">Ectopi<br>c<br>pregn<br>ancy</span></th>
        <th width="46px">Chửa<br>trứng<br><span class="italic">Hydati<br>diform<br>mole</span></th>
        <th width="46px">Thai<br>chết<br>lưu<br><span class="italic">Stillb<br>irth</span></th>
        <th width="46px">Con<br>hiện<br>sống<br><span class="italic">Alive</span></th>
        <th width="46px">Cân<br>nặng<br><span class="italic">Weight</span></th>
        <th>Phương<br>pháp đẻ<br><span class="italic">Labour<br>method</span></th>
        <th width="46px">Tai biến<br><span class="italic">Acciden<br>t</span></th>
      </tr>
      <tr v-else-if="FormCode === 'IPDSANTHPT1'">
        <th class="text-center" width='140px'>Giờ, ngày/<br><i>Hour, date</i></th>
        <th class="text-center">Phương pháp phẫu thuật/vô cảm/<br><i>Surgical/Anesthesia methods</i></th>
        <th class="text-center" width='140px'>Phẫu thuật viên/<br><i>Surgeon</i></th>
        <th class="text-center" width='140px'>Bác sỹ gây mê<br><i>Anesthesiologist</i></th>
      </tr>
      <tr v-else-if="FormCode === 'IPDMATTBL1'">
        <th width="130px">
          <div>Ngày PT/</div>
          <div class="italic">Date of surgery</div>
        </th>
        <th>
          <div>Loại phẫu thuật/ Thủ thuật/</div>
          <div class="italic">Surgical methods</div>
        </th>
        <th width="300px">
          <div class="italic">Phẫu thuật viên/ <i>Surgeon</i></div>
        </th>
      </tr>
      <tr v-else>
        <th :class="top ? 'th-top' : null" :style="headerStyle ? headerStyle[index] : {}" :key="index" v-for="(item, index) in mddata.Items" v-if="!indexs || indexs.includes(index)">
          <div class="block" :class="centerHeader ? 'text-center' : null" style="word-break: break-all;">{{(thead && thead.length && thead[index]) ? thead[index] : __label(item)}}</div>
        </th>
      </tr>
      <template v-if="data">
        <template v-for="(item, index) in data.Forms">
          <TblWithMasterDataItem
            :dontGetDate="dontGetDate"
            :checkUserEdit="checkUserEdit"
            :indexs="indexs"
            :print="print"
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
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import FormData from '@/services/FormData'
import TblWithMasterDataItem from '@/components/global/TblWithMasterDataItem.vue'
import NProgress from 'nprogress'

export default {
  name: 'TblWithMasterData',
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
    'colSpan',
    'widthTD'
  ],
  mixins: [MixinMasterData],
  data () {
    return {
      loaded: false,
      data: [],
      mddata: {},
      noneForm: false,
      autoIncrease: false,
      DataFormUserCreate: []
    }
  },
  components: {
    TblWithMasterDataItem
  },
  created () {
  },
  mounted () {
    this.getRawMasterDatas({ Group: this.FormCode || 'IPDIAAUTEET' }, (md) => {
      md.find(e => {
        if (e.DataType === 'AutoIncrease') {
          this.autoIncrease = true
        }
      })
      this.$set(this.mddata, 'Items', md)
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
        await new FormData()
          .update('/' + this.VisitType + '/' + this.FormCode + '/' + this.VisitId + '?hidemsg=' + true, {
            VisitId: this.VisitId,
            FormId: this.FormID,
            FormCode: this.FormCode,
            Forms: this.data.Forms
          })
          .then(() => {
            this.loaded = true
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
      await new FormData().update('/' + this.VisitType + '/' + this.FormCode + '/' + this.VisitId + '?hidemsg=' + true, {
        VisitId: this.VisitId,
        FormId: this.FormID,
        FormCode: this.FormCode,
        Forms: this.DataFormUserCreate
      }).then(() => {
        this.loaded = true
      }).catch((e) => {
        this.loaded = true
      })
    },
    add () {
      this.data.Forms.push({Datas: [], IsDeleted: false})
    },
    clear () {
      this.data.Forms.map(e => {
        e.IsDeleted = true
      })
      this.$emit('getCol', this.data.Forms)
    },
    onDelete (index) {
      this.data.Forms[index].IsDeleted = true
      // this.data.Forms.splice(index, 1)
    },
    getData () {
      new FormData()
        .find('/' + this.VisitType + '/' + this.FormCode + '/' + this.VisitId + '?hidemsg=' + true)
        .then(async response => {
          this.loaded = true
          if (this.data && !this.data.Forms) {
            this.data = response
            if (this.data && this.data.Forms && this.data.Forms.length) {
              this.$emit('getCol', this.data.Forms)
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
        // data.Forms.map(e => {
        //   if (e.Id) {
        //     e.Id = ''
        //   }
        // })
        this.data = data
        this.$emit('getCol', this.data.Forms)
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
