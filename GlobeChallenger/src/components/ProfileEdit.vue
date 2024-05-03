<template>
  <div id="profile-edit">
    <h1>Profile Edit</h1>
    <form @submit.prevent="onSubmit">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" v-model="username" />
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" v-model="email" />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" v-model="password" />
      <button type="submit">Submit</button>
    </form>
    <button @click="$emit('close')">Close</button>
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
      password: "",
      profile_pic: null,
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
        this.password = newUser.password;
      }
    },
  },
  methods: {
    ...mapActions(["fetchUser", "updateUser"]),
    onFileChange(e) {
      this.profile_pic = e.target.files[0];
    },
    onSubmit() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        profile_pic: this.profile_pic,
      };

      console.log("User data:", userData);

      this.updateUser(userData);
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
  background-color: #0e0e0e;
  z-index: 2;
  border-radius: 30px;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
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
  color: #f1f1f1;
  font-family: "Montserrat", sans-serif;
}
input {
  padding: 10px 20px;
  margin-top: 20px;
  width: 500px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: #0e0e0e;
  color: #f1f1f1;
}

input:focus {
  outline: none;
  border: 1px solid #a3ffb3;
}

#profile-pic {
  padding: 10px 20px;
  margin-top: 20px;
  width: 500px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  width: 500px;
}
</style>
