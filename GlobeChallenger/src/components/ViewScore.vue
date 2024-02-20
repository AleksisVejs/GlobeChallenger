<template>
  <div id="view-score">
    <h1>View Score</h1>
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  name: "ViewScore",
  data() {
    return {};
  },
};
</script>

<style scoped>
#view-score {
  position: absolute;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
  z-index: 2;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  border-radius: 30px;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  backdrop-filter: blur(10px);
}

h1 {
  color: #f1f1f1;
  text-shadow: 0 0 12px #ffffff;
  font-family: "Montserrat", sans-serif;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  width: 500px;
}
</style>
