<template>
  <div class="NeonatalTable" v-if="!print">
    <table class="table observation-table" style="width:800px!important;margin-bottom:0px">
      <thead>
        <tr>
          <th class="text-center" width="50px">{{__t('TT')}}</th>
          <th class="text-center" width="349px"><i>{{__t('Phương pháp')}}</i></th>
          <th class="text-center" width="50px">{{__t('TT')}}</th>
          <th class="text-center" width="349px"><i>{{__t('Phương pháp')}}</i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="min-height: 40px;" class="text-center">1</td>
          <td style="border-right:0px;min-height: 40px;">
            <div class="mini-box-table1 full-width" style="height: auto;">
              <div class="flex-box align-center space-between">
                <div style="min-width: 150px;">{{__label(data[0])}}</div>
                <span class="v-checkbox" align="center">
                  <input type="checkbox" :disabled="readonly ? true : false" :id="data[0].Code" :name="data[0].Code" v-model="data[0].Value">
                  <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data[0].Code"></label>
                </span>
              </div>
            </div>
          </td>
          <td style="min-height: 40px;" class="text-center">2</td>
          <td style="min-height: 40px;">
            <div class="mini-box-table1 full-width" style="height: auto;">
              <div class="flex-box align-center space-between">
                <div style="min-width: 150px;">{{__label(data[1])}}</div>
                <span class="v-checkbox" align="center">
                  <input type="checkbox" :disabled="readonly ? true : false" :id="data[1].Code" :name="data[1].Code" v-model="data[1].Value">
                  <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data[1].Code"></label>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="min-height: 40px;" class="text-center">3</td>
          <td style="border-right:0px;min-height: 40px;">
            <div class="mini-box-table1 full-width" style="height: auto;">
              <div class="flex-box align-center space-between">
                <div style="min-width: 150px;">{{__label(data[2])}}</div>
                <span class="v-checkbox" align="center">
                  <input type="checkbox" :disabled="readonly ? true : false" :id="data[2].Code" :name="data[2].Code" v-model="data[2].Value">
                  <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data[2].Code"></label>
                </span>
              </div>
            </div>
          </td>
          <td style="min-height: 40px;" class="text-center">4</td>
          <td style="min-height: 40px;">
            <div class="mini-box-table1 full-width" style="height: auto;">
              <div class="flex-box align-center space-between">
                <div style="min-width: 150px;">{{__label(data[3])}}</div>
                <span class="v-checkbox" align="center">
                  <input type="checkbox" :disabled="readonly ? true : false" :id="data[3].Code" :name="data[3].Code" v-model="data[3].Value">
                  <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data[3].Code"></label>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="min-height: 40px;" class="text-center">5</td>
          <td style="border-right:0px;min-height: 40px;">
            <div class="mini-box-table1 full-width" style="height: auto;">
              <div class="flex-box align-center space-between">
                <div style="min-width: 150px;">{{__label(data[4])}}</div>
                <span class="v-checkbox" align="center">
                  <input type="checkbox" :disabled="readonly ? true : false" :id="data[4].Code" :name="data[4].Code" v-model="data[4].Value">
                  <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data[4].Code"></label>
                </span>
              </div>
            </div>
          </td>
          <td style="min-height: 40px;" class="text-center">6</td>
          <td style="min-height: 40px;">
            <div class="mini-box-table1 full-width" style="height: auto;">
              <div class="flex-box align-center space-between">
                <div style="min-width: 150px;">{{__label(data[5])}}</div>
                <div style="width: 217px;">
                  <textarea-autosize v-if="data[5].Value" :readonly="readonly" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="data[6].Value"/>
                </div>
                <span class="v-checkbox" align="center">
                  <input type="checkbox" :disabled="readonly ? true : false" :id="data[5].Code" :name="data[5].Code" v-model="data[5].Value">
                  <label :style="`cursor: ${readonly ? 'context-menu' : null};`" @click="changeData()" :for="data[5].Code"></label>
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="NeonatalTable" v-else>
    <table class="tbl-b table-setup" style="width:100%!important;margin-bottom:0px">
      <tr>
        <th class="text-center">TT<i>/ No.</i></th>
        <th class="text-center" width="349px"><i>Phương pháp/ Methods</i></th>
        <th class="text-center">TT<i>/ No.</i></th>
        <th class="text-center" width="349px"><i>Phương pháp/ Methods</i></th>
      </tr>
      <tr>
        <td style="min-height: 40px;" class="text-center">1</td>
        <td style="border-right:0px;min-height: 40px;">
          <div style="width: 100%">
            <div class="flex-box align-center space-between">
              <table style="width: 100%">
                <tr>
                  <td style="text-align: left;"><span class="text-left" style="min-width: 50px;">{{data[0].ViName}}<i>{{__t3(data[0].ViName)}}</i></span></td>
                  <td style="text-align: right;"><span class="square-text" :class="{'hidden-text': !data[0].Value}">&#10003;</span></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
        <td style="min-height: 40px;" class="text-center">2</td>
        <td style="min-height: 40px;">
          <div style="width: 100%">
            <div class="flex-box align-center space-between">
              <table style="width: 100%">
                <tr>
                  <td style="text-align: left;"><span class="text-left" style="min-width: 50px;">{{data[1].ViName}}<i>{{__t3(data[1].ViName)}}</i></span></td>
                  <td style="text-align: right;"><span class="square-text" :class="{'hidden-text': !data[1].Value}">&#10003;</span></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="min-height: 40px;" class="text-center">3</td>
        <td style="border-right:0px;min-height: 40px;">
          <div style="width: 100%">
            <div class="flex-box align-center space-between">
              <table style="width: 100%">
                <tr>
                  <td style="text-align: left;"><span class="text-left" style="min-width: 50px;">{{data[2].ViName}}<i>{{__t3(data[2].ViName)}}</i></span></td>
                  <td style="text-align: right;"><span class="square-text" :class="{'hidden-text': !data[2].Value}">&#10003;</span></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
        <td style="min-height: 40px;" class="text-center">4</td>
        <td style="min-height: 40px;">
          <div style="width: 100%">
            <div class="flex-box align-center space-between">
              <table style="width: 100%">
                <tr>
                  <td style="text-align: left;"><span class="text-left" style="min-width: 50px;">{{data[3].ViName}}<i>{{__t3(data[3].ViName)}}</i></span></td>
                  <td style="text-align: right;"><span class="square-text" :class="{'hidden-text': !data[3].Value}">&#10003;</span></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="min-height: 40px;" class="text-center">5</td>
        <td style="border-right:0px;min-height: 40px;">
          <div style="width: 100%">
            <div class="flex-box align-center space-between">
              <table style="width: 100%">
                <tr>
                  <td style="text-align: left;"><span class="text-left" style="min-width: 50px;">{{data[4].ViName}}<i>{{__t3(data[4].ViName)}}</i></span></td>
                  <td style="text-align: right;"><span class="square-text" :class="{'hidden-text': !data[4].Value}">&#10003;</span></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
        <td style="min-height: 40px;" class="text-center">6</td>
        <td style="min-height: 40px;">
          <div style="width: 100%">
            <div class="flex-box align-center space-between">
              <table style="width: 100%">
                <tr>
                  <td style="text-align: left;"><span class="text-left" style="min-width: 50px;">{{data[5].ViName}}<i>{{__t3(data[5].ViName)}}</i></span></td>
                  <td style="text-align: left; padding-left: 10px;">
                    <p style="margin-bottom: 0px;">{{data[6].Value}}</p>
                  </td>
                  <td style="text-align: right;"><span class="square-text" :class="{'hidden-text': !data[5].Value}">&#10003;</span></td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NeonatalTable',
  props: ['data', 'readonly', 'master', 'print'],
  methods: {
    changeData () {
      if (this.data && this.data.length) {
        if (!this.data[5].Value) {
          this.data[6].Value = ''
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .big-box-table-1 {
    .mini-box-table1 {
      min-width: 33.29%;
      display: inline-block;
      height: 50px;
      padding: 0 auto;
    }
  }
  input[type=checkbox]:checked:disabled + label:before {
    transform: scale(1);
    background-color: #aaa!important;
    border-color: #aaa!important;
  }
  .big-box {
    .mini-box {
      width: 217px;
    }
  }
</style>
