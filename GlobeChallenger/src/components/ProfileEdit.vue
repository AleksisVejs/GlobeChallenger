<template>
  <div id="profile-edit">
    <h1>Profile Edit</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <div class="input-wrapper">
          <font-awesome-icon :icon="['fas', 'user']" class="form-icon" />
          <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <font-awesome-icon :icon="['fas', 'envelope']" class="form-icon" />
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
          />
        </div>
      </div>
      <div class="buttons">
        <button type="submit">Submit</button>
        <button @click="$emit('close')">Close</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProfileEdit",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      username: "",
      email: "",
    };
  },
  created() {
    this.fetchUser();
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.username = newUser.username;
        this.email = newUser.email;
      }
    },
  },
  methods: {
    ...mapActions(["fetchUser", "updateUser"]),
    onSubmit() {
      const userData = {
        username: this.username,
        email: this.email,
      };

      console.log("User data:", userData);

      this.updateUser(userData).then(() => {
        this.$emit("close");
      });
    },
  },
};
</script>

<style scoped>
#profile-edit {
  position: absolute;
  width: 40%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
  border-radius: 30px;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  z-index: 2;
  backdrop-filter: blur(20px);
}

h1 {
  color: #a3ffb3;
  text-shadow: 0 0 12px #a3ffb3;
  font-family: "Montserrat", sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

label {
  margin-top: 20px;
  color: #ffffff;
  text-shadow: 0 0 12px #ffffff;
  font-family: "Montserrat", sans-serif;
  align-self: flex-start;
  display: block;
  text-align: left;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

input {
  padding: 10px 20px 10px 40px;
  margin-top: 10px;
  width: 400px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #0e0e0e;
  color: #f1f1f1;
}

input:focus {
  outline: none;
  border: 1px solid #a3ffb3;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  width: 100%;
}

.buttons {
  margin-top: 20px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.form-icon {
  position: absolute;
  left: 10px;
  top: 58%;
  transform: translateY(-50%);
  color: #a3ffb3;
  font-size: 1.2em;
}
</style>
