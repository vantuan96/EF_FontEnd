<template>
  <div class="SyncEkipFromORTable">
    <template>
      <div class="ed-info box-collapse" :class="{'open': open}">
        <div class="ed-customer-title">
          <b>{{__t('Thông tin Ekip từ OR')}}</b>
        </div>
        <div class="box-collapse-content v-box-collapse">
          <div class="panel-group" id="accordionEkipOR" role="tablist" aria-multiselectable="true" v-if="EkipList && EkipList.length > 0">
            <template v-for="(ekip, indexEkip) in EkipList">
              <div :key="indexEkip" :data="ekip" class="panel panel-default" v-if="indexEkip < maxEkip">
                <div class="panel-heading" role="tab" :id="'headingOne-' + indexEkip">
                  <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" :class="{'collapsed': indexEkip >= numberOpen}"  :href="'#collapseboxxn-' + indexEkip" aria-expanded="true" :aria-controls="'collapseboxxn-' + indexEkip">
                      {{ekip.ThoiGianThucHien}} - {{ekip.ItemName}} ({{ekip.ItemCode}}) <i class="fa fa-angle-double-down" aria-hidden="true"></i> <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                    </a>
                  </h4>
                </div>
                <div :id="'collapseboxxn-' + indexEkip" class="panel-collapse collapse" :class="{'in': indexEkip < numberOpen}" role="tabpanel" aria-labelledby="headingOne">
                  <table class="table mini-tablex table-bordered table-bordered-x">
                    <thead>
                      <tr class="color000">
                        <th style="text-align: center; vertical-align: middle">{{__t('PTV chính')}}</th>
                        <th style="text-align: center; vertical-align: middle">{{__t('PTV phụ')}}</th>
                        <th style="text-align: center; vertical-align: middle">{{__t('BS gây mê hồi sức')}}</th>
                        <th style="text-align: center; vertical-align: middle">{{__t('ĐD phụ mê')}}</th>
                        <th style="text-align: center; vertical-align: middle">{{__t('ĐD dụng cụ')}}</th>
                        <th style="text-align: center; vertical-align: middle">{{__t('ĐD chạy ngoài')}}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody :key="indexEkip">
                      <tr style="text-align: center">
                        <td style="width: 180px"><ad-Info :ad="ekip.UserName_PTVChinh"/></td>
                        <td style="width: 180px">
                          <template v-for="($item1, $index1) in ekip.UserName_PTV_Phu">
                            <ad-Info class="mr-5" :key="$index1 + makeid()" :ad="$item1"/>
                          </template>
                        </td>
                        <td style="width: 180px"><ad-Info :ad="ekip.UserName_Bs_GayMe"/></td>
                        <td style="width: 180px">
                          <template v-for="($item2, $index2) in ekip.UserName_Nurse_PhuMe">
                            <ad-Info class="mr-5" :key="$index2 + makeid()" :ad="$item2"/>
                          </template>
                        </td>
                        <td style="width: 180px">
                          <template v-for="($item3, $index3) in ekip.UserName_Nurse_Tool">
                            <ad-Info class="mr-5" :key="$index3 + makeid()" :ad="$item3"/>
                          </template>
                        </td>
                        <td style="width: 180px">
                          <template v-for="($item4, $index4) in ekip.UserName_Nurse_Runout">
                            <ad-Info class="mr-5" :key="$index4 + makeid()" :ad="$item4"/>
                          </template>
                        </td>
                        <td width="1"><button :class="{'btn btn-flat btn-xs': true}" @click="copy(ekip)">Copy</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
            <div class="text-center" v-if="EkipList - maxEkip > 0"><button class="btn v-green-btn v-bottom-btn" @click="maxEkip = maxEkip + 5"><i aria-hidden="true" class="fa fa-angle-double-down"></i> Xem thêm</button></div>
          </div>
          <h5 class="text-center msg-no-data" v-else>{{__t('Không có thông tin!')}}</h5>
        </div>
        <div class="box-action hidden" @click="collapse()">
          <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
          <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import EkipList from '@/services/EkipListFromOR'
export default {
  name: 'EkipList',
  mixins: [],
  data () {
    return {
      numberOpen: 0,
      maxEkip: 5,
      open: true,
      EkipList: null
    }
  },
  props: ['VisitId', 'VisitType', 'MASTERDATA'],
  created () {
    this.getData()
  },
  methods: {
    copy (ekip) {
      this.$emit('copy', ekip)
      console.log(ekip, 'log item')
    },
    getData () {
      new EkipList().find('GetEkipFromOr' + '/' + this._VisitType + '/' + this._VisitId).then(data => {
        console.log(this.EkipList, 'check ekip list')
        this.EkipList = data
      })
    }
  }
}
</script>
<style scoped>
.flexDirec {
  display: flex;
  flex-direction: column;
}
</style>
