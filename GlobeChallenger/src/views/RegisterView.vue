<template>
  <div class="register">
    <div class="main-div">
      <div class="register-header">
        <h1>Register</h1>
        <h2>Create an account</h2>
      </div>
      <div class="register-form">
        <form>
          <div class="form-group">
            <label for="email">
              <font-awesome-icon
                :icon="['fas', 'envelope']"
                size="sm"
                style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
              />
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              v-model="email"
              required
              autofocus
            />
          </div>
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
          <button type="submit" @click.prevent="register">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      isChecked: false,
    };
  },
  methods: {
    register() {
      alert("WORK IN PROGRESS");
    },
  },
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
  margin-bottom: 40px;
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

.register-form input {
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

.register-form input:focus {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  outline: none;
  transition: all 0.3s ease;
}

.register-form button {
  width: 210px;
  margin-top: 20px;
  height: 40px;
}

.remember-me-group {
  display: flex;
  align-items: center;
}

#remember-me {
  box-shadow: none;
  padding: 0;
  width: 20px;
  height: 15px;
}

.remember-me-group label {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  font-size: 0.9rem;
}

.icon-glow {
  text-shadow: 0 0 5px rgba(150, 208, 160, 0.8);
}
</style>
