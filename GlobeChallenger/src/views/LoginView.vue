<template>
  <div class="login">
    <div class="main-div">
      <div class="login-header">
        <h1>Login</h1>
      </div>
      <div class="login-form">
        <form>
          <div class="form-group">
            <label for="username">
              <font-awesome-icon
                :icon="['fas', 'user']"
                size="sm"
                style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
              />
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              v-model="username"
              required
              autofocus
            />
          </div>
          <div class="form-group">
            <label for="password">
              <font-awesome-icon
                :icon="['fas', 'key']"
                size="sm"
                style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
              />
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div id="inputPreview">
            <input
              name="cssCheckbox"
              id="demo_opt_1"
              type="checkbox"
              class="css-checkbox"
            />
            <label for="demo_opt_1">Remember Me</label>
          </div>
          <button type="submit" @click.prevent="login">Login</button>
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
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      isChecked: false,
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "admin") {
        this.$router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
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

.main-div {
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

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.form-group label {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  font-size: 1rem;
  text-align: left;
  width: 210px;
}

.form-group input {
  width: 200px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

.login-form input {
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

.login-form input:focus {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  outline: none;
  transition: all 0.3s ease;
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
  content: "\2713"; /* Checkmark symbol */
  display: inline-block;
  vertical-align: -25%;
  height: 20px;
  width: 20px;
  border: 0.5px solid #a3ffb3;
  border-radius: 3px;
  margin-right: 10px;
  box-shadow: 0 0 5px #a3ffb2;
}

.icon-glow {
  text-shadow: 0 0 5px rgba(150, 208, 160, 0.8);
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
</style>
