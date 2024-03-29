<template>
  <div class="login">
    <ErrorMessage :message="errorMessage" />
    <div class="login-main-div">
      <div class="login-header">
        <h1>Login</h1>
      </div>
      <div class="login-form">
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              id="username"
              v-model="username"
              required
              ref="usernameInput"
            />
            <label for="username">Username</label>
            <font-awesome-icon :icon="['fas', 'user']" class="form-icon" />
          </div>
          <div class="form-group">
            <input
              id="password"
              v-model="password"
              required
              autocomplete="off"
              :type="showPassword ? 'text' : 'password'"
            />
            <label for="password">Password</label>
            <font-awesome-icon
              :icon="iconClass"
              class="form-icon"
              id="password-icon"
              @click="togglePasswordVisibility"
            />
          </div>
          <div id="inputPreview">
            <input
              name="cssCheckbox"
              id="demo_opt_1"
              type="checkbox"
              class="css-checkbox"
              v-model="rememberMe"
            />
            <label for="demo_opt_1">Remember Me</label>
          </div>
          <button type="submit">Login</button>
        </form>
        <p class="route-to-register-text">Not an existing user?</p>
        <router-link to="/register" class="route-to-register">
          Click here!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "../components/errorMessage.vue";

export default {
  components: {
    ErrorMessage,
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMsg;
    },
  },
  data() {
    return {
      showPassword: false,
      iconClass: "fas fa-eye",
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.usernameInput.focus();
    });
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe,
        });
        if (!this.errorMessage) {
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.iconClass = this.showPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
  },
  watch: {
    errorMessage() {
      setTimeout(() => {
        this.$store.commit("clearErrorMsg");
      }, 3000);
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  color: #f1f1f1;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  z-index: 1;
}

.login-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 60px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
  padding-right: 90px;
  padding-left: 90px;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 12px #a3ffb3;
  margin-bottom: 30px;
  margin-top: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.form-group label {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 0.9rem;
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  pointer-events: none;
  transform: translateY(0);
  transition: transform 0.2s, font-size 0.2s, color 0.2s;
}

.form-group input {
  width: 200px;
  height: 25px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
}

.form-group input:focus + label,
.form-group input:valid + label {
  top: 0;
  left: 10px;
  font-size: 0.7rem;
  color: #a3ffb3;
  text-shadow: 0 0 9px #a3ffb3;
  transform: translateY(-80%);
}

.login-form button {
  width: 210px;
  margin-top: 20px;
  height: 40px;
}

.css-checkbox {
  position: absolute;
  z-index: -1000;
  left: -1000px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

#inputPreview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.css-checkbox + label {
  position: relative;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  height: 20px;
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  user-select: none;
}
.css-checkbox + label:before {
  content: "";
  display: inline-block;
  vertical-align: -25%;
  height: 20px;
  width: 20px;
  background: transparent;
  border: 0.5px solid #ffffff;
  border-radius: 3px;
  margin-right: 10px;
  box-shadow: 0 0 5px #ffffff;
}

.css-checkbox:checked + label:before {
  content: "\2713";
  display: inline-block;
  vertical-align: -25%;
  height: 20px;
  width: 20px;
  border: 0.5px solid #a3ffb3;
  border-radius: 3px;
  margin-right: 10px;
  box-shadow: 0 0 5px #a3ffb2;
}

.route-to-register {
  color: #a3ffb3;
  text-shadow: 0 0 9px #a3ffb3;
  font-size: 0.9rem;
  text-decoration: none;
  margin-bottom: 0;
  transition: all 0.3s ease;
}

.route-to-register:hover {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
}

.route-to-register-text {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  font-size: 0.9rem;
  margin-bottom: 5px;
  margin-top: 20px;
}

.form-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #a3ffb3;
  filter: drop-shadow(0 0 3px #a3ffb3);
  transition: all 0.3s ease;
}

#password-icon:hover {
  color: #ffffff;
  filter: drop-shadow(0 0 3px #000000);
  cursor: pointer;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #202020 inset !important;
  -webkit-text-fill-color: #ffffff !important;
}

@media (max-width: 768px) {
  .login-main-div {
    padding: 30px;
    margin-top: 30px;
    width: 250px;
  }
}
</style>
