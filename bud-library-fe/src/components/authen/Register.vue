<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Tên tài khoản</label>
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
              ></span>
              Tạo tài khoản
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
      <div  class="form-group-2">
          <router-link to="/admin/books" >
            <span class = "link">
            Về trang quản lí sách
            </span>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Tên tài khoản không thể để trống")
        .min(3, "Tên tài khoản phải nhiều hơn 3 kí tự")
        .max(20, "Tên tài khoản không dài quá 20 kí tự"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải nhiều hơn 6 kí tự")
        .max(40, "Mật khẩu không dài quá 40 kí tự"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      usernameValue: '',
      passwordValue: ''
    };
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("Account/register", {username: this.usernameValue, password: this.passwordValue}).then(
        (data) => {
          console.log('data: ', data)
          this.message = data.data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
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
.alert.alert-success {
    background-color: #d4edda;
    text-align: center;
    color: #1a7b30;
    border: .5px solid #b5d0bb;
}
.error-feedback{
  color: #fc544b;
}
Form{
  padding: 10px;
  padding-bottom: 0;
}
.card-container{
  margin: 50px 25% auto 25%;
}
.form-group-2{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.link{
  text-decoration: underline;
}
.alert{
  margin: auto 10px 25px 10px;
}
</style>