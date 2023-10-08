<template>
  <div class="flag-description">
    <p id="flag-description-text">{{ flagDesc }}</p>
  </div>
</template>

<script>
export default {
  name: "FlagDescription",
  props: {
    flagDesc: String,
  },
};
</script>
<style>
.flag-description {
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
  font-size: 20px;
  text-shadow: 0 0 7px #fff;
  background-color: #20202071;
  border-radius: 25px;
  box-shadow: 0px 0px 50px 0px #ffe600;
  padding: 30px;
  width: 300px;
  z-index: 1;
  border: 4px solid #ffe600;
}

#flag-description-text {
  color: #ffffff;
  font-size: 1.2rem;
  text-shadow: 0 0 9px #ffffff;
}
</style>
