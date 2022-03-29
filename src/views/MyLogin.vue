<template>
  <div class="bg">
    <div class="center">
      <h3>Login Form</h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <div class="icon">
            <i class="el-icon-user-solid"></i>
            <el-input v-model="ruleForm.user" autocomplete="off"> </el-input>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="pw">
          <div class="icon">
              <i class="el-icon-s-goods"></i>
              <el-input type="password" v-model="ruleForm.pw" autocomplete="off"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <p>username:admin <span>password:123456</span></p>
    </div>
  </div>
</template>

<script>
import instance from "../api/index";
export default {
  name: "MyLogin",
  data() {
    let userfn = function (rule, value, callback) {
      let rg = /\w{5,10}/;
      if (rg.test(value)) return;
      return callback(new Error("用户格式错误"));
    };
    let pwfn = function (rule, value, callback) {
      let rg = /\w{6,10}/;
      if (rg.test(value)) return;
      return callback(new Error("密码格式错误"));
    };
    return {
      ruleForm: {
        user: "admin",
        pw: 123456,
      },
      rules: {
        user: [{ validator: userfn, trigger: "blur" }],
        pw: [{ validator: pwfn, trigger: "blur" }],
      },
      newdebouncefn: null,
    };
  },
  methods: {
    submitForm() {
      this.newdebouncefn();
    },
    async getlogin() {
      let user = this.ruleForm.user;
      let pw = this.ruleForm.pw;
      let { data } = await instance.post("/login", { user, pw });
        // console.log(data);

      //   本地存储
      localStorage.setItem("Token", data.data.token);
      if (data.message == "fail") return this.$message.error("登录失败");
      if (data.message == "success") {
        this.$message({
          type: "success",
          message: "登录成功",
          duration: 1000,
          onClose: () => {
            this.$router.push({ name: "default" });
          },
        });
      }
    },
  },
  created() {
    this.newdebouncefn = this.debouncefn(this.getlogin, 1000);
  },
};
</script>

<style scoped>
.bg {
  height: 100vh;
  background: #2d3a4b;
  position: relative;
}
.center {
  width: 520px;
  height: 480px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -260px;
  margin-top: -240px;
}
h3 {
  padding: 40px 0;
  font-size: 24px;
  color: #fff;
}
.btn {
  width: 100%;
}
p {
  color: #fff;
}
p span {
  margin-left: 20px;
}
.icon{
    position: relative;
}
.icon i{
    position: absolute;
    bottom: 13px;
    left: 0;
    z-index: 2;
}
</style>