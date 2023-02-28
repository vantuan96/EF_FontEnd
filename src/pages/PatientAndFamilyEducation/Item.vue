<template>
  <div>
    <div v-if="!loading">
      <Ver2 v-if="Version >= 10"/>
      <div v-else>
      <h4>{{__t('Đánh giá về khả năng tiếp nhận thông tin')}} <span class="note-text"> {{__t('(Lựa chọn vào các ô áp dụng)')}}</span></h4>
      <div class="row mg-bt-20" v-if="MASTERDATA['PFEFNPTBA']">
        <div class="col-md-12">
          <div class="group-radio">
            <span class="group-radio-label">{{__label(MASTERDATA['PFEFNPTBA'])}}: </span>
            <template :data="item"  v-for="(item,index) in MASTERDATA['PFEFNPTBA'].Items">
              <span :key="index" v-if="item.DataType === 'Radio'">
                <input type="checkbox" :id="'PFEFNPTBAradio-' + index" v-model="item.Value">
                <label :for="'PFEFNPTBAradio-' + index" @click="checkbox2Radio(MASTERDATA['PFEFNPTBA'].Items, item)">{{__label(item)}}</label>
              </span>
              <span :key="index" v-else style="flex-grow: 1;">
                <textarea-autosize :resized="resized" :placeholder="__t('Ghi cụ thể')" class="form-control" v-model="item.Value" v-if="MASTERDATA['PFEFNPTBA'].Items[1].Value"/>
              </span>
            </template>
          </div>
        </div>
      </div>
      <div class="box-body boder">
        <div class="row mg-bt-20" v-if="MASTERDATA['PFEFEL0']">
          <div class="col-md-12">
            <label class="group-radio-label">{{__label(MASTERDATA['PFEFEL0'])}}: </label>
            <div class="group-checkbox">
              <template :data="item"  v-for="(item,index) in MASTERDATA['PFEFEL0'].Items">
                <label  @click="checkbox2Radio(MASTERDATA['PFEFEL0'].Items, item)" class="container-checkbox" :key="index" v-if="checkString(item.DataType, 'Radio')">{{__label(item)}}
                  <input type="checkbox" :id="'PFEFEL0radio-' + index" v-model="item.Value">
                  <span class="checkmark"></span>
                </label>
                <span :key="index" v-else style="flex-grow: 1;">
                  <input :placeholder="__t('Ghi cụ thể')" class="form-control" v-model="item.Value" v-if="MASTERDATA['PFEFEL0'].Items[4] && MASTERDATA['PFEFEL0'].Items[4].Value"/>
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="row mg-bt-20" v-if="MASTERDATA['PFEFESTA']">
          <div class="col-md-12">
            <label>{{__t('Trạng thái người được GDSK')}}:</label>
          </div>
          <div class="col-md-2 group-radio no-flex" v-if="MASTERDATA['PFEFESTA']">
            <span :key="index" :data="item"  v-for="(item,index) in MASTERDATA['PFEFESTA'].Items">
              <input type="checkbox" :id="'PFEFESTAradio-' + index" v-model="item.Value">
              <label :for="'PFEFESTAradio-' + index" @click="checkbox2Radio(MASTERDATA['PFEFESTA'].Items, item)">{{__label(item)}}</label>
            </span>
          </div>
          <div class="col-md-2 group-radio no-flex border-left" v-if="MASTERDATA['PFEFHEAR']">
            <span :key="index" :data="item"  v-for="(item,index) in MASTERDATA['PFEFHEAR'].Items">
              <input type="checkbox" :id="'PFEFHEARradio-' + index" v-model="item.Value">
              <label :for="'PFEFHEARradio-' + index" @click="checkbox2Radio(MASTERDATA['PFEFHEAR'].Items, item)">{{__label(item)}}</label>
            </span>
          </div>
          <div class="col-md-2 group-radio no-flex border-left" v-if="MASTERDATA['PFEFEYVI']">
            <span :key="index" :data="item"  v-for="(item,index) in MASTERDATA['PFEFEYVI'].Items">
              <input type="checkbox" :id="'PFEFEYVIradio-' + index" v-model="item.Value">
              <label :for="'PFEFEYVIradio-' + index" @click="checkbox2Radio(MASTERDATA['PFEFEYVI'].Items, item)">{{__label(item)}}</label>
            </span>
          </div>
          <div class="col-md-6 border-left" v-if="(MASTERDATA['PFEFSPCH'] && Version >= 10)">
            <div class="group-checkbox">
              <div :key="index" :data="item" v-if="(index < 1)"  v-for="(item,index) in MASTERDATA['PFEFSPCH'].Items">
                <label @click="checkbox2Radio2(MASTERDATA['PFEFSPCH'].Items, item); clearCheckBox(0)" class="container-checkbox" :key="index" v-if="checkString(item.DataType, 'CheckBox')">{{__label(item)}}
                  <input type="checkbox" :id="'PFEFSPCHradio-' + index" v-model="item.Value">
                  <span class="checkmark"></span>
                </label>
                <!-- <span v-if="MASTERDATA['PFEFSPCH'].Items[0].Value">
                  <input class="form-control" v-model="MASTERDATA['PFEFSPCHTEXT'].Items[0].Value"/>
                </span> -->
              </div>
              <!-- rào cản ngôn ngữ -->
              <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['PFEFSPCH'].Items.filter(item => item.Code === 'PFEFSPCHSLB')">
                <label @click="checkbox2Radio2(MASTERDATA['PFEFSPCH'].Items, item); clearCheckBox(1)" class="container-checkbox" :key="index" v-if="checkString(item.DataType, 'CheckBox')">{{__label(item)}}
                  <input type="checkbox" :id="'PFEFSPCHradio-' + index" v-model="item.Value">
                  <span class="checkmark"></span>
                </label>
                <span v-if="MASTERDATA['PFEFSPCH'].Items[1].Value">
                  <input :placeholder="__t('Mô tả cụ thể (khi xác định có rào cản khiến người được GDSK không hiểu)')" class="form-control mb-10" v-model="MASTERDATA['PFEFSPCHTEXT'].Items[0].Value"/>
                </span>
              </div>
              <!-- rào cản cảm xúc hoặc động lực -->
              <div :key="index" :data="item" v-for="(item,index) in MASTERDATA['PFEFSPCH'].Items.filter(item => item.Code === 'PFEFSPCHEMB')">
                <label @click="checkbox2Radio2(MASTERDATA['PFEFSPCH'].Items, item); clearCheckBox(2)" class="container-checkbox" :key="index" v-if="checkString(item.DataType, 'CheckBox')">{{__label(item)}}
                  <input type="checkbox" :id="'PFEFSPCHradio-' + index" v-model="item.Value">
                  <span class="checkmark"></span>
                </label>
                <span v-if="MASTERDATA['PFEFSPCH'].Items[2].Value">
                  <input :placeholder="__t('Mô tả cụ thể (khi xác định có rào cản khiến người được GDSK không hiểu)')" class="form-control mb-10" v-model="MASTERDATA['PFEFSPCHTEXT'].Items[1].Value"/>
                </span>
              </div>
              <span>
                Mô tả:
                <input :placeholder="__label(MASTERDATA['PFEFSPCH'].Items[3])" class="form-control" v-model="MASTERDATA['PFEFSPCH'].Items[3].Value"/>
              </span>
            </div>
          </div>
          <div v-else-if="MASTERDATA['PFEFSPCH']" class="col-md-6 border-left">
            <div class="group-checkbox">
              <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['PFEFSPCH'].Items">
                <label @click="checkbox2Radio2(MASTERDATA['PFEFSPCH'].Items, item)" class="container-checkbox" :key="index" v-if="checkString(item.DataType, 'CheckBox')">{{__label(item)}}
                  <input type="checkbox" :id="'PFEFSPCHradio-' + index" v-model="item.Value">
                  <span class="checkmark"></span>
                </label>
                <span v-else>
                  <input :placeholder="__label(item)" class="form-control" v-model="item.Value"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mg-bt-20" v-if="MASTERDATA['PFEFEN0']">
        <div class="col-md-12">
          <label>{{__t('Nội dung đào tạo, giáo dục sức khỏe')}}</label>
          <button class="btn btn-green-gradient" @click="$modal.show('Educational-needs')">{{__t('CHỌN NỘI DUNG ĐÀO TẠO')}}</button>
          <modal name="Educational-needs" transition="pop-out" height="auto" :scrollable="true" :width="350">
            <div class="sync-ed-header">{{__t('CHỌN NỘI DUNG ĐÀO TẠO')}}</div>
            <div class="sync-ed-box">
              <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['PFEFEN0'].Items">
                <label :class="{'d-none': index === 6 && Version === 1}" class="container-checkbox" :for="'PFEFEN0radio-' + index">{{__label(item)}}
                <!-- <label class="container-checkbox" :for="'PFEFEN0radio-' + index">{{__label(item)}} -->
                  <input type="checkbox" :id="'PFEFEN0radio-' + index" v-model="item.Value">
                  <span class="checkmark"></span>
                </label>
              </div>
              <button class="btn btn-yellow-gradient btn-block" @click="selectEducationalNeeds()">{{__t('CHỌN')}}</button>
            </div>
          </modal>
        </div>
      </div>
      <div class="row mg-bt-20">
        <div class="col-md-12">
          <div class="box-info-green">
            <b>{{__t('Từ viết tắt')}}:</b>
            <div class="ml-20">{{__t('- NU: Không hiểu và không nhắc lại được')}}</div>
            <div class="ml-20">{{__t('- U: Hiểu và nhắc lại được')}}</div>
            <div class="ml-20">{{__t('- P: Tự làm các kỹ năng được đào tạo một cách độc lập')}}</div>
            <!-- {{__t('- NU: Không hiểu và không nhắc lại được  - U: Hiểu và nhắc lại được  - P: Tự làm các kỹ năng được đào tạo một cách độc lập')}} -->
          </div>
        </div>
      </div>
      <!-- <pre>
        {{newItems}}
      </pre> -->
      <div class="row" v-if="EducationalNeeds.length">
        <div class="col-md-12">
          <div class="panel-group" id="PFEFEN0-group">
            <div class="panel panel-default panel-educational" :key="index" :data="item"  v-for="(item, index) in EducationalNeeds">
              <div class="panel-heading" role="tab" :id="'heading-' + index">
                <h4 class="panel-title panel-title-icon">
                  <a  @click="resizeTab()" :id="'collapse' + item.Code" role="button" data-toggle="collapse" :href="'#collapse' + index" aria-expanded="true" class="collapsed" :aria-controls="'collapse' + index">
                    <i class="fa fa-chevron-up"></i>
                    <i class="fa fa-chevron-down"></i>
                    {{__label(item)}}
                  </a>
                  <span class="notex" v-if="item.LastUpdatedBy"><b>{{__t('Đánh giá cuối bởi')}}:</b> <ad-Info :ad="item.LastUpdatedBy" /> lúc {{item.LastUpdatedAt}}</span>
                </h4>
              </div>
              <div :id="'collapse' + index" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'heading-' + index">
                <div class="panel-body">
                  <div>
                    <ul class="nav nav-tabs" role="tablist">
                      <li @click="resizeTab()" role="presentation" :class="{'active': ind === 0}" :key="'tab-'+ ind" :data="it"  v-for="(it,ind) in item.Datas">
                        <a :href="'#tabp'+item.Code+'-'+ind" :aria-controls="'tabp'+item.Code+'-'+ind" role="tab" data-toggle="tab">{{__label(it)}}</a>
                      </li>
                      <li v-if="allowNew(item)">
                        <a @click="newTurn(item, item.Code + '-' + index)" class="add-btn-active"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm Lượt')}}</a>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div :class="{'active in': ind === 0, 'readonly': isReadonly(item, it, ind)}" :key="'pane-'+ ind" :data="it"  v-for="(it,ind) in item.Datas" role="tabpanel" class="tab-pane fade tab-box" :id="'tabp'+item.Code+'-'+ind">
                        <div v-if="!isConfirmItem(it)">
                          <div v-if="MASTERDATA[item.Code + '-PFEFTOE-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <label class="group-radio-label">{{__label(MASTERDATA[item.Code + '-PFEFTOE-' + ind])}}: </label>
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTOE-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTOE-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTOE-' + ind + '-radio-' + $index" @click="checkbox2Radio(MASTERDATA[item.Code + '-PFEFTOE-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <div :key="$index" v-else>
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" class="form-control mg-top-20" v-model="$item.Value" v-if="!isReadonly(item, it, ind) && MASTERDATA[item.Code + '-PFEFTOE-' + ind].Items[2].Value"/>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFPCM-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <label class="group-radio-label">{{__label(MASTERDATA[item.Code + '-PFEFPCM-' + ind])}}: </label>
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFPCM-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPCM-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFPCM-' + ind + '-radio-' + $index">{{__label($item)}}</label>
                                </span>
                                <div :key="$index" v-else>
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" class="form-control mg-top-20" v-model="$item.Value" v-if="!isReadonly(item, it, ind) && MASTERDATA[item.Code + '-PFEFPCM-' + ind].Items[4].Value"/>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <label>{{__t('Nội dung đã tư vấn')}}</label>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTPSA-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTPSA-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTPSA-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTPSA-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTPSA-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items[0].Value === true" type="text" class="v-input-md2 form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFIFMN-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFIFMN-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFIFMN-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFIFMN-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFIFMN-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFMPPP-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label @click="resetGroup(MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items, $item)" class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFMPPP-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMPPP-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMPPP-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFMPPP-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFMIIP-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFMIIP-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMIIP-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMIIP-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFMIIP-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFIOHT-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFIOHT-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFIOHT-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFIOHT-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFIOHT-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFPEHY-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFPEHY-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPEHY-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPEHY-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFPEHY-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFWOCA-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFWOCA-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFWOCA-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFWOCA-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFWOCA-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFUCDC-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFUCDC-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFUCDC-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFUCDC-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFUCDC-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <!-- <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" /> -->
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFFPS0-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFFPS0-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFFPS0-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFFPS0-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFFPS0-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFFUIN-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFFUIN-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFFUIN-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFFUIN-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFFUIN-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFDIET-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFDIET-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFDIET-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                              <div>
                                <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items">
                                  <span :key="$index + 'xtz'" v-if="checkString($item.DataType, 'Radio') && PFEFDIETShowHide(MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items)">
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFDIET-' + ind+'-radio-' + $index" v-model="$item.Value">
                                    <label :for="item.Code + '-' +$item.Code + '-PFEFDIET-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items, $item)">{{__label($item)}}</label>
                                  </span>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFSDI0-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFSDI0-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFSDI0-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFSDI0-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFSDI0-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFRHH0-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFRHH0-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFRHH0-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFRHH0-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFRHH0-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFMFHH-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFMFHH-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMFHH-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMFHH-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFMFHH-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFISPR-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFISPR-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFISPR-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFISPR-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFISPR-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items[0].Value === true" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFIVSI-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFIVSI-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFIVSI-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFIVSI-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFIVSI-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFHORE-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFHORE-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFHORE-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFHORE-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFHORE-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFPRAR-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFPRAR-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPRAR-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPRAR-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFPRAR-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFNUCA-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFNUCA-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFNUCA-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFNUCA-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFNUCA-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFSEUB-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFSEUB-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFSEUB-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFSEUB-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFSEUB-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFMCIS-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFMCIS-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMCIS-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMCIS-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFMCIS-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- Kết quả phẫu thuật, thủ thuật -->
                        <div v-if="MASTERDATA[item.Code + '-PFEFPSF-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFPSF-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPSF-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPSF-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFPSF-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTTT-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTTT-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTTT-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTTT-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTTT-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFCIA-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFCIA-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFCIA-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFCIA-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFCIA-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFUEIA-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFUEIA-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFUEIA-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFUEIA-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFUEIA-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFPATOA-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFPATOA-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPATOA-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFPATOA-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFPATOA-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFROSAPO-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFROSAPO-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFROSAPO-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFROSAPO-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFROSAPO-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items[0].Value === true" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- ./ -->
                        <div v-if="MASTERDATA[item.Code + '-PFEFLIMO-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFLIMO-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFLIMO-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFLIMO-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFLIMO-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFMAN0-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFMAN0-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMAN0-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMAN0-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFMAN0-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFEAMO-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFEAMO-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFEAMO-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFEAMO-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFEAMO-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFMSAW-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFMSAW-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMSAW-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFMSAW-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFMSAW-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFORS0-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFORS0-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFORS0-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFORS0-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFORS0-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFHTTC-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFHTTC-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFHTTC-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFHTTC-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFHTTC-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFHTTH-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFHTTH-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFHTTH-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFHTTH-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFHTTH-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFWAHT-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFWAHT-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFWAHT-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFWAHT-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFWAHT-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFFUW0-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFFUW0-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFFUW0-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items[0].Value === true" >
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFFUW0-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFFUW0-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <input :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items[0].Value === true" type="text" class="v-input-sm form-control" v-model="$item.Value" />
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTDOT-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio -no-flex">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTDOT-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDOT-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio') && MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items[0].Value === true">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDOT-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTDOT-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text') && MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items[0].Value === true" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTDO1-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex2">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO1-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTDO1-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO1-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO1-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTDO1-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTDO1-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text')" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTDO2-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex2">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO2-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTDO2-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO2-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO2-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTDO2-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTDO2-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text')" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTDO3-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex2">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO3-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTDO3-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO3-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO3-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTDO3-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTDO3-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text')" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTDO4-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex2">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO4-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTDO4-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO4-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO4-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTDO4-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTDO4-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text')" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div v-if="MASTERDATA[item.Code + '-PFEFTDO5-' + ind]" class="row mg-bt-20">
                          <div class="col-md-12">
                            <div class="group-radio no-flex2">
                              <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO5-' + ind].Items">
                                <span :key="$index" v-if="checkString($item.DataType, 'CheckBox')">
                                  <label class="container-checkbox" :for="item.Code + '-' +$item.Code + '-PFEFTDO5-' + ind+'-checkbox-' + $index">{{__label($item)}}
                                    <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO5-' + ind+'-checkbox-' + $index" v-model="$item.Value">
                                    <span class="checkmark"></span>
                                  </label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'Radio')">
                                  <input type="checkbox" :id="item.Code + '-' +$item.Code + '-PFEFTDO5-' + ind+'-radio-' + $index" v-model="$item.Value">
                                  <label :for="item.Code + '-' +$item.Code + '-PFEFTDO5-' + ind + '-radio-' + $index" @click="checkbox2Radio2(MASTERDATA[item.Code + '-PFEFTDO5-' + ind].Items, $item)">{{__label($item)}}</label>
                                </span>
                                <span :key="$index" v-if="checkString($item.DataType, 'text')" style="flex-grow: 1;margin-right: 15px;">
                                  <p class="label-text" v-if="isReadonly(item, it, ind)">{{$item.Value}}</p>
                                  <textarea-autosize :resized="resized" :placeholder="__label($item)" v-else class="form-control" v-model="$item.Value" />
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                        <p v-if="(Version >= 10) && it.CreatedBy" class="text-right">
                          <Confirm
                            class="mt-10"
                            ref="Confirm"
                            :key="reset"
                            :MasterDataCode="VisitType === 'IPD' ? 'IPDGDSK' : 'A03_045_290422_VE'"
                            :FormCode="VisitType === 'IPD' ? 'IPDGDSK' : 'A03_045_290422_VE'"
                            :ReadOnly="(it.ConfirmCreated && it.ConfirmCreated.ConfirmAt)"
                            :AdInfo="[it.ConfirmCreated.ConfirmBy]"
                            :VisitId="_VisitId"
                            :FormId="it.Id"
                            :hideConfirm="hideConfirm"
                            :saveSuccesss="saveSuccesss"
                            @handleConfirm="mappingData('confirm')"
                            @confirmSuccess="getData()"
                          />
                        </p>
                        <p v-if="it.CreatedBy" class=""><b>{{__t('Tạo bởi')}}:</b> <ad-Info :ad="it.CreatedBy" /> {{__t('lúc')}} {{it.CreatedAt}}</p>
                        </div>
                        <div v-else>
                          <div v-if="MASTERDATA[item.Code + '-PFEFTOE-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <label class="group-radio-label">{{__label(MASTERDATA[item.Code + '-PFEFTOE-' + ind])}}: </label>
                          <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTOE-' + ind].Items" />
                          <div class="">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTOE-' + ind].Items">
                              <div :key="$index" v-if="checkString($item.DataType, 'text') && $item.Value">
                                <p class="label-text">{{$item.Value || 'N/A'}}</p>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFPCM-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <label class="group-radio-label">{{__label(MASTERDATA[item.Code + '-PFEFPCM-' + ind])}}: </label>
                          <MDRadioView :data="MASTERDATA[item.Code + '-PFEFPCM-' + ind].Items" />
                          <div class="group-radio no-flex">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFPCM-' + ind].Items">
                              <div :key="$index" v-if="checkString($item.DataType, 'text') && $item.Value">
                                <p class="label-text">{{$item.Value || 'N/A'}}</p>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <label>{{__t('Nội dung đã tư vấn')}}</label>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTPSA-' + ind] && MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items"/>
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTPSA-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFIFMN-' + ind] && MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFIFMN-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFMPPP-' + ind] && MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFMPPP-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFMIIP-' + ind] && MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFMIIP-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFIOHT-' + ind] && MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFIOHT-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFPEHY-' + ind] && MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFPEHY-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFWOCA-' + ind] && MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFWOCA-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFUCDC-' + ind] && MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFUCDC-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFFPS0-' + ind] && MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFFPS0-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFFUIN-' + ind] && MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFFUIN-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFDIET-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFDIET-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFSDI0-' + ind] && MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFSDI0-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFRHH0-' + ind] && MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFRHH0-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFMFHH-' + ind] && MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFMFHH-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFISPR-' + ind] && MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items"/>
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFISPR-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFIVSI-' + ind] && MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFIVSI-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFHORE-' + ind] && MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFHORE-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFPRAR-' + ind] && MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFPRAR-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFNUCA-' + ind] && MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFNUCA-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFSEUB-' + ind] && MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFSEUB-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFMCIS-' + ind] && MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFMCIS-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <!-- Kết quả phẫu thuật, thủ thuật -->
                      <div v-if="MASTERDATA[item.Code + '-PFEFPSF-' + ind] && MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFPSF-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTTT-' + ind] && MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTTT-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFCIA-' + ind] && MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFCIA-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFUEIA-' + ind] && MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFUEIA-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFPATOA-' + ind] && MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFPATOA-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFROSAPO-' + ind] && MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items"/>
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFROSAPO-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <!-- ./ -->
                      <div v-if="MASTERDATA[item.Code + '-PFEFLIMO-' + ind] && MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFLIMO-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFMAN0-' + ind] && MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFMAN0-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFEAMO-' + ind] && MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFEAMO-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFMSAW-' + ind] && MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFMSAW-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFORS0-' + ind] && MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFORS0-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFHTTC-' + ind] && MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFHTTC-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFHTTH-' + ind] && MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFHTTH-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFWAHT-' + ind] && MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFWAHT-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFFUW0-' + ind] && MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items"/>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFFUW0-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTDOT-' + ind] && MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items[0].Value === true" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <CheckboxsValue :data="MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items"/>
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTDOT-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTDO1-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO1-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTDO1-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTDO2-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO2-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTDO2-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTDO3-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO3-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTDO3-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTDO4-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO4-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTDO4-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <div v-if="MASTERDATA[item.Code + '-PFEFTDO5-' + ind]" class="row mg-bt-20">
                        <div class="col-md-12">
                          <div class="flex-box flex-center">
                            <template :data="$item"  v-for="($item, $index) in MASTERDATA[item.Code + '-PFEFTDO5-' + ind].Items">
                              <p :key="$index" class="label-text" v-if="checkString($item.DataType, 'text')">{{$item.Value || 'N/A'}}</p>
                            </template>
                            <MDRadioView :data="MASTERDATA[item.Code + '-PFEFTDO5-' + ind].Items" />
                          </div>
                        </div>
                      </div>
                      <p v-if="(Version >= 10) && it.CreatedBy" class="text-right">
                        <Confirm
                          class="mt-10"
                          ref="Confirm"
                          :key="reset"
                          :MasterDataCode="VisitType === 'IPD' ? 'IPDGDSK' : 'A03_045_290422_VE'"
                          :FormCode="VisitType === 'IPD' ? 'IPDGDSK' : 'A03_045_290422_VE'"
                          :ReadOnly="true"
                          :AdInfo="[it.ConfirmCreated && it.ConfirmCreated.ConfirmAt ? it.ConfirmBy : it.CreatedBy]"
                          :VisitId="_VisitId"
                          :FormId="it.Id"
                          />
                        </p>
                        <p v-if="it.CreatedBy" class=""><b>{{__t('Tạo bởi')}}:</b> <ad-Info :ad="it.CreatedBy" /> {{__t('lúc')}} {{it.CreatedAt}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="tabs-footer">
        <button class="btn v-yellow-btn pull-right long-btn" type="button" @click="mappingData()">{{__t('btn.luu')}}</button>
        <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
      </div> -->
      <div class="status-float-block" v-if="!viewOnly">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-md-2">
                  <div class="form-group1">
                    <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group1">
                    <!-- <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'OPDMedicalReport', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế')}}</button> -->
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group1">
                    <button class="btn v-yellow-btn pull-right long-btn" v-shortkey="['ctrl', 's']" @shortkey="mappingData()" type="button" @click="mappingData()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- <p v-if="Version === 1">A03_045_050919_VE</p>
        <p v-else>{{FormCode}}</p> -->
        <LastUpdateWithFormCode :FormCode="Version ? 'A03_045_050919_VE' : FormCode" :DataSubmit="DataSubmit"/>
      </div>
      </div>
      <!-- <logs :EdId="this.$route.params.Id" :Type="'PatientAndFamilyEducation'" /> -->
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import PatientAndFamilyEducation from '@/services/PatientAndFamilyEducation'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import Logs from '@/components/Logs.vue'
import $ from 'jquery'
import NProgress from 'nprogress'
import Confirm from '@/components/Form/Confirm'
import Ver2 from './ItemV2.vue'
import EIOService from '@/services/IPD/EIOService'
// import storage from '@/lib/storage'
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})
// import MixinForm from '@/mixins/form.js'
export default {
  /**
   * The name of the page.
   */
  name: 'PatientAndFamilyEducationView',
  props: ['formId', 'viewOnly'],
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      countVld: 0,
      DataSubmit: {},
      hideConfirm: false,
      reset: 0,
      saveSuccesss: false,
      Id: this.$route.params.Id,
      List: [],
      EducationalNeeds: [],
      GroupContents: [],
      Informations: [],
      itemPendingConfirm: null,
      newItems: [],
      loading: false,
      VisitType: 'ED',
      resized: true,
      Version: 10,
      FormCode: 'A03_045_290422_VE'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Logs, Confirm, Ver2
  },
  created () {
    var parrentRoute = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
    this.VisitType = parrentRoute.meta.VisitTypeGroupCode
    this.getVisitVersion()
    this.getData()
  },
  updated () {
    // this.getData()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.plan || !this.edited) {
      next()
      return
    }
    this.$modal.show('dialog', {
      title: this.$t('Cảnh báo!'),
      text: this.$t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
      class: 'v-dialog v-dialog-warning',
      buttons: [
        {
          title: this.$t('Đồng ý'),
          class: 'btn',
          handler: () => {
            next()
            this.$modal.hide('dialog')
          }
        },
        {
          title: this.$t('Hủy bỏ'),
          class: 'btn bg-yellow',
          handler: () => {
            next(false)
            this.$modal.hide('dialog')
          }
        }
      ]
    })
  },
  watch: {
    $route (to, from) {
      this.newItems = []
      this.getData()
    },
    MASTERDATA: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  computed: {
  },
  // mounted () {
  //   if (this.$el && this.$el.classList) {
  //     this.$el.classList.add('disable_ccp')
  //     // dragstart drop
  //     $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
  //       this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
  //       return false
  //     })
  //   }
  // },
  methods: {
    clearCheckBox (index) {
      if (index === 1) {
        this.MASTERDATA['PFEFSPCHTEXT'].Items[0].Value = ''
      }
      if (index === 2) {
        this.MASTERDATA['PFEFSPCHTEXT'].Items[1].Value = ''
      }
    },
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        // this.VisitVersion = response.Version
        this.Version = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    resizeTab () {
      this.resized = false
      setTimeout(() => {
        this.resized = true
      }, 100)
    },
    newTurn (item, parrent) {
      this.itemPendingConfirm = item
      this.itemPendingConfirm.parrent = parrent
      this.$modal.show('dialog', {
        title: this.$t('Bạn muốn tạo thêm luợt'),
        text: item.ViName,
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.newTurnConfirmed()
              this.itemPendingConfirm = null
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.$t('Hủy bỏ'),
            class: 'btn bg-yellow',
            handler: () => {
              this.itemPendingConfirm = null
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    newTurnConfirmed () {
      var item = this.itemPendingConfirm
      var index = item.Datas.length
      this.newEducationalNeeds(item.Code, index)
      item.Datas.push({
        ViName: 'Lần ' + (index + 1),
        EnName: 'Lần ' + (index + 1),
        Clinic: item.Code
      })
      this.newItems.push({
        Clinic: item.Code,
        index: index
      })
      setTimeout(() => {
        $("[href='#tabp" + item.Code + '-' + index + "']").click()
        // $("#collapse" + item.Code).click()
        if ($('#collapse' + item.Code).hasClass('collapsed')) {
          $('#collapse' + item.Code).click()
        }
      }, 10)
    },
    newEducationalNeeds (code, index) {
      var cloneMD = this.cloneObj(Object.filter(this.MASTERDATA, e => (e.grouped === code && e.index === (index - 1))))
      Object.keys(cloneMD).forEach(e => {
        cloneMD[e].index = index
        var item = this.cloneObj(cloneMD[e])
        item.Items.forEach($item => {
          $item.Value = null
        })
        this.$set(this.MASTERDATA, code + '-' + cloneMD[e].Code + '-' + index, item)
      })
    },
    selectEducationalNeeds () {
      var items = this.cloneObj(this.MASTERDATA['PFEFEN0'].Items).filter(item => item.Value)
      this.EducationalNeeds.forEach(need => {
        if (items.find(it => it.Code === need.Code)) {
          var index = need.Datas.length
          var allowNew = this.newItems.find(e => {
            return e.Clinic === need.Code
          })
          if (allowNew === undefined) {
            this.newEducationalNeeds(need.Code, index)
            need.Datas.push({
              ViName: 'Lần ' + (index + 1),
              EnName: 'Lần ' + (index + 1),
              Clinic: need.Code
            })
            this.newItems.push({
              Clinic: need.Code,
              index: index
            })
            setTimeout(() => {
              $("[href='#tabp" + need.Code + '-' + index + "']").click()
              if ($('#collapse' + need.Code).hasClass('collapsed')) {
                $('#collapse' + need.Code).click()
              }
              // $("#collapse" + need.Code).click()
            }, 10)
          }
        }
      })
      items.forEach(item => {
        if (!this.EducationalNeeds.find(need => need.Code === item.Code)) {
          var Datas = [{
            ViName: 'Lần 1',
            EnName: 'Lần 1',
            Clinic: item.Code
          }]
          var clone = this.cloneObj(item)
          this.newItems.push({
            Clinic: item.Code,
            index: 0
          })
          clone.Datas = Datas
          // this.EducationalNeeds.push(clone)
          this.EducationalNeeds.splice(this.getIndex4Inser(item.Order - 1), 0, clone)
          setTimeout(() => {
            $("[href='#tabp" + item.Code + '-' + 0 + "']").click()
            if ($('#collapse' + item.Code).hasClass('collapsed')) {
              $('#collapse' + item.Code).click()
            }
            // $("#collapse" + need.Code).click()
          }, 10)
        }
      })
      this.$modal.hide('Educational-needs')
      this.resetSelected()
    },
    getIndex4Inser (index) {
      if (index < 1) {
        return 0
      }
      var cloneObj = this.cloneObj(this.EducationalNeeds)
      var newIndex = _.findIndex(cloneObj, e => {
        return e.Order > index
      })
      // var newIndex = 0
      // var clo = this.cloneObj(this.EducationalNeeds)
      // for (let $i = 0; $i < clo.length; $i++) {
      //   const element = clo[$i]
      //   console.log(newIndex, index, element.Order)
      //   if (element.Order >= index) {
      //     console.log(newIndex)
      //     newIndex = $i
      //     break
      //   }
      // }
      // this.EducationalNeeds.findIndex(e => e.Order >= index)
      return newIndex > 0 ? newIndex : cloneObj.length
    },
    selectEducationalNeeds_ () {
      var items = this.MASTERDATA['PFEFEN0'].Items
      var tmp = items.map(e => {
        // add
        var exited = _.find(this.EducationalNeeds, {Code: e.Code})
        if (e.Value) {
          // selected
          if (exited) {
            // update => pass
            e = exited
          } else {
            e.Datas = [{
              ViName: 'Lần 1',
              EnName: 'Lần 1',
              Clinic: e.Code
            }]
          }
        } else {
          // not select
          if (exited) {
            // remove
            // e.Datas = null
          }
          // e.Datas = null
        }
        return e
      })
      this.EducationalNeeds = this.cloneObj(tmp.filter(e => e.Value))
      this.$modal.hide('Educational-needs')
    },
    setEducationalNeeds (update) {
      var tmpObj = this.cloneObj(this.MASTERDATA['PFEFEN0'])
      tmpObj.Items.forEach(e => {
        if (this.GroupContents[e.Code]) {
          e.Value = true
        }
      })
      var selected = this.cloneObj(tmpObj.Items).filter(e => e.Value === true)
      var tmp = selected.map(e => {
        if (this.GroupContents[e.Code] && this.GroupContents[e.Code].Contents) {
          this.GroupContents[e.Code].Contents.forEach((content, $i) => {
            content.ViName = 'Lần ' + ($i + 1)
            content.EnName = 'Lần ' + ($i + 1)
            content.Clinic = e.Code
          })
          e.LastUpdatedBy = this.GroupContents[e.Code].LastUpdatedBy
          e.LastUpdatedAt = this.GroupContents[e.Code].LastUpdatedAt
          e.Datas = this.cloneObj(this.GroupContents[e.Code].Contents)
        } else {
          if (update) {
            e.Datas.push({
              ViName: 'Lần 1',
              EnName: 'Lần 1',
              Clinic: e.Code
            })
          } else {
            e.Datas = [{
              ViName: 'Lần 1',
              EnName: 'Lần 1',
              Clinic: e.Code
            }]
          }
        }
        return e
      })
      this.EducationalNeeds = this.cloneObj(tmp)
      this.resetSelected()
    },
    resetSelected () {
      this.MASTERDATA['PFEFEN0'].Items.forEach(i => {
        // i.Value = false
        i.Value = ''
      })
    },
    getData () {
      this.loading = true
      if (this.$route.params.Item === 'new') {
        this.getNewData()
      } else {
        this.getRawMasterDatas({Form: 'PFEF'}, mdata => {
          new PatientAndFamilyEducation({VisitType: this.VisitType}).find(`${this.FormCode}/` + this.$route.params.Id + '/' + (this.formId || this.$route.params.Item)).then(response => {
            this.reset = this.reset + 1
            this.DataSubmit = response
            console.log('☣️ ~ newPatientAndFamilyEducation ~ this.Version', this.Version)
            this.Informations = response.Informations
            this.GroupContents = response.GroupContents
            mdata.forEach(item => {
              if (item.Clinic) {
                var clinics = item.Clinic.split(',')
                clinics.forEach(clinic => {
                  if (this.GroupContents[clinic] && this.GroupContents[clinic].Contents) {
                    this.GroupContents[clinic].Contents.forEach((content, index) => {
                      var clone = this.cloneObj(item)
                      clone.grouped = clinic
                      clone.index = index
                      clone.Items.forEach(chil => {
                        var code = chil.Code
                        var exited = _.find(content.Datas, {Code: code})
                        if (exited) {
                          if (this.checkString(chil.DataType, 'CheckBox') || this.checkString(chil.DataType, 'Radio')) {
                            var isTrue = this.checkString(exited.Value, 'True')
                            chil.Value = isTrue
                          } else {
                            chil.Value = exited.Value
                          }
                        }
                      })
                      this.$set(this.MASTERDATA, clinic + '-' + item.Code + '-' + index, clone)
                    })
                  } else {
                    var clone = this.cloneObj(item)
                    clone.grouped = clinic
                    clone.index = 0
                    this.$set(this.MASTERDATA, clinic + '-' + item.Code + '-' + '0', clone)
                  }
                })
              } else {
                item.grouped = 'normal'
                item.Before = []
                item.hasDifferent = false
                item.After = []
                item.Items.forEach(chil => {
                  var code = chil.Code
                  var exited = _.find(this.Informations, {Code: code})
                  if (exited) {
                    if (this.checkString(chil.DataType, 'CheckBox') || this.checkString(chil.DataType, 'Radio')) {
                      var isTrue = this.checkString(exited.Value, 'True')
                      chil.Value = isTrue
                    } else {
                      chil.Value = exited.Value
                    }
                  }
                })
                item.readonly = false
                this.$set(this.MASTERDATA, item.Code, item)
              }
            })
            setTimeout(() => {
              this.setEducationalNeeds()
              this.loading = false
            }, 10)
            setTimeout(() => {
              this.edited = false
            }, 500)
          })
        })
      }
    },
    PFEFDIETShowHide (items) {
      var finded = items.find(e => {
        return e.Value === true && this.checkString(e.DataType, 'CheckBox')
      })
      return finded
    },
    allowNew (item) {
      var finded = this.newItems.find(e => {
        return e.Clinic === item.Code
      })
      return finded === undefined
    },
    isConfirmItem (it) {
      if (it.ConfirmCreated && it.ConfirmCreated.ConfirmAt) {
        return true
      } else {
        return false
      }
    },
    isReadonly (item, it, ind) {
      // if (it.ConfirmCreated && it.ConfirmCreated.ConfirmAt) {
      //   return 'true'
      // }
      var finded = this.newItems.find(e => {
        return e.Clinic === item.Code && ind === e.index
      })
      return finded === 'undefined'
    },
    checkbox2Radio2 (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          // if (this.checkString(element.DataType, 'Text')) {
          //   element.Value = ''
          // }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
        }
      })
    },
    resetGroup (items, item) {
      setTimeout(() => {
        items.forEach(element => {
          if (element.Code !== item.Code && !item.Value) {
            if (this.checkString(element.DataType, 'Radio')) {
              // element.Value = false
              element.Value = ''
            }
            if (this.checkString(element.DataType, 'Text')) {
              element.Value = ''
            }
            if (this.checkString(element.DataType, 'Select')) {
              element.Value = ''
            }
          }
        })
      }, 10)
    },
    getNewData () {
      this.getRawMasterDatas({Form: 'PFEF'}, mdata => {
        this.Version = 2
        this.Informations = []
        this.GroupContents = {}
        mdata.forEach(item => {
          if (item.Clinic) {
            var clinics = item.Clinic.split(',')
            clinics.forEach(clinic => {
              if (this.GroupContents[clinic] && this.GroupContents[clinic].Contents) {
                this.GroupContents[clinic].Contents.forEach((content, index) => {
                  var clone = this.cloneObj(item)
                  clone.grouped = clinic
                  clone.index = index
                  clone.Items.forEach(chil => {
                    var code = chil.Code
                    var exited = _.find(content.Datas, {Code: code})
                    if (exited) {
                      if (this.checkString(chil.DataType, 'CheckBox') || this.checkString(chil.DataType, 'Radio')) {
                        var isTrue = this.checkString(exited.Value, 'True')
                        chil.Value = isTrue
                      } else {
                        chil.Value = exited.Value
                      }
                    }
                  })
                  this.$set(this.MASTERDATA, clinic + '-' + item.Code + '-' + index, clone)
                })
              } else {
                var clone = this.cloneObj(item)
                clone.grouped = clinic
                clone.index = 0
                this.$set(this.MASTERDATA, clinic + '-' + item.Code + '-' + '0', clone)
              }
            })
          } else {
            item.grouped = 'normal'
            item.Before = []
            item.hasDifferent = false
            item.After = []
            item.Items.forEach(chil => {
              var code = chil.Code
              var exited = _.find(this.Informations, {Code: code})
              if (exited) {
                if (this.checkString(chil.DataType, 'CheckBox') || this.checkString(chil.DataType, 'Radio')) {
                  var isTrue = this.checkString(exited.Value, 'True')
                  chil.Value = isTrue
                } else {
                  chil.Value = exited.Value
                }
              }
            })
            this.$set(this.MASTERDATA, item.Code, item)
          }
        })
        setTimeout(() => {
          this.setEducationalNeeds()
          this.loading = false
        }, 10)
        setTimeout(() => {
          this.edited = false
        }, 500)
      })
    },
    mappingData (confirm) {
      NProgress.start()
      // this.Informations = response.Informations
      // this.GroupContents = response.GroupContents
      var submitData = {
        Id: this.$route.params.Item === 'new' ? null : this.$route.params.Item,
        Informations: [],
        GroupContents: {}
      }
      var Informations = Object.filter(this.MASTERDATA, e => (e.grouped === 'normal'))
      for (const property in Informations) {
        if (Informations[property].Items) {
          Informations[property].Items.forEach(item => {
            var exited = _.find(this.Informations, {Code: item.Code})
            submitData.Informations.push({
              Code: item.Code,
              Value: item.Value,
              Id: exited ? exited.Id : null
            })
          })
        }
      }
      this.EducationalNeeds.forEach(need => {
        var code = need.Code
        if (!submitData.GroupContents[code]) {
          this.$set(submitData.GroupContents, code, {
            Contents: []
          })
        }
        need.Datas.forEach((content, index) => {
          var GroupContents = Object.filter(this.MASTERDATA, e => (e.grouped === code && e.index === index))
          var datas = []
          for (const property in GroupContents) {
            GroupContents[property].Items.forEach(item => {
              datas.push({
                Code: item.Code,
                Value: item.Value,
                Id: item.Id
              })
            })
          }
          var newContent = {
            Id: content.Id,
            Datas: datas
          }
          submitData.GroupContents[code].Contents.push(newContent)
        })
      })
      setTimeout(() => {
        new PatientAndFamilyEducation({VisitType: this.VisitType}).update(`/${this.FormCode}/` + this.$route.params.Id, submitData).then(response => {
          if (confirm === 'confirm') {
            this.toastedSuccess()
            this.saveSuccesss = !this.saveSuccesss
          } else {
            this.edited = false
            this.toastedSuccess()
            setTimeout(() => {
              this.reload()
            }, 100)
          }
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          // this.toastedSuccess()
          // EventBus.$emit('updateGlobalEd', 'thangdc in here')
          // setTimeout(() => {
          //   this.reload()
          // }, 100)
          // this.reload()
        })
      }, 1000)
    }
  }
}
</script>
<style scoped>
  .checkBorder {
    border-color: red
  }
</style>
