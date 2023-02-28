/* eslint-disable vue/no-parsing-error */
<template>
  <div class="dropdown cursor mrb10">
        <div class="dropdow-y-nghia" id="dropdownApgar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i>{{__t('Bảng chỉ số Apgar')}}</div>
        <div class="dropdown-menu" aria-labelledby="dropdownApgar">
          <table class="table observation-table" width="100%">
            <thead>
              <tr>
                <th width="130px" class="text-center">Nội dung</th>
                <th width="130px" class="text-center">0</th>
                <th width="130px" class="text-center">1</th>
                <th width="150px" class="text-center">2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">Nhịp tim</td>
                <td>Không có</td>
                <td>&#60; 100 lần/phút</td>
                <td>> 100 lần/phút</td>
              </tr>
              <tr>
                <td class="text-center">Hô hấp</td>
                <td>Không thở</td>
                <td>Thở yếu, khóc yếu</td>
                <td>Khóc to</td>
              </tr>
              <tr>
                <td class="text-center">Trương lực cơ</td>
                <td>Không</td>
                <td>+</td>
                <td>++</td>
              </tr>
              <tr>
                <td class="text-center">Phản xạ</td>
                <td>Không</td>
                <td>+</td>
                <td>++</td>
              </tr>
              <tr>
                <td class="text-center">Màu da</td>
                <td>Tím tái toàn thân hoặc trắng</td>
                <td>Tím đầu chi, quanh môi</td>
                <td>Hồng hào toàn thân</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>

<script>
export default {
  name: 'dropdownApgar'
}
</script>

<style lang="stylus" scoped>
.dropdown {
  border: 1px solid #d2d6de;
  width: 189px;
  text-align: center;
  padding: 8px;
  position relative;
  i {
    position absolute;
    top: 12px;
    left: 7px
  }
  .dropdown-menu {
    min-width: 800px;
    height: auto;
    padding: 0px;
    margin: 0px;
    border: none;
    .table {
      margin: 0px;
    }
  }
}
</style>
