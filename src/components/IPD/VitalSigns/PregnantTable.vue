<template>
  <div>
    <table v-if="listItems.length > 0" v-dragscroll.x="true" @mousedown="cursorGrap = false" @mouseup="cursorGrap = true" :class="{'cursor-grapbing': !cursorGrap, 'cursor-grap': cursorGrap }" class="standing-order-tbl table-hover">
    <!-- <table> -->
      <tr>
        <th style="min-width: 180px;" colspan="2" class="no-wrap table-head">Ngày/giờ thực hiện</th>
        <td></td>
        <td class="text-center" v-for="(item, index) in listItems" :key="index">
          <button class="btn v-yellow-btn btn-edit" v-if="$store.state.account.Username === item.CreatedBy && hasRole('VSFPW4') && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button>
        </td>
      </tr>
      <tr>
        <th colspan="2" class="table-head">Dấu hiệu</th>
        <th class="table-head text-center">MEWS</th>
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
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 35</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item > 35">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">30-34</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item >= 30 && item <= 34">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">25-29</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item >= 25 && item <= 29">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">20-24</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item >= 20 && item <= 24">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">15-19</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item >= 15 && item <= 19">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">10-14</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item >= 10 && item <= 14">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">6-9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item >= 6 && item <= 9">{{item}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 5</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in labelsNhipTho" :key="index">
          <span v-if="item <= 5">{{item}}</span>
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
          <span v-if="item.Spo2 >= 95">{{item.Spo2 ? item.Spo2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-94</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Spo2 >= 90 && item.Spo2 <= 94">{{item.Spo2 ? item.Spo2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">85-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Spo2 >= 85 && item.Spo2 <= 89">{{item.Spo2 ? item.Spo2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 84</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Spo2 <= 84">{{item.Spo2 ? item.Spo2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Huyet ap toi da -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" rowspan="6">
          <b>Huyết áp</b>
          <p class="font-normal">(mmHg)</p>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 180</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiDa >= 180">{{item.HuyetApToiDa ? item.HuyetApToiDa : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">160-179</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiDa >= 160 && item.HuyetApToiDa <= 179">{{item.HuyetApToiDa ? item.HuyetApToiDa : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">150-159</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiDa >= 150 && item.HuyetApToiDa <= 159">{{item.HuyetApToiDa ? item.HuyetApToiDa : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-149</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiDa >= 90 && item.HuyetApToiDa <= 149">{{item.HuyetApToiDa ? item.HuyetApToiDa : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">80-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiDa >= 80 && item.HuyetApToiDa <= 89">{{item.HuyetApToiDa ? item.HuyetApToiDa : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 79</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiDa <= 79">{{item.HuyetApToiDa ? item.HuyetApToiDa : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Huyet ap toi thieu -->
      <tr class="text-center">
        <th class="no-wrap text-center" rowspan="5">
          <b>Huyết áp tối thiểu</b>
          <p class="font-normal">(mmHg)</p>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 110</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiThieu >= 110">{{item.HuyetApToiThieu ? item.HuyetApToiThieu : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">100-109</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiThieu >= 100 && item.HuyetApToiThieu <= 109">{{item.HuyetApToiThieu ? item.HuyetApToiThieu : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-99</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiThieu >= 90 && item.HuyetApToiThieu <= 99">{{item.HuyetApToiThieu ? item.HuyetApToiThieu : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">45-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiThieu >= 45 && item.HuyetApToiThieu <= 89">{{item.HuyetApToiThieu ? item.HuyetApToiThieu : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 45</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.HuyetApToiThieu <= 45">{{item.HuyetApToiThieu ? item.HuyetApToiThieu : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Mạch -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" rowspan="12">
          <b>Mạch (*)</b>
          <p class="font-normal">(Nhịp/ phút)</p>
          <v-popover :placement="'right'" :trigger="'click'">
            <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
            <template slot="popover">
              <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Pulse'"/>
            </template>
          </v-popover>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 140</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 140">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">130-139</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 130 && item.Mach <= 139">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">120-129</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 120 && item.Mach <= 129">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">110-119</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 110 && item.Mach <= 119">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">100-109</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 100 && item.Mach <= 109">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-99</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 90 && item.Mach <= 99">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">80-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 80 && item.Mach <= 89">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">70-79</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 70 && item.Mach <= 79">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">60-69</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 60 && item.Mach <= 69">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">50-59</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 50 && item.Mach <= 59">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">40-49</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach >= 40 && item.Mach <= 49">{{item.Mach}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#60; 39</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.Mach < 39">{{item.Mach}}</span>
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
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 41">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">40-40.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 40 && item.ThanNhiet <= 40.9">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">39-39.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 39 && item.ThanNhiet <= 39.9">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">38.5-38.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 38.5 && item.ThanNhiet <= 38.9">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">38-38.4</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 38 && item.ThanNhiet <= 38.4">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">37-37.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 37 && item.ThanNhiet <= 37.9">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">36-36.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 36 && item.ThanNhiet <= 36.9">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">35.5-35.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 35.5 && item.ThanNhiet <= 35.9">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">35-35.4</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet >= 35 && item.ThanNhiet <= 35.4">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#60; 35</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.ThanNhiet < 35">{{item.ThanNhiet}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Tri giác -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" rowspan="3">
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
        <th class="font-normal table-head__sticky table-head__sticky--row1">P, U (&#8804; 8)</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.TriGiac === 'U' || item.TriGiac === 'P'">{{item.TriGiac}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Tổng MEWS -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Tổng MEWS</b>
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
      <!-- Tần số cơn co tử cung (lần/10') -->
      <tr>
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Tần số cơn co tử cung (lần/10')</b>
        </th>
        <td style="width: 102px;" v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.TanSoCoTuCung">{{item.TanSoCoTuCung}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Tần số tim thai (nhịp/phút) -->
      <tr>
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Tần số tim thai (nhịp/phút)</b>
        </th>
        <td style="width: 102px;" v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.TanSoTimThai">{{item.TanSoTimThai}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Mật độ co hồi tử cung -->
      <tr>
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Mật độ co hồi tử cung</b>
        </th>
        <td style="width: 102px;" v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.MatDoCoHoiTuCung">{{item.MatDoCoHoiTuCung}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Sản dịch -->
      <tr>
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Sản dịch</b>
        </th>
        <td style="width: 102px;" v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.SanDich">{{item.SanDich}}</span>
          <span v-else></span>
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
          <span v-if="item.TongDichVao">{{item.TongDichVao}}ml</span>
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
          <span v-if="item.TongDichRa">{{item.TongDichRa}}ml</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Bilan dịch -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Bilan dịch</b>
        </th>
        <td v-for="(item, index) in listVitalSign" :key="index">
          <span v-if="item.BilanDich">{{`${item.BilanDich}ml`}}</span>
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
</template>

<script>
import PageChartV2 from '@/components/IPD/VitalSigns/PediatricChartV2.vue'
import IPDPregnantVitalSign from '@/services/IPD/PregnantVitalSign'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
import { cloneDeep } from 'lodash'
export default {
  name: 'TableForm',
  components: { PageChartV2 },
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
    }
  },
  data () {
    return {
      cursorGrap: true,
      DataChart: {},
      listItems: [],
      listVitalSign: [],
      labelsMach: [],
      labelsNhipTho: [],
      labelsThanNhiet: [],
      params: {
        IPDId: '',
        FormCode: this.FormCode,
        Assessor: this.$store.state.account.Username,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadPregnantChart', this.init)
    EventBus.$on('reloadTablePregnantVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadPregnantChart')
    EventBus.$off('reloadTablePregnantVitalSigns')
  },
  computed: {
    FluidIn () {
      let FluidIn = []
      this.listVitalSign.map(item => {
        let text = ''
        if (item.SoLuongDichVaoT) {
          text += ` T(${item.SoLuongDichVaoT}ml),`
        }
        if (item.SoLuongDichVaoP) {
          text += ` T(${item.SoLuongDichVaoP}ml),`
        }
        if (item.SoLuongDichVaoM) {
          text += ` T(${item.SoLuongDichVaoM}ml),`
        }
        if (item.SoLuongDichVaoS) {
          text += ` T(${item.SoLuongDichVaoS}ml),`
        }
        if (item.SoLuongDichVaoAN) {
          text += ` T(${item.SoLuongDichVaoAN}ml),`
        }
        if (item.SoLuongDichVaoD) {
          text += ` T(${item.SoLuongDichVaoD}ml),`
        }
        if (text.lastIndexOf(',')) text = text.substring(0, text.length - 1)
        if (item.TongDichVao) text += ` - Tổng dịch vào ${item.TongDichVao}(ml)`
        FluidIn.push(text)
      })
      return FluidIn
    },
    FluidOut () {
      let FluidOut = []
      this.listVitalSign.map(item => {
        let text = ''
        if (item.SoLuongDichRaSD) {
          text += ` T(${item.SoLuongDichRaSD}ml),`
        }
        if (item.SoLuongDichRaN) {
          text += ` T(${item.SoLuongDichRaN}ml),`
        }
        if (item.SoLuongDichRaPh) {
          text += ` T(${item.SoLuongDichRaPh}ml),`
        }
        if (item.SoLuongDichRaNT) {
          text += ` T(${item.SoLuongDichRaNT}ml),`
        }
        if (item.SoLuongDichRaDL) {
          text += ` T(${item.SoLuongDichRaDL}ml),`
        }
        if (text.lastIndexOf(',')) text = text.substring(0, text.length - 1)
        if (item.TongDichRa) text += ` - Tổng dịch ra ${item.TongDichRa}(ml)`
        FluidOut.push(text)
      })
      return FluidOut
    }
  },
  methods: {
    init (val) {
      this.loaded = false
      if (this.viewOnly) {
        this.params = {
          Assessor: '',
          FromDate: '',
          ToDate: ''
        }
      }
      if (val) {
        this.params = {
          Assessor: val.Assessor,
          FromDate: val.FromDate,
          ToDate: val.ToDate
        }
      }
      if (!this.$route.params.Id) return
      new IPDPregnantVitalSign(this.params).find('GetByVisitId/' + this._VisitId).then(response => {
        if (response) {
          this.loaded = true
          this.getDataChart(response)
        }
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    async getDataChart (response) {
      this.listItems = []
      this.listVitalSign = []
      this.DataChart = {}
      if (response) {
        this.DataChart = await response
        this.labelsNhipTho = (this.DataChart.NhipThoMEWS.map(d => d.MEWRate)).reverse()
        this.labelsMach = (this.DataChart.MachMEWS.map(d => d.MEWRate)).reverse()
        this.labelsThanNhiet = (this.DataChart.ThanNhietMEWS.map(d => d.MEWRate)).reverse()
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
