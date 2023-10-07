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
              autocomplete="off"
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
              autocomplete="off"
            />
          </div>
          <button type="submit" @click.prevent="register">Register</button>
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
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      createdAt: "",
      flagGameScore: {
        All: 0,
        Europe: 0,
        Asia: 0,
        Africa: 0,
        Americas: 0,
        Oceania: 0,
      },
      populationGameScore: 0,
      flagGamePlayed: 0,
      populationGamePlayed: 0,
    };
  },
  methods: {
    register() {
      const newUser = {
        email: this.email,
        username: this.username,
        password: this.password,
        createdAt: new Date().toLocaleDateString(),
        flagGameScore: this.flagGameScore,
        populationGameScore: this.populationGameScore,
        flagGamePlayed: this.flagGamePlayed,
        populationGamePlayed: this.populationGamePlayed,
      };

      const existingUserData = require("../users.json");

      const emailExists = existingUserData.some(
        (user) => user.email === newUser.email
      );
      const usernameExists = existingUserData.some(
        (user) => user.username === newUser.username
      );

      if (emailExists || usernameExists) {
        alert(
          "Email or username already exists. Please choose a different one."
        );
        return;
      }

      const highestId =
        existingUserData.reduce(
          (maxId, user) => (user.id > maxId ? user.id : maxId),
          0
        ) + 1;

      newUser.id = highestId;

      existingUserData.push(newUser);

      this.email = "";
      this.username = "";
      this.password = "";

      alert("Registration successful");
      this.$router.push("/");
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
  margin-bottom: 25px;
  margin-top: 0;
}

.main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 30px 150px 40px 150px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
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
  margin-top: 15px;
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
</style>
