<template>
    <div class="search-body">
        <div>
            <section class="section">
            <div class="section-header d-block p-3">
                <div class="section-title m-0 main-color">Kết quả tìm kiếm</div>
            </div>
            </section>
        </div>
        <h6>5 kết quả</h6><br>
        <div>
            <table>
                <tr>
                    <th>#</th>
                    <th style="min-width:77px;">Thư mục</th>
                    <th>Sách</th>
                    <th style="min-width:66px;">Tác giả</th>
                    <th style="min-width:70px;">Mục lục</th>
                    <th>Nội dung</th>
                    <th style="min-width:65px;">Chi tiết</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Kinh</td>
                    <td>Nguồn An Lạc</td>
                    <td>Sư ông Thanh Từ</td>
                    <td>Lời nói đầu</td>
                    <td>Thiền sư Viên Ngộ nói với thiền sư Phật Giám rằng: “Sư ông chùa Bạch Vân, mỗi khi hành động cất nhắc một việc gì, cũng đều khảo xét</td>
                    <td>
                        <button class="view-details">xem</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th{
  background-color: #dddddd;
}
.view-details{
    background-color: #007ad9;
    color: white;
}
</style>