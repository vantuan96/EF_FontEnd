<template>
  <div class="dropdown cursor mb-10 mt-10">
    <div class="dropdow-y-nghia" id="dropdownApgar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i>{{__t('Xem chú thích')}}</div>
    <div class="dropdown-menu" aria-labelledby="dropdownApgar">
      <div class="dropdown-content">
        <!-- eslint-disable-next-line vue/no-parsing-error -->
        <p class="mt-10">(1) {{__t('Ưu tiên Heparin cho bệnh nhân suy thận có mức lọc cầu thận <30ml/phút')}}. <b>{{__t('Theo dõi tiểu cầu:')}}</b> {{__t('xét nghiệm tiểu cầu lần đầu sau 4 ngày điều trị, sau đó 2 ngày/lần cho tới khi ngưng Heparine')}}.</p>
        <!-- eslint-disable-next-line vue/no-parsing-error -->
        <p>(2) {{__t('Trường hợp sử dụng Enoxaparin cho bệnh nhân suy thận có CrCl < 30ml/phút, giảm liều xuống còn 20 – 30mg/ngày')}}. <b>{{__t('Theo dõi tiểu cầu:')}}</b> {{__t('không phải theo dõi tiểu cầu trong quá trình chống đông')}}.</p>
        <p>(3) {{__t('Tất áp lực: áp lực giảm dần từ dưới lên trên: cổ chân = 18 mmHg; giữa cẳng chân= 14 mmHg; đùi = 8 mmHg')}}.</p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.dropdown {
  border: 1px solid #ccc;
  text-align: center;
  padding: 5px;
  position relative;
  max-width: 150px;
  font-style: italic;
  font-weight: bold;
  i {
    font-size: 20px;
    position absolute;
    top: 6px;
    left: 7px
  }
  .dropdown-menu {
    min-width: 900px;
    height: auto;
    padding: 0px;
    margin: 0px;
    .dropdown-content {
      padding: 5px;
      p {
        font-style: normal;
        font-weight: normal;
      }
    }
  }
}
</style>
