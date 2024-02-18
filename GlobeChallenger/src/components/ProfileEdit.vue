<template>
  <div id="profile-edit">
    <h1>Profile Edit</h1>
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" />
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" />
      <label for="profile_pic">Profile Picture:</label>
      <input type="file" id="profile_pic" name="profile_pic" />
      <button type="submit">Submit</button>
    </form>
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  name: "ProfileEdit",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
#profile-edit {
  position: absolute;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  z-index: 2;
}
h1 {
  color: #f1f1f1;
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
