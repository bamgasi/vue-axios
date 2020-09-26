<template>
  <div class="text-center">
    <span v-if="!token">
      <router-link
        :to="{ name: 'login' }"
        class="btn"
        active-class="btn-primary"
      >
        로그인
      </router-link>
    </span>
    <span v-else>
      <router-link
        :to="{ name: 'user-info' }"
        class="btn"
        active-class="btn-primary"
      >
        회원정보
      </router-link>
    </span>
    &nbsp;
    <router-link :to="{ name: 'board' }" class="btn" active-class="btn-primary">
      게시판
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
};
</script>