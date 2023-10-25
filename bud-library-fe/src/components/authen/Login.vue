<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <Field v-model="usernameValue" name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <Field v-model="passwordValue" name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span> &nbsp;
            <span>Đăng nhập</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
        <div  class="form-group-2">
          <router-link to="/" >
            <span class = "link">
            Trở về trang chủ
            </span>
          </router-link>
        </div>
      
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapState } from 'vuex';

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Hãy nhập tên tài khoản"),
      password: yup.string().required("Hãy nhập mật khẩu"),
    });

    return {
      loading: false,
      message: "",
      schema,
      usernameValue: '',
      passwordValue: ''
    };
  },
  computed: {
    ...mapState('Account', ['user']),
  },
  created() {
    if (this.user != null) {
      this.$router.push("/admin/books");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("Account/login", {username: this.usernameValue, password: this.passwordValue}).then(
        (response) => {
          this.$router.push({ name: "admin.books" })
        },
        (error) => {
          this.loading = false;
          this.message = 'Tên tài khoản hoặc mật khẩu không chính xác'
        }
      );
    },
  },
};
</script>

<style scoped>
.alert.alert-danger {
    background-color: #fc544b;
    text-align: center;
}
.error-feedback{
  color: #fc544b;
}
Form{
  padding: 10px;
}
.card-container{
  margin: 50px 25% auto 25%;
}
.form-group-2{
    display: flex;
    justify-content: center;
}
.link{
  text-decoration: underline;
}
</style>