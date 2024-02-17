<template>
  <div class="register">
    <ErrorMessage :message="errorMessage" />
    <div class="register-main-div">
      <div class="register-header">
        <h1>Register</h1>
        <h2>Create an account</h2>
      </div>
      <div class="register-form">
        <form @submit.prevent="register">
          <div class="form-group">
            <input type="email" id="email" v-model="email" required autofocus />
            <label :class="{ 'label-moved': email }" for="email">E-mail</label>
            <font-awesome-icon :icon="['fas', 'envelope']" class="form-icon" />
          </div>
          <div class="form-group">
            <input
              type="text"
              id="username"
              v-model="username"
              required
            />
            <label for="username">Username</label>
            <font-awesome-icon :icon="['fas', 'user']" class="form-icon" />
          </div>
          <div class="form-group">
            <input
              id="password"
              v-model="password"
              required
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
          <button type="submit">Register</button>
        </form>
        <p class="route-to-login-text">Already an existing user?</p>
        <router-link to="/login" class="route-to-login">
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
    ErrorMessage
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMsg;
    }
  },
  data() {
    return {
      showPassword: false,
      iconClass: "fas fa-eye",
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.iconClass = this.showPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(() => {
          if (!this.errorMessage) {
            this.$router.push("/login");
          }
        });
    }
  },
  watch: {
    errorMessage() {
      setTimeout(() => {
        this.$store.commit("clearErrorMsg");
      }, 3000);
    }
  }
};
</script>

<style scoped>
.register {
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

.register-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 30px 150px 40px 150px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
}

.register-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 12px #a3ffb3;
}

.register-header h2 {
  color: #ffffff;
  font-size: 1.3rem;
  text-shadow: 0 0 12px #ffffff;
  font-weight: 100;
  margin-bottom: 25px;
  margin-top: 0;
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

.form-group .label-moved {
  top: 0px;
  left: 10px;
  font-size: 0.7rem;
  color: #a3ffb3;
  text-shadow: 0 0 9px #a3ffb3;
  transform: translateY(-80%);
}

.form-group input {
  width: 200px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  height: 25px;
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

.register-form button {
  width: 210px;
  margin-top: 15px;
  height: 40px;
}

.route-to-login {
  color: #a3ffb3;
  text-shadow: 0 0 9px #a3ffb3;
  font-size: 0.9rem;
  text-decoration: none;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.route-to-login:hover {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
}

.route-to-login-text {
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
  .register-main-div {
    padding: 30px 50px 40px 50px;
  }
}
</style>
