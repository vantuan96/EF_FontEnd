<template>
  <div class="page-table-vital">
    <div class="box-table mrb30">
      <table v-if="listItems.length > 0" v-dragscroll.x="true" @mousedown="cursorGrap = false" @mouseup="cursorGrap = true" :class="{'cursor-grapbing': !cursorGrap, 'cursor-grap': cursorGrap }" class="standing-order-tbl table-hover">
      <!-- <table> -->
        <tr>
          <th style="min-width: 180px;" colspan="2" class="no-wrap table-head">Ngày/giờ thực hiện</th>
          <td></td>
          <td class="text-center" v-for="(item, index) in listItems" :key="index">
            <button class="btn v-yellow-btn btn-edit" v-if="$store.state.account.Username === item.CreatedBy && hasRole('IPDEDIT13NHI') && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button>
          </td>
        </tr>
        <tr>
          <th colspan="2" class="table-head">Dấu hiệu</th>
          <th class="table-head">PEWS</th>
          <td class="text-center" v-for="(item, index) in listItems" :key="index">
            {{item.TransactionDate | formatDateWithoutSecon}}
          </td>
        </tr>
        <!-- Nhip tho -->
        <tr class="text-center">
          <th class="text-center no-wrap table-head__sticky" rowspan="8">
            <b>Nhịp thở (*)</b>
            <p class="font-normal">(Lần/ phút)</p>
            <v-popover :placement="'right'" :trigger="'click'">
              <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
              <template slot="popover">
                <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Breath'"/>
              </template>
            </v-popover>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 55</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 55">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">50-54</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 50 && item <= 54">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">40-49</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 40 && item <= 49">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">30-39</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 30 && item <= 39">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">20-29</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 60 && item <= 29">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">15-19</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 15 && item <= 19">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">10-14</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 10 && item <= 14">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item <= 9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- SpO2 -->
        <tr class="text-center">
          <th class="text-center no-wrap table-head__sticky" rowspan="4">
            <b>SpO<sub>2</sub></b>
            <p class="font-normal">(%)</p>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 95</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 >= 95">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">90 - 94</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 >= 90 && item.Spo2 <= 94">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">85-89</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 >= 85 && item.Spo2 <= 89">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 84</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 <= 84">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Huyet ap -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="7">
            <b>Huyết áp</b>
            <p class="font-normal">(mmHg)</p>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 150</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa >= 150">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">120-149</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa >= 120 && item.HuyetApToiDa <= 149">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">110-119</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa >= 110 && item.HuyetApToiDa <= 119">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">85-109</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa >= 85 && item.HuyetApToiDa <= 109">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">80-84</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa >= 80 && item.HuyetApToiDa <= 84">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">70-79</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa >= 70 && item.HuyetApToiDa <= 79">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 69</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HuyetApToiDa <= 69">{{item.HuyetApToiDa}} {{item.HuyetApToiThieu ? `/ ${item.HuyetApToiThieu}` : ''}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Mạch -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="13">
            <b>Mạch (*)</b>
            <p class="font-normal">(Nhịp/ phút)</p>
            <v-popover :placement="'right'" :trigger="'click'">
              <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
              <template slot="popover">
                <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Pulse'"/>
              </template>
            </v-popover>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 170</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 170">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">160-169</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 160 && item <= 169">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">150-159</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 150 && item <= 159">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">140-149</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 140 && item <= 149">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">130-139</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 130 && item <= 139">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">120-129</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 120 && item <= 129">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">110-119</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 110 && item <= 119">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">100-109</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 100 && item <= 109">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">90-99</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 90 && item <= 99">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">85-89</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 85 && item <= 89">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">80-84</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 80 && item <= 84">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">70-79</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 70 && item <= 79">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 69</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item <= 69">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Thân nhiệt -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="10">
            <b>Thân nhiệt (*)</b>
            <p class="font-normal">(<sup>o</sup>C)</p>
            <v-popover :placement="'right'" :trigger="'click'">
              <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
              <template slot="popover">
                <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Temperature'"/>
              </template>
            </v-popover>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 41</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 41">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">40-40.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 40 && item <= 40.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">39-39.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 39 && item <= 39.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">38.5-38.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 38.5 && item <= 38.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">38-38.4</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 38 && item <= 38.4">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">37-37.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 37 && item <= 37.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">36-36.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 36 && item <= 36.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">35.5-35.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 35.5 && item <= 35.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">35-35.4</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 35 && item <= 35.4">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#60; 35</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item < 35">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Tri giác -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="4">
            <b>Tri giác</b>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">A (13-15)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'A'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">V (9-12)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'V'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">P (6-8)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'P'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">U (&#60; 5)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'U'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th :colspan="Math.ceil((listVitalSign.length - 1) / 2) + 3">
            <p class="mb-0 font-bold">Cộng thêm vào điểm PEWS 2 điểm nếu NB có thở oxy hỗ trợ</p>
          </th>
          <th :colspan="listVitalSign.length - Math.ceil((listVitalSign.length - 1) / 2)">
            <p class="mb-0 font-bold">Ký hiệu thời điểm đo đường máu toàn phần: Trước bữa ăn sáng(T1)/trưa(T2)/tối(T3) - Sau bữa ăn sáng(S1)/trưa(S2)/tối(S3) </p>
          </th>
        </tr>
        <!-- Tổng PEWS -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Tổng PEWS</b>
          </th>
          <td :class="getColor(item.MEWSTotal)" v-for="(item, index) in listItems" :key="index">
            <span>{{item.MEWSTotal}}</span>
          </td>
        </tr>
        <!-- Điểm đau -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Điểm đau</b>
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DiemDau1">{{item.DiemDau1}}-{{item.DiemDau2}}</span>
          </td>
        </tr>
        <!-- ĐD ghi tên -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>ĐD ghi tên</b>
          </th>
          <td v-for="(item, index) in listItems" :key="index">
            <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
          </td>
        </tr>
        <tr>
          <th class="text-center" :colspan="Math.ceil((listVitalSign.length - 1) / 2) + 3">
            <p class="mb-0 font-bold"><span class="font-bold font-italic">Ký hiệu dịch vào:</span>&emsp; T_Thuốc &emsp; P_Đạm, dịch nuôi dưỡng &emsp; M_Máu và chế phẩm &emsp; S_Sữa &emsp; AN_Ăn uống &emsp; D_Dịch truyền</p>
          </th>
          <th class="text-center" :colspan="listVitalSign.length - Math.ceil((listVitalSign.length - 1) / 2)">
            <p class="mb-0 font-bold"><span class="font-italic">Ký hiệu dịch ra:</span>&emsp; N_Nôn &emsp; Ph_Phân &emsp; NT_Nước tiểu &emsp; DL_Dẫn lưu</p>
          </th>
        </tr>
        <!-- Hỗ trợ hô hấp -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="2">
            <b>Hỗ trợ hô hấp</b>
          </th>
          <th class="text-center table-head__sticky table-head__sticky--row1">
            <b>Oxy mask</b>
          </th>
          <th style="font-size: 18px;" class="text-center table-head__sticky table-head__sticky--row2">
            &#8594;
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HoTroHoHap === 'Oxy mask'">{{item.HoTroHoHap}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="text-center table-head__sticky table-head__sticky--row1">
            <b>Oxy kính</b>
          </th>
          <th style="font-size: 18px;" class="text-center table-head__sticky table-head__sticky--row2">
            &#8594;
          </th>
          <td v-for="(item, index) in listItems" :key="index">
            <span v-if="item.HoTroHoHap === 'Oxy kính'">{{item.HoTroHoHap}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Đường máu toàn phần -->
        <tr class="text-center">
          <th class="no-wrap table-head__sticky" rowspan="2">
            <b>Đường máu toàn phần</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row1">
            <p class="mb-0">Khoảng tham chiếu</p>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            Thời điểm
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DuongMauToanPhan1">{{item.DuongMauToanPhan1}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="text-center font-normal table-head__sticky table-head__sticky--row1">
            <p class="mb-0 no-wrap">T: 4.4 - 7.2 mmol/L</p>
            <p class="mb-0">S: &#60; 10 mmol/L</p>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            Kết quả
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DuongMauToanPhan2">{{item.DuongMauToanPhan2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Đánh giá ven truyền (VIP Score) -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Đánh giá ven truyền (VIP Score)</b>
          </th>
          <td style="max-width: 102px; vertical-align: unset" :class="getColorXuTri(item.DanhGiaVeinTruyen)" v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DanhGiaVeinTruyen">{{item.DanhGiaVeinTruyen}} -
              <span v-tooltip="item.DanhGiaVeinTruyenDesc"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
            </span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Số lượng dịch vào -->
        <tr>
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b class="text-center mb-0">Số lượng dịch vào (ml)</b>
          </th>
          <td style="vertical-align: unset" v-for="(item, index) in FluidIn" :key="index">
            <span>{{item}}</span>
          </td>
        </tr>
        <!-- Tổng dịch vào -->
        <tr>
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b class="text-center mb-0">Tổng dịch vào (ml)</b>
          </th>
          <td class="text-center" style="vertical-align: unset" v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TongDichVao">{{item.TongDichVao}} ml</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Số lượng dịch ra -->
        <tr>
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b class="text-center mb-0">Số lượng dịch ra (ml)</b>
          </th>
          <td style="vertical-align: unset" v-for="(item, index) in FluidOut" :key="index">
            <span v-if="item">{{item}}</span>
          </td>
        </tr>
        <!-- Tổng dịch ra -->
        <tr>
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b class="text-center mb-0">Tổng dịch ra (ml)</b>
          </th>
          <td class="text-center" style="vertical-align: unset" v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TongDichRa">{{item.TongDichRa}} ml</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Bilan dịch -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Bilan dịch</b>
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.BilanDich">{{`${item.BilanDich} ml`}}</span>
            <span v-else></span>
          </td>
        </tr>
      </table>
      <table v-else class="standing-order-tbl">
        <tr class="text-center">
          <td>{{__t('Không có dữ liệu')}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import PageChart from '@/components/IPD/VitalSigns/PediatricChart.vue'
import PageChartV2 from '@/components/IPD/VitalSigns/PediatricChartV2.vue'
import IPDPediatricVitalSign from '@/services/IPD/PediatricVitalSigns'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
import { cloneDeep } from 'lodash'
export default {
  name: 'TableForm',
  components: { PageChart, PageChartV2 },
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    IsLocked: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    },
    FormType: {
      type: String,
      default: 'IPDPediatricVitalSign'
    },
    FormCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cursorGrap: true,
      DataChart: {},
      listItems: [],
      listVitalSign: [],
      labelsNhipTho: [],
      labelsMach: [],
      labelsThanNhiet: [],
      loaded: false,
      params: {
        IPDId: '',
        FormCode: this.FormCode,
        Assessor: this.$store.state.account.Username,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  computed: {
    FluidIn () {
      let FluidIn = []
      this.listVitalSign.map(item => {
        let text = ''
        if (item.SoLuongDichVaoT) {
          text += ` T(${item.SoLuongDichVaoT} ml),`
        }
        if (item.SoLuongDichVaoP) {
          text += ` T(${item.SoLuongDichVaoP} ml),`
        }
        if (item.SoLuongDichVaoM) {
          text += ` T(${item.SoLuongDichVaoM} ml),`
        }
        if (item.SoLuongDichVaoS) {
          text += ` T(${item.SoLuongDichVaoS} ml),`
        }
        if (item.SoLuongDichVaoAN) {
          text += ` T(${item.SoLuongDichVaoAN} ml),`
        }
        if (item.SoLuongDichVaoD) {
          text += ` T(${item.SoLuongDichVaoD} ml),`
        }
        if (text.lastIndexOf(',')) text = text.substring(0, text.length - 1)
        FluidIn.push(text)
      })
      return FluidIn
    },
    FluidOut () {
      let FluidOut = []
      this.listVitalSign.map(item => {
        let text = ''
        if (item.SoLuongDichRaSD) {
          text += ` T(${item.SoLuongDichRaSD} ml),`
        }
        if (item.SoLuongDichRaN) {
          text += ` T(${item.SoLuongDichRaN} ml),`
        }
        if (item.SoLuongDichRaPh) {
          text += ` T(${item.SoLuongDichRaPh} ml),`
        }
        if (item.SoLuongDichRaNT) {
          text += ` T(${item.SoLuongDichRaNT} ml),`
        }
        if (item.SoLuongDichRaDL) {
          text += ` T(${item.SoLuongDichRaDL} ml),`
        }
        if (text.lastIndexOf(',')) text = text.substring(0, text.length - 1)
        FluidOut.push(text)
      })
      return FluidOut
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadPediatricChart', this.init)
    EventBus.$on('reloadTablePediatricVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadPediatricChart')
    EventBus.$off('reloadTablePediatricVitalSigns')
  },
  methods: {
    init (val) {
      console.log('getData ~ PediatricChart')
      this.loaded = false
      this.params.IPDId = this._VisitId
      if (this.viewOnly) {
        this.params = {
          IPDId: this._VisitId,
          FormCode: this.FormCode,
          Assessor: '',
          FromDate: '',
          ToDate: ''
        }
      }
      if (val) {
        this.params = {
          IPDId: this._VisitId,
          FormCode: this.FormCode,
          Assessor: val.Assessor,
          FromDate: val.FromDate,
          ToDate: val.ToDate
        }
      }
      if (!this.$route.params.Id) return
      if (this.FormType === 'IPDPediatricVitalSign') {
        new IPDPediatricVitalSign(this.params).find('All/').then(response => {
          if (response) {
            this.loaded = true
            this.getDataChart(response)
          }
        }).catch(e => {
          this.loaded = true
        })
      }
    },
    async getDataChart (response) {
      this.listItems = []
      this.listVitalSign = []
      if (response) {
        this.DataChart = await response
        this.labelsNhipTho = this.DataChart.NhipThoMEWS.map(d => d.MEWRate)
        this.labelsMach = this.DataChart.MachMEWS.map(d => d.MEWRate)
        this.labelsThanNhiet = this.DataChart.ThanNhietMEWS.map(d => d.MEWRate)
      }
      if (response.listItems) {
        this.listItems = await cloneDeep(response.listItems)
        this.listItems.map(item => {
          this.listVitalSign.push(item.VitalSign)
        })
      }
    },
    getColor (num) {
      let colorClass = ''
      if (num === '' || num === null) {
        colorClass = ''
      }
      if (num <= 2 && num >= 0 && num !== '' && num !== null) {
        colorClass = 'color-blue2'
      }
      if (num <= 4 && num >= 3) {
        colorClass = 'color-green3'
      }
      if (num < 7 && num >= 5) {
        colorClass = 'color-yellow3'
      }
      if (num >= 7) {
        colorClass = 'color-red3'
      }
      return colorClass
    },
    getColorXuTri (num) {
      let color = ''
      if (num) {
        if (num === '00') {
          color = 'colorGreen'
        } else if (num === '01') {
          color = 'colorYellow'
        } else {
          color = 'colorRed'
        }
      }
      return color
    },
    handleEdit (id) {
      this.$emit('editId', id)
    }
  }
}
</script>
<style scoped>
.standing-order-tbl td {
  cursor: unset !important;
}
.chart-wrapper {
  display: block;
  position: absolute;
  width: 900px;
  background-color: #fefefe;
  border: 1px solid #cecece;
  top: -10%;
  left: 60%;
  z-index: 1000;
}
.tooltip-chart {
  padding: 10px;
  cursor: pointer;
}
.tooltip-chart:hover + .chart-wrapper {
  display: block;
}
.table-hover {
  overflow-x: hidden;
  overflow-y: hidden;
  display: inline-block;
  position: relative;
  z-index: 1;
}
.table-hover td,
.table-hover th {
  position: relative;
}
.table-hover th {
  text-align: center;
  background-color: #fff;
  color: #000;
}
/* Row */
.table-hover td:hover::before {
  background-color: #f4f4f4;
  content: "\00a0";
  height: 100%;
  left: -5000px;
  position: absolute;
  top: 0;
  width: 10000px;
  z-index: -1;
}
/* Column */
.table-hover td:hover::after {
  background-color: #f4f4f4;
  content: "\00a0";
  height: 10000px;
  left: 0;
  position: absolute;
  top: -5000px;
  width: 100%;
  z-index: -1;
}
.table-hover .table-head {
  background-color: #337ab7;
  color: #fff;
  padding: 7px;
  border: 1px solid #ccc;
}
.table-head__sticky {
  position: sticky !important;
  left: 0;
  box-shadow: 10px 0 5px -2px #888;
  z-index: 1;
}
.table-head__sticky--row1 {
  left: 166px !important;
}
.table-head__sticky--row2 {
  left: 297px !important;
}
.cursor-grap {
  cursor: url('/static/icons/openhand.cur'), auto;
  /* cursor: grab; */
}
.cursor-grapbing {
  cursor: url("/static/icons/closedhand.cur"), auto;
  /* cursor: grabbing; */
}
.color-blue2 {
  background: #9FC5F8;
}
.color-green3 {
  background: #93C47D;
}
.color-yellow3 {
  background: #FFD966;
}
.color-red3 {
  background: #E06666;
}
.colorGreen {
  background: #43A286 !important;
  color: #FFF;
}
.colorYellow {
  background: #F4C74C !important;
  color: #FFF;
}
.colorRed {
  background: #E6472D !important;
  color: #FFF;
}
</style>
