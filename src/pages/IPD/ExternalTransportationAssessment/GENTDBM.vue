<template>
  <div class="row" v-if="Data">
    <div class="col-md-12 col-sm-12" v-if="type === 1">
      <div class="collapsible-box">
        <button class="btn-title collapsed" data-toggle="collapse" data-target="#collapsible-0">
          {{__label(Data[0])}} <span class="note-text" v-if="Data[0].Note">{{Data[0].Note}}</span>
          <div class="pull-right btn-pos-right">
            <i class="fa fa-angle-double-down"></i>
            <i class="fa fa-angle-double-up"></i>
          </div>
        </button>
        <div id="collapsible-0" class="collapse">
          <ul class="list-group">
            <li class="list-group-item" :key="index" v-for="(item, index) in arrsort">
              <span v-html="__label(item)"></span> <span class="number-order">{{item.Order}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-sm-12" v-if="type === 2">
      <div class="collapsible-box">
        <button class="btn-title collapsed" data-toggle="collapse" data-target="#collapsible-1">
          {{__label(Data[1])}} <span class="note-text" v-if="Data[1].Note">{{Data[1].Note}}</span>
          <div class="pull-right btn-pos-right">
            <i class="fa fa-angle-double-down"></i>
            <i class="fa fa-angle-double-up"></i>
          </div>
        </button>
        <div id="collapsible-1" class="collapse">
          <ul class="list-group">
            <li class="list-group-item" :key="index" v-for="(item, index) in Data[1].Items">
              <span v-html="__label(item)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-sm-12" v-if="type === 3">
      <div class="collapsible-box">
        <button class="btn-title collapsed" data-toggle="collapse" data-target="#collapsible-2">
          {{__label(Data[2])}} <span class="note-text" v-if="Data[2].Note">{{Data[2].Note}}</span>
          <div class="pull-right btn-pos-right">
            <i class="fa fa-angle-double-down"></i>
            <i class="fa fa-angle-double-up"></i>
          </div>
        </button>
        <div id="collapsible-2" class="collapse">
          <table class="table">
           <tr>
             <td>
               {{__label(Data[3])}}
             </td>
             <td>
              <ul class="list-group">
                <li class="list-group-item" :key="index" v-for="(item, index) in  Data[3].Items">
                  <span v-html="__label(item)"></span> <span class="number-order">{{item.Order}}</span>
                </li>
              </ul>
             </td>
           </tr>
           <tr>
             <td>
               {{__label(Data[4])}}
             </td>
             <td>
              <ul class="list-group">
                <li class="list-group-item" :key="index" v-for="(item, index) in  Data[4].Items">
                  <span v-html="__label(item)"></span> <span class="number-order">{{item.Order}}</span>
                </li>
              </ul>
             </td>
           </tr>
           <tr>
             <td>
               {{__label(Data[5])}}
             </td>
             <td>
              <ul class="list-group">
                <li class="list-group-item" :key="index" v-for="(item, index) in  Data[5].Items">
                  <span v-html="__label(item)"></span> <span class="number-order">{{item.Order}}</span>
                </li>
              </ul>
             </td>
           </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
export default {
  name: 'GENTDBMView',
  props: ['datas', 'type'],
  mixins: [MixinMasterData],
  data () {
    return {
      Data: null
    }
  },
  components: {
  },
  mounted () {
    // this.getData()
    this.Data = this.datas
  },
  computed: {
    arrsort () {
      return this.Data[0].Items
    }
  },
  methods: {
    getData () {
      this.getRawMasterDatas({
        Form: 'GENTDBM'
      }, data => {
        this.Data = data
        this.Data[0].Items = data[0].Items.sort((a, b) => (a.Order < b.Order) ? 1 : -1)
      })
    }
  }
}
</script>
