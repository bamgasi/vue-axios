<template>
  <div class="card">
    <div class="card-body">
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="text" class="form-control" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
    </div>
    <div class="card-footer text-right">
      <button type="button" class="btn btn-dark" @click="login">로그인</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "bamgasi@gmail.com",
      password: "3343cityslicka",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push("/"));
    },
  },
};
</script>
