<template>
  <div class="card">
    <div class="card-body">
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="email"
          disabled
        />
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
    </div>
    <div class="card-footer text-right">
      <button type="button" class="btn btn-dark" @click="edit">정보변경</button
      >&nbsp;
      <button type="button" class="btn btn-dark" @click="logout">
        로그아웃
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as authApi from "@/api/auth";

export default {
  created() {
    this.getUserInfo(this._userId);
  },
  data() {
    return {
      email: null,
      name: null,
    };
  },
  computed: {
    ...mapGetters({
      _userId: "auth/_userId",
      user: "auth/userInfo",
    }),
  },
  methods: {
    async edit() {
      try {
        const editInfo = {
          _id: this._userId,
          name: this.name,
        };
        const response = await authApi.update(editInfo);
        if (response.status == 200) {
          alert("회원정보가 변경되었습니다.");
        }
      } catch (e) {
        alert(e.message);
      }
    },
    logout() {
      this.$store.dispatch("auth/logout").then(() => this.$router.push("/"));
    },
    getUserInfo(_userId) {
      try {
        this.$store.dispatch("auth/getUserInfo", _userId);
      } catch (e) {
        alert(e.message);
      }
    },
  },
  mounted() {
    this.email = this.user.email;
    this.name = this.user.name;
  },
};
</script>